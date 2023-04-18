import * as React from 'react';
import { createFolder, getListpath, uploadFile, updateFolder, deleteFolder } from '../../service/files';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function Upload() {

    const [name, setName] = useState([])
    const [nameFolder, setNameFolder] = useState()
    const [oldNameFolder, setOldNameFolder] = useState()    
    const [fileUpload, setFileUpload] = useState()
    const [paths, setPaths] = useState()
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const [showUpload, setShowUpload] = useState(false)
    const handleClosePopupUpload = () => setShowUpload(false)
    const handleShowPopupUpload = () => setShowUpload(true)

    const handleShowUpdate = (f) => {
        setOldNameFolder(f.name)
        setNameFolder(f.name)
        setShow(true)
    }

    const getData = () => {
        let promise;
        promise = getListpath("");
        promise
            .then(response => {
                setName(response.data)
            }).catch(error => {
                console.log(error);
            })
    }

    useEffect(() => {
        getData();
    }, [])

    const create = () => {
        if (nameFolder !== null && nameFolder !== undefined) {
            createFolder(nameFolder, '').then(response => {
                setShow(false);
                getData();
            }).catch(error => {
                console.log(error)
            })
        }
    }

    const updateFolders = () => {
        if (nameFolder !== null && nameFolder !== undefined) {
            updateFolder(oldNameFolder, nameFolder).then(response => {
                setOldNameFolder(response)
                console.log(nameFolder)
                setShow(false);
                getData();
            }).catch(error => {
                console.log(error);
            })

        }
    }

    const uploadFiles = () => {
        uploadFile(fileUpload, '')
            .then(response => {
                setShowUpload(false);
                getData();
            })
            .catch(error => {
                console.log(error);
            }).finally(getData());
    }

    const subFolder = (f) => {
        if (f.isFolder)
            window.location.replace('/sub_folder/' + f.name)
        else
            window.open(f.path)
    }

    const changeNameFolder = (event) => {
        setNameFolder(event.target.value)
    }


    const deleteFolderFile = (file) => {
        deleteFolder(file.paths)
            .then(response => {
                getData();
            })
            .catch(error => {
                console.log(error);
            }).finally(getData());
    }

    return (
        <div className='container'>
            <h2>Folder</h2>
            <div className="row col-md-auto">
                <button className='btn btn-primary' onClick={() => handleShow()}><i className='fa fa-plus'></i> Create</button>
                <button className='btn btn-secondary' style={{ marginLeft: '5px' }} onClick={() => handleShowPopupUpload()}>Upload File</button>
                <button className='btn btn-danger' style={{ marginLeft: '5px' }}><i className='fa fa-remove' onClick={() => deleteFolderFile()}></i> Delete</button>
            </div>
            <table className="table bordered mt-4">
                <thead>
                    <tr>
                        <th scope='col'>ID</th>
                        <th scope='col-2'>Name</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {name.map((f, index) => (
                        <tr key={f.id}>
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
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='row col-md-auto'>
                <button className='btn btn-primary' style={{ marginRight: '5px' }} onClick={() => window.history.back()}>
                    <i className="fa-solid fa-arrow-left"></i> Back</button>
            </div>
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
            <Modal show={show} onHide={handleClose} animation={false}>
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
                    <Button variant='secondary' onClick={() => handleClose()}>
                        <i></i> Close
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
                        Upload
                    </Button>
                    <Button variant="secondary" onClick={() => handleClosePopupUpload()}>
                        <i></i>Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

