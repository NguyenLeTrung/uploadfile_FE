import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { createFolder, deleteFolder, getListpath, updateFolder, uploadFile } from '../../service/files';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
export default function SubFolder() {

    const nameFolder = useParams();

    const [folder, setFolder] = useState([])
    const [subFolderName, setSubFolderName] = useState([])
    const [oldNameFolder, setOldNameFolder] = useState([])
    const [fileUpload, setFileUpload] = useState()
    const [paths, setPaths] = useState()
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const navigate = useNavigate()
    const [showUpload, setShowUpload] = useState(false)
    const handleClosePopupUpload = () => setShowUpload(false)
    const handleShowPopupUpload = () => setShowUpload(true)
    const [showUpdate, setShowUpdate] = useState(false)
    const handleCloseUpdate = () => setShowUpdate(false)

    const handleShowUpdate = (f) => {
        setOldNameFolder(f.name)
        setSubFolderName(f.name)
        setShowUpdate(true)
    }


    const getSubFolder = () => {
        const link = localStorage.getItem("path")
        const path = link.substring((link.indexOf('/9/') + 2), link.length)
        setPaths(path)
        getListpath(path)
            .then(response => {
                setFolder(response.data)
            }).catch(error => {
                console(error);
            })
    }

    useEffect(() => {
        setPaths(localStorage.getItem("path"))
        getSubFolder();
    }, [])


    const createSubFolder = () => {
        console.log(paths)
        if (paths) {
            createFolder(subFolderName, paths).then(response => {
                setShow(false);
                getSubFolder();
            }).catch(error => {
                console.log(error)
            })
        }

    }

    const updateSubFolder = () => {
        if(subFolderName !== null && subFolderName !== undefined) {
            updateFolder(paths + '/' +oldNameFolder, paths + '/' + subFolderName)
            .then(response => {
                setOldNameFolder()
                setShowUpdate(false);
                getSubFolder();
            }).catch(error => {
                console.log(error);
            })
        }
    }

    const uploadFiles = () => {
        let users = JSON.parse(localStorage.getItem('usertoken'))
        const a = window.location.pathname;
        // const path = a.substring(12, a.length)
        uploadFile(fileUpload, paths)
        .then(response => {
            getSubFolder();
            setShowUpload(false)
        })
        .catch(error => {
            console.log(error);
        }).finally(getSubFolder());
    }

    const subFolder = (f) => {
        if (f.isFolder){
            window.location.replace('/sub_folder/' + f.name)
            localStorage.setItem("path", f.path)
        }
        else
            window.open(f.path)
    }

    const changeNameFolder = (event) => {
        setSubFolderName(event.target.value)
    }

    const deleteSubFolderFile = (file) => {
        deleteFolder(file.path) 
        .then(response => {
            getSubFolder();
        })
        .catch(error => {
            console.log(error);
        }).finally(getSubFolder());
    }

    const goBack = () => {
        const link = localStorage.getItem("path")
        const path = link.substring(link.lastIndexOf('/'), -1)
        const a= path.substring(path.lastIndexOf("/") + 1, path.length)
        console.log(a);
        localStorage.setItem("path", path)
        window.location.replace('/sub_folder/' + a)
        // navigate('/upload')
        // history.goBack()
    }

    return (
        <div className='container mt-5'>
            {/* Header */}
            <div className="row col-md-12">             
                <button className='btn btn-primary' onClick={() => handleShow()}><i className='fa fa-plus'></i> Create</button>
                <button className='btn btn-secondary' style={{ marginLeft: '5px' }} onClick={() => handleShowPopupUpload() }>Upload File</button>
                {/* <button className='btn btn-danger' style={{ marginLeft: '5px'}}><i className='fa fa-remove'></i> Delete</button> */}
            </div>
            <table className="table bordered mt-4" >
                <thead>
                    <tr>
                        <th scope='col'>ID</th>
                        <th scope='col-2'>Name</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {folder.map((f, index) => (
                        <tr key={f.id}>
                            <td scope='row'>{index + 1}</td>
                            <td scope='row' 
                                onDoubleClick={() => subFolder(f)}
                                style={{ cursor: 'pointer' }}
                            >
                                {f.isFolder === true ? <i className='fa-regular fafolder'></i> : <i className='fa fa-paperclip'></i>}
                                {" "}{f.name}
                            </td>
                            <td>
                                {f.isFolder === true ? <i className='fa fa-edit' style={{ color: 'blue'}} onClick={() => handleShowUpdate(f)}></i> : ''}
                            </td>
                            <td>
                                 <i className='fa fa-trash' style={{ color: 'red'}} onClick={() => deleteSubFolderFile(f)}></i>
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
                        Upload
                    </Button>
                    <Button variant='secondary' onClick={() => handleClosePopupUpload()}>
                        <i></i>Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );

}