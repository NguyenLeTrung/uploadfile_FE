import * as React from 'react';
import { createFolder, getListpath, uploadFile, updateFolder, deleteFolder } from '../../service/files';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { API_LOCALHOST } from '../../service/config';

export default function Upload() {

    const [name, setName] = useState([])
    const [nameFolder, setNameFolder] = useState()
    const [oldNameFolder, setOldNameFolder] = useState()
    const [fileUpload, setFileUpload] = useState()
    const [paths, setPaths] = useState()
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => {
        setNameFolder('')
        setShow(true)
    }
    const [showUpload, setShowUpload] = useState(false)
    const handleClosePopupUpload = () => setShowUpload(false)
    const handleShowPopupUpload = () => setShowUpload(true)

    const [showUpdate, setShowUpdate] = useState(false)
    const handleCloseUpdate = () => setShowUpdate(false)
    const handleShowUpdate = (f) => {
        setOldNameFolder(f.name)
        setNameFolder(f.name)
        setShowUpdate(true)
    }

    const [showDelete, setShowDelete] = useState(false)

    const handleCloseDelete = () => setShowDelete(false)

    const handleShowDelete = (name) => {
        setShowDelete(true)
        setPaths(name.path)
    }

    const [checkAll, setCheckAll] = useState(false)

    const getData = () => {
        let promise;
        promise = getListpath("");
        promise
            .then(response => {
                let list = [];
                console.log(response)
                response.data.forEach(item => {
                    let customItem = {};
                    customItem = { ...item, check: false }
                    list = [...list, customItem];
                });
                setName(list)
                console.log(list)
            }).catch(error => {
                setName([])
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
                setShowUpdate(false);
                getData();
            }).catch(error => {
                console.log(error);
            })

        }
    }

    const uploadFiles = () => {
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
        setNameFolder(event.target.value)
    }


    const deleteFolderFile = () => {
        console.log(paths)
        deleteFolder(paths)
            .then(response => {
                setShowDelete(false);
                getData();
            })
            .catch(error => {
                console.log(error);
            }).finally(getData());
    }

    const logout = () => {
        localStorage.clear()
        window.location.replace('/')
    }

    const dowloadFile = (f) => {
        window.open(f.path)
    }

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
    return (
        <div className='container'>
            <h2>Folder</h2>
            <div className="row col-md-auto">
                <div className='col-md-8'>
                    <button className='btn btn-primary' onClick={() => handleShow()}><i className='fa fa-plus'></i> Create</button>
                    <button className='btn btn-secondary' style={{ marginLeft: '5px' }} onClick={() => handleShowPopupUpload()}>Upload File</button>
                </div>
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
                        <i className='fa fa-remove'></i>{" "} Delete
                    </Button>
                    <Button variant="secondary" onClick={() => handleCloseDelete()}>
                        <i className='fa fa-close'></i>{" "}Close
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

