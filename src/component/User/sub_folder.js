import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { createFolder, deleteFolder, downloadFolder, getListpath, updateFolder, uploadFile, uploadMultipleFile } from '../../service/files';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { API_LOCALHOST, PATH_URL } from '../../service/config';
import "../../access/main.css";
import { showNotification } from '../../service/notifications';
export default function SubFolder() {

    const nameFolder = useParams();
    const [fileUploads, setFileUploads] = useState()
    const [folder, setFolder] = useState([])
    const [subFolderName, setSubFolderName] = useState([])
    const [oldNameFolder, setOldNameFolder] = useState([])
    const [fileUpload, setFileUpload] = useState()
    const [paths, setPaths] = useState()
    const [show, setShow] = useState(false)
    const [isUpload, setIsUpload] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const navigate = useNavigate()
    const [showUpload, setShowUpload] = useState(false)
    const [showMutipleUpload, setShowMutipleUpload] = useState(false)
    const handleClosePopupUpload = () => setShowUpload(false)
    const handleShowPopupUpload = () => setShowUpload(true)
    const [showUpdate, setShowUpdate] = useState(false)
    const handleCloseUpdate = () => setShowUpdate(false)

    const handleShowUpdate = (f) => {
        setOldNameFolder(f.name)
        setSubFolderName(f.name)
        setShowUpdate(true)
    }

    const [showDelete, setShowDelete] = useState(false)
    const handleCloseDelete = () => setShowDelete(false)

    const handleShowDelete = (name) => {
        setShowDelete(true)
        setPaths(name)
    }

    const [showDeleteAll, setShowDeleteAll] = useState(false)
    const handleCloseDeleteAll = () => setShowDeleteAll(false)
    const handleShowDeleteAll = (names) => {
        setShowDeleteAll(true)
        setPaths(names)
    }

    const getSubFolder = () => {
        const link = localStorage.getItem("path")
        let users = JSON.parse(localStorage.getItem('usertoken'));
        const path = link.substring((link.indexOf('/' + users.id + '/') + ((users.id).toString().length + 1)), link.length)
        setPaths(path)
        getListpath(path)
            .then(response => {
                setFolder(response.data)
            }).catch(error => {
                console(error);
            })
    }

    useEffect(() => {
        const userLogin = JSON.parse(localStorage.getItem("usertoken"))
        if (!userLogin) {
            window.location.replace(`${API_LOCALHOST}`)
        }
        setPaths(localStorage.getItem("path"))
        getSubFolder();
    }, [])

    // Create subfolder 
    const createSubFolder = () => {
        console.log(paths)
        if (paths) {
            createFolder(subFolderName, paths).then(response => {
                setShow(false);
                showNotification("Create folder success!", "success")
                getSubFolder();
            }).catch(error => {
                console.log(error)
                showNotification("Create folder fail!", "danger")
            })
        }

    }

    // Update Subfolder
    const updateSubFolder = () => {
        if (subFolderName !== null && subFolderName !== undefined) {
            updateFolder(paths + '/' + oldNameFolder, paths + '/' + subFolderName)
                .then(response => {
                    setOldNameFolder()
                    setShowUpdate(false);
                    showNotification("Update folder success!", "success");
                    getSubFolder();
                }).catch(error => {
                    console.log(error);
                    showNotification("Update folder fail!", "danger");
                })
        }
    }


    // Upload File
    const uploadFiles = () => {
        setIsUpload(true)
        if (!isUpload) {
            let users = JSON.parse(localStorage.getItem('usertoken'))
            const a = window.location.pathname;
            uploadFile(fileUpload, paths)
                .then(response => {
                    getSubFolder();
                    setShowUpload(false)
                    setIsUpload(false)
                    showNotification("Upload file success", "success")
                })
                .catch(error => {
                    console.log(error);
                    showNotification("Upload file fail", "danger")
                }).finally(getSubFolder());
        }
    }

    const subFolder = (f) => {
        if (f.isFolder) {
            window.location.replace('/sub_folder/' + f.name)
            localStorage.setItem("path", f.path)
        }
        else
            window.open(f.path)
    }

    const changeNameFolder = (event) => {
        setSubFolderName(event.target.value)
    }


    // Delete Subfolder 
    const deleteSubFolderFile = () => {
        deleteFolder([paths])
            .then(response => {
							
                setShowDelete(false);
                getSubFolder();
								console.log("run in hrere")
                showNotification("Delete folder success", "success")
            })
            .catch(error => {
                console.log(error);
                showNotification("Delete folder fail", "danger")
            }).finally(getSubFolder());
    }

    // Zip File
    const zipFile = async() => {
			let listzip=folder.filter(name =>name.isChecked===true)
			let result = await  downloadFolder(listzip)
			downloadFileZip(result.data.path,result.data.name)
			// downloadFolder(listzip)
      //   .then(response => {
      //       const pathFileDowload = response.data.path;
      //       downloadFileZip(pathFileDowload, pathFileDowload.substring(pathFileDowload.lastIndexOf("/") + 1, pathFileDowload.length))
              
			// 					showNotification("Download File Success", "success")
			// 					getSubFolder();
      //   })
      //   .catch(error => {
      //       console.log(error);
      //       showNotification("Download File Fail!", "danger")
      //   })
				
    }

    // Download File
    const downloadFile = (f) => {
        fetch(f.path, {
            method: "GET",
        })
            .then(response => {
                response.arrayBuffer().then(function (buffer) {
                    const url = window.URL.createObjectURL(new Blob([buffer]));
                    const link = document.createElement("a");
                    link.href = url;
                    link.setAttribute("download", f.name); //or any other extension
                    document.body.appendChild(link);
                    link.click();
                });
            })
            .catch(err => {
                console.log(err);
            });
    };

    const downloadFileZip = (path, name) => {
        fetch(path, {
            method: "GET",
        })
            .then(response => {
                response.arrayBuffer().then(function (buffer) {
                    const url = window.URL.createObjectURL(new Blob([buffer]));
                    const link = document.createElement("a");
                    link.href = url;
                    link.setAttribute("download", name); //or any other extension
                    document.body.appendChild(link);
                    link.click();
                });
            })
            .catch(err => {
                console.log(err);
            }).finally(()=>{
							// deleteFolder([{path:path}])
							getSubFolder();
						})
    };

    // Back
    const goBack = () => {
        const link = localStorage.getItem("path")
        const path = link.substring(link.lastIndexOf('/'), -1)
        const a = path.substring(path.lastIndexOf("/") + 1, path.length)
        let users = JSON.parse(localStorage.getItem('usertoken'));
        if (path === PATH_URL + users.id) {
            navigate('/upload')
        } else {
            localStorage.setItem("path", path)
            window.location.replace('/sub_folder/' + a)
        }
    }


    // Logout
    const logout = () => {
        localStorage.clear()
        showNotification("Logout success", "success")
        window.location.replace('/')
    }

    const uploadMultipleFiles = () => {
        setIsUpload(true)
        if (!isUpload) {
            uploadMultipleFile(fileUploads, paths)
                .then(response => {
                    setShowMutipleUpload(false);
                    getSubFolder();
                    setIsUpload(false)

                    setFileUploads(null)
                })
                .catch(error => {
                    console.log(error);
                }).finally(getSubFolder());
        }
    }
    const chooseUploadFile = (e) => {
        setFileUploads(e.target.files)
    }

    // HandleChange
    const handleChange = (e) => {
        const { name, checked } = e.target;
        if (name === "allSelect") {
            let tempItem = folder.map((filename) => {
                return { ...filename, isChecked: checked };
            })
            setFolder(tempItem);
        } else {
            let tempItem = folder.map((filename) =>
                filename.name === name ? { ...filename, isChecked: checked } : filename
            );
            setFolder(tempItem);
        }
    }

    // Delete all
    const handleDeleteAll = () => {
        let checkeddelete = 0;
        let iDelete = 0;
        folder.forEach(item => {
            if (item.isChecked === true) {
                iDelete += 1;
            }
        })
				let listDelete =folder.filter(item => {
					return item.isChecked ===true
			 })
       if(listDelete.length>0){
				deleteFolder(listDelete)
				.then(response => {
						setShowDeleteAll(false);
								showNotification("Delete folder success!", "success")
								getSubFolder();
						
				})
				.catch(error => {

						showNotification("Delete folder fail!", "danger")
					  getSubFolder();
				})
			}
    }


    return (
        <>
            <div className='container mt-5' style={{ minHeight: '100vh' }}>
                {/* Header */}
                <div className="row col-md-12">
                    <div className='col-sm-6'>
                        <button className='btn btn-primary' onClick={() => handleShow()}>New Folder</button>
                        <button className='btn btn-success' style={{ marginLeft: '5px' }} onClick={() => handleShowPopupUpload()}>Upload File</button>
                        <button 
                            className='btn btn-danger' 
                            onClick={() => handleShowDeleteAll(folder)} 
                            style={{ marginLeft: '5px' }}
                            hidden={!folder.some((filename) => filename.isChecked === true ? true : false)}
                        >
                            Delete All
                        </button>
                        <button 
                            className='btn btn-info' 
                            style={{ marginLeft: '5px' }} 
                            onClick={() => zipFile()}
                            hidden={!folder.some((filename) => filename.isChecked === true ? true : false)}
                        >
                            Download All
                        </button>
                    </div>
                    <div className='col-sm-6' style={{ textAlign: 'right' }}>
                        <button className='btn btn-secondary' onClick={() => logout()}>Sign out {" "}<i className='fa-solid fa-right-from-bracket'></i></button>
                    </div>
                </div>
                <table className="table bordered mt-4" >
                    <thead>
                        <tr>
                            <th>
                                <input
                                    type='checkbox'
                                    name='allSelect'
                                    checked={!folder.some((filename) => filename?.isChecked !== true)}
                                    onChange={handleChange}
                                />
                            </th>
                            <th scope='col'>ID</th>
                            <th scope='col-2'>Name</th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {folder.map((f, index) => (
                            <tr key={f.id}>
                                <td>
                                    <input
                                        type='checkbox'
                                        className='form-check-input'
                                        name={f.name}
                                        checked={f?.isChecked || false}
                                        onChange={handleChange}
                                    />
                                </td>
                                <td scope='row'>{index + 1}</td>
                                <td scope='row'
                                    onDoubleClick={() => subFolder(f)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    {f.isFolder === true ? <i className='fa-regular fafolder'></i> : <i className='fa fa-paperclip'></i>}
                                    {" "}{f.name}
                                </td>
                                <td>
                                    {f.isFolder === true ? <i className='fa fa-edit' style={{ color: 'blue', cursor: "pointer" }} onClick={() => handleShowUpdate(f)}></i> : ''}
                                </td>
                                <td>
                                    {f.isFolder === false ? <i className='fa fa-download' style={{ color: 'green', cursor: 'pointer' }} onClick={() => downloadFile(f)}></i> : ''}
                                </td>
                                <td>
                                    <i className='fa fa-trash' style={{ color: 'red', cursor: 'pointer' }} onClick={() => handleShowDelete(f)}></i>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className='row col-md-auto'>
                    <button className='btn btn-primary' style={{ marginRight: '5px' }} onClick={() => goBack()}>
                        <i className="fa-solid fa-arrow-left"></i> Back</button>
                </div>
                <Modal show={show} onHide={handleClose} animation={false}>
                    <Modal.Header>
                        <Modal.Title>Create Folder</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-group">
                            <label>Name Folder</label>
                            <input type="text" className="form-control" style={{ textAlign: 'left' }} name="nameFolder" id='nameFolder' onChange={changeNameFolder} />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() => createSubFolder()}>
                            Save
                        </Button>
                        <Button variant="secondary" onClick={() => handleClose()}>
                            <i></i>Close
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={showUpdate} onHide={handleCloseUpdate} animation={false}>
                    <Modal.Header>
                        <Modal.Title>Update Folder</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='form-group'>
                            <label>Name Folder</label>
                            <input type='text' className='form-control' style={{ textAlign: 'left' }} value={subFolderName} name='nameFolder' id='nameFolder' onChange={changeNameFolder} />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='primary' onClick={() => updateSubFolder()}>
                            Update
                        </Button>
                        <Button variant='secondary' onClick={() => handleCloseUpdate()}>
                            <i></i> Close
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={showDelete} onHide={handleCloseDelete} animation={false}>
                    <Modal.Header>
                        <Modal.Title>Delete</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h2>Are you sure you want to delete?</h2>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button style={{ backgroundColor: 'red' }} onClick={() => deleteSubFolderFile()}>
                            Delete
                        </Button>
                        <Button variant="secondary" onClick={() => handleCloseDelete()}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={showDeleteAll} onHide={handleCloseDeleteAll} animation={false}>
                    <Modal.Header>
                        <Modal.Title>Delete</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h2>Are you sure you want to delete?</h2>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button style={{ backgroundColor: 'red' }} onClick={() => handleDeleteAll()}>
                            Delete
                        </Button>
                        <Button variant="secondary" onClick={() => handleCloseDeleteAll()}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={showUpload} onHide={handleClosePopupUpload} animation={true}>
                    <Modal.Header>
                        <Modal.Title>Upload File</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='form-group'>
                            <label>File</label>
                            <input type='file' onChange={e => setFileUpload(e.target.files[0])} className='form-control' />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='primary' onClick={() => uploadFiles()}>
                            {isUpload === true ? "Upload..." : "Upload"}
                        </Button>
                        <Button variant='secondary' onClick={() => handleClosePopupUpload()}>
                            <i></i>Cancel
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={showMutipleUpload} onHide={handleClosePopupUpload} animation={true}>
                    <Modal.Header>
                        <Modal.Title>Upload Files</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form method="POST" enctype="multipart/form-data">
                            <label for="html-files">Select Files:</label>
                            <input type="file" id="html-files" name="html-files[]" multiple onChange={e => chooseUploadFile(e)} />
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" disabled={fileUploads ? false : true} onClick={() => uploadMultipleFiles()}>
                            {isUpload ? "Uploading..." : "Upload"}
                        </Button>
                        <Button variant="secondary" onClick={() => setShowMutipleUpload(false)}>
                            <i></i>Cancel
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
            <footer className="text-center text-lg-start bg-light text-muted">
                <div className="text-center p-2" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
                    Copyright &copy; 2023 Julie Sandlau. All rights reserved
                </div>
            </footer>
        </>
    );

}