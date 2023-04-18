import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { createFolder, deleteFolder, getListpath, uploadFile } from '../../service/files';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
export default function SubFolder() {

    const nameFolder = useParams();

    const [folder, setFolder] = useState([])
    const [subFolderName, setSubFolderName] = useState([])
    const [fileUpload, setFileUpload] = useState()
    const [paths, setPaths] = useState('')
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const navigate = useNavigate()
    const [showUpload, setShowUpload] = useState(false)
    const handleClosePopupUpload = () => setShowUpload(false)
    const handleShowPopupUpload = () => setShowUpload(true)

    const handleShowUpdate = (f) => {
        console.log(f.name)
        setSubFolderName(f.name)
        console.log(subFolderName)
        setShow(true)
    }

    
    const getSubFolder = () => {
        getListpath('/' + nameFolder.name)
            .then(response => {
                setFolder(response.data)
            }).catch(error => {
                console(error);
            })
    }

    useEffect(() => {
        getSubFolder();
    }, [])


    const createSubFolder = () => {
        if (subFolderName !== null && subFolderName !== undefined) {
            createFolder(subFolderName, '/' + nameFolder.name).then(response => {
                setShow(false);
                getSubFolder();
            }).catch(error => {
                console.log(error)
            })
        }

    }

    const uploadFiles = () => {
        let users = JSON.parse(localStorage.getItem('usertoken'))
        const a = window.location.pathname;
        const path = a.substring(12, a.length)
        uploadFile(fileUpload, path)
        .then(response => {
            getSubFolder();
            setShowUpload(false)
        })
        .catch(error => {
            console.log(error);
        }).finally(getSubFolder());
    }

    const subFolder = (f) => {
        window.location.replace(window.location.pathname + '/' + f.name)
    }

    const changeNameFolder = (event) => {
        setSubFolderName(event.target.value)
    }

    const deleteSubFolderFile = (file) => {
        deleteFolder(file.name) 
        .then(response => {
            getSubFolder();
        })
        .catch(error => {
            console.log(error);
        }).finally(getSubFolder());
    }

    const goBack = () => {
        navigate('/upload')
    }

    return (
        <div className='container mt-5'>
            {/* Header */}
            <div className="row col-md-12">             
                <button className='btn btn-primary' onClick={() => handleShow()}><i className='fa fa-plus'></i> Create</button>
                <button className='btn btn-danger' style={{ marginLeft: '5px' }} onClick={() => handleShowPopupUpload() }>Upload File</button>
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
                                {f.isFolder === false ? <i className='fa fa-trash' style={{ color: 'red'}} onClick={() => deleteSubFolderFile(f)}></i> : ''}
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