import * as React from 'react';
import { createFolder, getListpath } from '../../service/files';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function BasicList() {

    const [name, setName] = useState([])
    const [nameFolder, setNameFolder] = useState()
    const [fileUpload, setFileUpload] = useState()
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

    const uploadFile = () => {
        console.log(fileUpload)
    }

    const subFolder = (f) => {
        window.location.replace('/sub_folder/' + f.name)
    }

    const changeNameFolder = (event) => {
        setNameFolder(event.target.value)
        console.log(nameFolder);
    }

    return (
        <div className='container'>
            <h2>Folder</h2>
            <div className="row col-md-12">
                <button className='btn btn-primary' onClick={() => handleShow()}><i className='fa fa-plus'></i> Create</button>
                <button className='btn btn-danger' style={{ marginLeft: '5px' }} onClick={() => handleShowPopupUpload()}>Update File</button>
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
                            <td scope='row' onDoubleClick={() => subFolder(f)}><i className='fa-regular fa-folder'></i> {f.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
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
                    <Button variant="primary" onClick={() => uploadFile()}>
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

