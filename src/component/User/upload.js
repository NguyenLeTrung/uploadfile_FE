import * as React from 'react';
import { createFolder, getListpath, uploadFile, updateFolder, deleteFolder, uploadMultipleFile, downloadFolder, forceDownload, resetPasswords } from '../../service/files';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { API_LOCALHOST } from '../../service/config';
import '../../access/main.css';
import { showNotification } from '../../service/notifications';

export default function Upload() {
    const [isUpload, setIsUpload] = useState(false)
    const [names, setNames] = useState([])
    const [nameFolder, setNameFolder] = useState()
    const [oldNameFolder, setOldNameFolder] = useState()
    const [fileUpload, setFileUpload] = useState()
    const [fileUploads, setFileUploads] = useState()
    const [paths, setPaths] = useState()
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => {
        setNameFolder('')
        setShow(true)
    }
    const [showMutipleUpload, setshowMutipleUpload] = useState(false)
    const [showUpload, setShowUpload] = useState(false)
    const handleClosePopupUpload = () => setShowUpload(false)
    const handleShowPopupUpload = () => setShowUpload(true)

    const [showUpdate, setShowUpdate] = useState(false)
    const handleCloseUpdate = () => setShowUpdate(false)
    const handleShowUpdate = (f) => {
        setOldNameFolder(f.names)
        setNameFolder(f.names)
        setShowUpdate(true)
    }

    const [showDelete, setShowDelete] = useState(false)
    const handleCloseDelete = () => setShowDelete(false)
    const handleShowDelete = (names) => {
        setShowDelete(true)
        setPaths(names)
    }

<<<<<<< HEAD
    const [showDeleteAll, setShowDeleteAll] = useState(false)
    const handleCloseDeleteAll = () => setShowDeleteAll(false)
    const handleShowDeleteAll = (names) => {
        setShowDeleteAll(true)
        setPaths(names)
    }

    const [showPassword, setShowPassword] = useState(false)
    const [currentPassword, setCurrentPassword] = useState()
    const [newPassword, setNewPassword] = useState()
    const [showResetPassword, setshowResetPassword] = useState(false)
    const handleCloseResetPassword = () => setshowResetPassword(false)
    const handleShowResetPassword = () => {
        setshowResetPassword(true)
    }


    // Get list Data
=======
    const [checkAll, setCheckAll] = useState(false)

>>>>>>> ba9978e59fb40e27499a8f079a135cd52c51a8e2
    const getData = () => {
        let promise;
        promise = getListpath("");
        promise
            .then(response => {
<<<<<<< HEAD
                setNames(response.data)
=======
                let list = [];
                console.log(response)
                response.data.forEach(item => {
                    let customItem = {};
                    customItem = { ...item, check: false }
                    list = [...list, customItem];
                });
                setName(list)
                console.log(list)
>>>>>>> ba9978e59fb40e27499a8f079a135cd52c51a8e2
            }).catch(error => {
                setNames([])
                console.log(error);
            })
    }

    useEffect(() => {
        const userLogin = JSON.parse(localStorage.getItem("usertoken"))
        if (!userLogin) {
            window.location.replace(`${API_LOCALHOST}`)
        }
        getData();
    }, [])


    // Create new Folder
    const create = () => {
        if (nameFolder !== null && nameFolder !== undefined) {
            createFolder(nameFolder, '').then(response => {
                setShow(false);
                showNotification("Create new folder success!", "success")
                getData();
            }).catch(error => {
                console.log(error);
                showNotification("Create new folder fail!", "danger")
            })
        }
    }

    // Update Folders
    const updateFolders = () => {
        if (nameFolder !== null && nameFolder !== undefined) {
            updateFolder(oldNameFolder, nameFolder).then(response => {
                setOldNameFolder(response)
                setShowUpdate(false);
                showNotification("Update folder success!", "success")
                getData();
            }).catch(error => {
                console.log(error);
                showNotification("Update folder fail!", "danger")
            })

        }
    }


    // Upload File
    const uploadFiles = () => {
<<<<<<< HEAD
        setIsUpload(true)
        if (!isUpload) {
            uploadFile(fileUpload, '')
                .then(response => {
                    setShowUpload(false);
                    showNotification("Upload file success!", "success")
                    getData();
                    setIsUpload(false)
                })
                .catch(error => {
                    console.log(error);
                    showNotification("Upload file fail!", "danger")
                }).finally(getData());
        }
    }

    // Upload Muiltiple 
    const uploadMultipleFiles = () => {
        setIsUpload(true)
        if (!isUpload) {
            uploadMultipleFile(fileUploads, '')
                .then(response => {
                    setshowMutipleUpload(false);
                    getData();
                    setIsUpload(false)
                    setFileUploads(null)
                })
                .catch(error => {
                    console.log(error);
                }).finally(getData());
        }
    }


    const chooseUploadFile = (e) => {
        setFileUploads(e.target.files)
=======
        console.log(fileUpload);
        console.log(typeof fileUpload)
        // uploadFile(fileUpload, '')
        //     .then(response => {
        //         setShowUpload(false);
        //         getData();
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     }).finally(getData());
>>>>>>> ba9978e59fb40e27499a8f079a135cd52c51a8e2
    }

    const subFolder = (f) => {
        if (f.isFolder) {
            window.location.replace('/sub_folder/' + f.name)
            localStorage.setItem("path", f.path)
        }
        else
            window.open(f.path)
    }

    // Change Name Folder
    const changeNameFolder = (event) => {
        setNameFolder(event.target.value)
    }


    // Delete Folder
    const deleteFolderFile = () => {

        deleteFolder([paths])
            .then(response => {
                setShowDelete(false);
                showNotification("Delete folder success!", "success")
                getData();
            })
            .catch(error => {
                console.log(error);
                showNotification("Delete folder fail!", "danger")
            }).finally(getData());
    }
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
            })
            .finally(() => {
                // deleteFolder([{path:path}])
                //  showNotification("Download File Success. Please wait to trigger download", "success")
                getData();
            })
    };

    const zipFile = async () => {
        let listzip = names.filter(name => name.isChecked === true)
        let result = await downloadFolder(listzip)
        downloadFileZip(result.data.path, result.data.name)

        // downloadFolder(listzip)
        // .then(response => {
        //     const pathFileDowload = response.data.path;


        // 					 	// deleteFolder([{path:response.data.path}])

        // 			showNotification("Download File Success", "success")



        // })
        // .catch(error => {
        //     console.log(error);
        //     showNotification("Download File Fail!", "danger")
        // })
    }

    // Hide PassWord
    const hidePassword = () => {
        setShowPassword(!showPassword)
    }

    // Logout
    const logout = () => {
        localStorage.clear()
        showNotification("Logout success !", "success")
        window.location.replace('/')
    }

    const download = (f) => {
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


    const handleChange = (e) => {
        const { name, checked } = e.target;
        if (name === "allSelect") {
            let tempItem = names.map((filename) => {
                return { ...filename, isChecked: checked };
            })
            setNames(tempItem)
        } else {
            let tempItem = names.map((filename) =>
                filename.name === name ? { ...filename, isChecked: checked } : filename
            );
            setNames(tempItem);
        }
    }
<<<<<<< HEAD
    // Delete all 
    const handleDeleteAll = () => {

        let listDelete = names.filter(item => {
            return item.isChecked === true
        })
        if (listDelete.length > 0) {
            deleteFolder(listDelete)
            .then(response => {
                setShowDeleteAll(false);
                showNotification("Delete folder success!", "success")
                getData();

            })
            .catch(error => {

                showNotification("Delete folder fail!", "danger")
                getData();
            })
        }

    }
    // Update password
    const resetPassword = () => {
        resetPasswords(currentPassword, newPassword)
            .then(response => {
                setshowResetPassword(false);
                showNotification("Update password success", "success")
            }).catch(error => {
                console.log(error);
                showNotification("Update password fail", "danger")
            })
    }

    const changeCurrentPassword = (event) => {
        setCurrentPassword(event.target.value)
    }

    const changeNewPassword = (event) => {
        setNewPassword(event.target.value)
    }

=======

    const onChangeCheckAll = () => {
        console.log(checkAll === false)
        checkAll === false ? setCheckAll(true) : setCheckAll(false)
        console.log(checkAll)
        let list = [];
        if (!checkAll) {
            name.forEach(item => {
                let customItem = {};
                customItem = { ...item, check: true }
                list = [...list, customItem];
            });
        }else{
            name.forEach(item => {
                let customItem = {};
                customItem = { ...item, check: false }
                list = [...list, customItem];
            });
        }
        console.log(list)
        setName(list)
    }
>>>>>>> ba9978e59fb40e27499a8f079a135cd52c51a8e2
    return (
        <>
            <div className='container' style={{ minHeight: '100vh' }}>
                <h2>Folder</h2>
                <div className="row col-sm-auto">
                    <div className='col-sm-6'>
                        <button
                            className='btn btn-primary'
                            onClick={() => handleShow()}
                        >
                            New Folder
                        </button>
                        <button
                            className='btn btn-success'
                            style={{ marginLeft: '5px' }}
                            onClick={() => handleShowPopupUpload()}
                        >
                            Upload File
                        </button>
                        <button
                            className='btn btn-danger'
                            style={{ marginLeft: '5px' }}
                            onClick={() => handleShowDeleteAll(names)}
                            hidden={!names.some((filename) => filename.isChecked === true ? true : false)}
                        >
                            Delete All
                        </button>
                        <button
                            className='btn btn-information'
                            style={{ marginLeft: '5px' }}
                            onClick={() => zipFile()}
                            hidden={!names.some((filename) => filename.isChecked === true ? true : false)}
                        >
                            Download All
                        </button>
                    </div>
                    <div className='col-sm-6' style={{ textAlign: 'right' }}>
                        <button className='btn btn-danger' style={{ marginRight: '5px' }} onClick={() => handleShowResetPassword()}>Reset password</button>
                        <button className='btn btn-secondary' onClick={() => logout()}>Sign out {" "}<i className='fa-solid fa-right-from-bracket'></i></button>
                    </div>
                </div>
<<<<<<< HEAD
                <table className="table bordered mt-4">
                    <thead>
                        <tr>
                            <th>
                                <input
                                    type='checkbox'
                                    name='allSelect'
                                    id='myCheckbox'
                                    checked={!names.some((filename) => filename?.isChecked !== true)}
                                    onChange={handleChange}
                                />
                            </th>
                            <th scope='col'>ID</th>
                            <th scope='col-2'>Name</th>
                            <th></th>
                            <th></th>
                            <th></th>
=======
                <div className='col-md-4' style={{ textAlign: 'right' }}>
                    <button className='btn'><i className='fa-solid fa-right-from-bracket' onClick={() => logout()}></i></button>
                </div>
            </div>
            <table className="table bordered mt-4">
                <thead>
                    <tr>
                        <th><input type='checkbox' onClick={() => onChangeCheckAll()} value={checkAll}></input></th>
                        <th scope='col'>ID</th>
                        <th scope='col-2'>Name</th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {name ? name.map((f, index) => (
                        <tr key={f.id}>
                            <td><input type='checkbox' value={f.check} name={index} id={index} checked={f.check} /></td>
                            <td scope='row'>{index + 1}</td>
                            <td scope='row'
                                onDoubleClick={() => subFolder(f)}
                                style={{ cursor: 'pointer' }}
                            >
                                {f.isFolder === true ? <i className='fa-regular fa-folder'></i> : <i className='fa fa-paperclip'></i>}
                                {" "}{f.name}
                            </td>
                            <td>
                                {f.isFolder === true ? <i className='fa fa-edit' style={{ color: 'blue', cursor: 'pointer' }} onClick={() => handleShowUpdate(f)}></i> : ''}
                            </td>
                            <td>
                                {f.isFolder === false ? <i className='fa fa-download' style={{ color: 'green', cursor: 'pointer' }} onClick={() => dowloadFile(f)}></i> : ''}
                            </td>
                            <td>
                                <i className='fa fa-trash' style={{ color: 'red', cursor: 'pointer' }} onClick={() => handleShowDelete(f)}></i>
                            </td>
>>>>>>> ba9978e59fb40e27499a8f079a135cd52c51a8e2
                        </tr>
                    </thead>
                    <tbody>
                        {names ? names.map((f, index) => (
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
                                    {f.isFolder === true ? <i className='fa-regular fa-folder'></i> : <i className='fa fa-paperclip'></i>}
                                    {" "}{f.name}
                                </td>
                                <td>
                                    {f.isFolder === true ? <i className='fa fa-edit' style={{ color: 'blue', cursor: 'pointer' }} onClick={() => handleShowUpdate(f)}></i> : ''}
                                </td>
                                <td>
                                    {f.isFolder === false ? <i className='fa fa-download' style={{ color: 'green', cursor: 'pointer' }} onClick={() => download(f)}></i> : ''}
                                </td>
                                <td>
                                    <i className='fa fa-trash' style={{ color: 'red', cursor: 'pointer' }} onClick={() => handleShowDelete(f)}></i>
                                </td>
                            </tr>
                        )) : <tr></tr>}
                    </tbody>
                </table>
                <Modal show={show} onHide={handleClose} animation={false}>
                    <Modal.Header>
                        <Modal.Title>Create Folder</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-group">
                            <label>Name Folder</label>
                            <input type="text" className="form-control" style={{ textAlign: 'left' }} name="nameFolder" id='nameFolder' onChange={changeNameFolder} value={nameFolder} />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() => create()}>
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
                            <input type='text' className='form-control' style={{ textAlign: 'left' }} value={nameFolder} name='nameFolder' id='nameFolder' onChange={changeNameFolder} />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='primary' onClick={() => updateFolders()}>
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
                        <Button style={{ backgroundColor: 'red' }} onClick={() => deleteFolderFile()}>
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
                        <div className="form-group">
                            <label>File</label>
                            <input type="file" onChange={e => setFileUpload(e.target.files[0])} className="form-control" />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() => uploadFiles()}>
                            {isUpload ? "Uploading..." : "Upload"}
                        </Button>
                        <Button variant="secondary" onClick={() => handleClosePopupUpload()}>
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
                        <Button variant="secondary" onClick={() => setshowMutipleUpload(false)}>
                            <i></i>Cancel
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={showResetPassword} onHide={handleCloseResetPassword} animation={true}>
                    <Modal.Header>
                        <Modal.Title>Reset Password</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='form-group'>
                            <label>Current Password</label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder='**********'
                                value={currentPassword}
                                onChange={changeCurrentPassword}
                                defaultValue={""}
                            />
                        </div>
                        <div className='form-group'>
                            <label>New Password</label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder='**********'
                                value={newPassword}
                                onChange={changeNewPassword}
                                defaultValue={""}
                            />
                        </div>
                        <input type='checkbox' onClick={() => hidePassword()} />{" "}Show Password
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='primary' onClick={() => resetPassword()}>
                            Change
                        </Button>
                        <Button variant='secondary' onClick={() => handleCloseResetPassword()}>
                            Close
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

