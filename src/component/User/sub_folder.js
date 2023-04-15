import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { createFolder, getListpath } from '../../service/files';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
export default function SubFolder() {

    const nameFolder = useParams();

    const [folder, setFolder] = useState([])
    const [subFolderName, setSubFolderName] = useState([])
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    useEffect(() => {
        getSubFolder();
    }, [])

    const getSubFolder = () => {
        getListpath('/' + nameFolder.name)
            .then(response => {
                setFolder(response.data)
            }).catch(error => {
                console(error);
            })
    }

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

    const uploadFile = () => {

    }

    const subFolder = (f) => {
        window.location.replace(window.location.pathname + '/' + f.name)
    }

    const changeNameFolder = (event) => {
        setSubFolderName(event.target.value)
    }

    return (
        <div className='container mt-5'>
            {/* Header */}
            <div className="row col-md-12">
                <button className='btn btn-primary' onClick={() => handleShow()}><i className='fa fa-plus'></i> Create</button>
                <button className='btn btn-danger' style={{ marginLeft: '5px' }} onClick={() => uploadFile() }>Update File</button>
            </div>
            <table className="table bordered mt-4" >
                <thead>
                    <tr>
                        <th scope='col'>ID</th>
                        <th scope='col-2'>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {folder.map((f, index) => (
                        <tr key={f.id}>
                            <td scope='row'>{index + 1}</td>
                            <td scope='row' onDoubleClick={() => subFolder(f)}><i className="fa-regular fa-folder"></i> {f.name}</td>
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
                    <Button variant="primary" onClick={() => createSubFolder()}>
                        Save
                    </Button>
                    <Button variant="secondary" onClick={() => handleClose()}>
                        <i></i>Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );

}