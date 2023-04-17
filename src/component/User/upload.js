import * as React from 'react';
import { createFolder, getListpath, uploadFile, updatefolder } from '../../service/files';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function BasicList() {

    const [name, setName] = useState([])
    const [nameFolder, setNameFolder] = useState()
    const [fileUpload, setFileUpload] = useState()
    const [paths, setPaths] = useState()
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const [showUpload, setShowUpload] = useState(false)
    const handleClosePopupUpload = () => setShowUpload(false)
    const handleShowPopupUpload = () => setShowUpload(true)

    const getData = () => {
        let promise;
        promise = getListpath("");
        promise
            .then(response => {
                setName(response.data)
            }).catch(error => {
                console(error);
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
            updatefolder(nameFolder, '').then(response => {
                setShow(false);
                getData();
            }).catch(error => {
                console.log(error);
            })
            
        }
    }

    const uploadFiles = () => {
        const users = JSON.parse(localStorage.getItem('usertoken'))
        console.log(users)
        uploadFile(fileUpload.name, '')
        .then(response => {
            getData();
            console.log(fileUpload.name);
        })
        .catch(error => {
            console.log(error);
        }).finally(getData());
    }

    const subFolder = (f) => {
        window.location.replace('/sub_folder/' + f.name)
    }

    const changeNameFolder = (event) => {
        setNameFolder(event.target.value)
    }

    return (
        <div className='container'>
            <h2>Folder</h2>
            <div className="row col-md-auto">
                <button className='btn btn-primary' onClick={() => handleShow()}><i className='fa fa-plus'></i> Create</button>
                <button className='btn btn-danger' style={{ marginLeft: '5px' }} onClick={() => handleShowPopupUpload()}>Upload File</button>
            </div>
            <table className="table bordered mt-4">
                <thead>
                    <tr>
                        <th scope='col'>ID</th>
                        <th scope='col-2'>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {name.map((f, index) => (
                        <tr key={f.id}>
                            <td scope='row'>{index + 1}</td>
                            <td scope='row' 
                                onDoubleClick={() => subFolder(f)} 
                                style={{ cursor: 'pointer' }}
                                // onClick={() => handleShow()}
                            >
                                <i className='fa-regular fa-folder'></i> 
                                {" "}{f.name}
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
                        <input type="text" className="form-control" style={{ textAlign: 'left' }} name="nameFolder" id='nameFolder' onChange={changeNameFolder} />
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
                        <input type='text' className='form-control' style={{ textAlign: 'left' }} name='nameFolder' id='nameFolder' onChange={changeNameFolder} />
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

