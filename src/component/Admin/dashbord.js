import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { Modal } from 'react-bootstrap';
import { getListAllUser, createUser, updateUser, deleteUser } from '../../service/files';
import { API_LOCALHOST } from '../../service/config';

function UserManagement() {

    const userLogin = JSON.parse(localStorage.getItem("usertoken"))
    if (!userLogin) {
        window.location.replace(`${API_LOCALHOST}admin/login`)
    }

    const [users, setUsers] = useState({})
    const [lstUser, setLstUser] = useState([])
    const [show, setShow] = useState(false)
    const [showUpdate, setShowUpdate] = useState(false)
    const [showView, setShowView] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const handleCloseView = () => setShowView(false)
    const handleShowView = (u) => {
        setShowView(true);
        setUsers(u)
    }
    const handleCloseUpdate = () => setShowUpdate(false)
    const [userName, setUserName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [id, setId] = useState()

    const [showDelete, setShowDelete] = useState(false)
    const handleCloseDelete = () => setShowDelete(false)

    const handleShowDelete = (user) => {
        setShowDelete(true)
        setId(user.id)
    }

    const handleShowUpdate = (user) => {
        setShowUpdate(true)
        setUserName(user.name)
        setEmail(user.email)
        setId(user.id)
    }

    useEffect(() => {
        const userLogin = JSON.parse(localStorage.getItem("usertoken"))
        if (!userLogin) {
            window.location.replace(`${API_LOCALHOST}admin/login`)
        }
        getData();
    }, [])

    const getData = () => {
        getListAllUser()
            .then(response => {
                setLstUser(response.data)
            }).catch(error => {
                console.log(error);
            })
    }
    const createUsers = () => {
        if (userName !== null && userName !== undefined
            && email !== null && email !== undefined
            && password !== null && password !== undefined) {
            createUser(userName, email, password)
                .then(response => {
                    setShow(false)
                    getData();
                }).catch(error => {
                    console.log(error)
                })
        }
    }

    const updateUsers = () => {
        if (userName !== null && userName !== undefined
            && email !== null && email !== undefined) {
            updateUser(userName, email, id)
                .then(response => {
                    setShowUpdate(false);
                    getData();
                }).catch(error => {
                    console.log(error);
                })
        }
    }

    const deleteUsers = () => {
        deleteUser(id)
            .then(response => {
                setShowDelete(false);
                getData();
            }).catch(error => {
                console.log(error);
            })
    }

    const logout = () => {
        localStorage.clear()
        window.location.replace('/admin/login')
    }

    return (
        <div className='container'>
            <h2>Manage User</h2>
            <div className='row col-md-auto'>
                <div className='col-md-8'>
                    <button className='btn btn-success' onClick={() => handleShow()}><i className='fa fa-plus'></i> Add User</button>
                </div>
                <div className='col-md-4' style={{ textAlign: 'right' }}>
                    <button className='btn' onClick={() => logout()}><i className='fa-solid fa-right-from-bracket'></i></button>
                </div>
            </div>
            <table className="table bordered mt-4">
                <thead>
                    <tr>
                        <th scope='col'>ID</th>
                        <th scope='col-2'>Username</th>
                        <th scope='col-2'>Email</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {lstUser.map((u, index) => (
                        <tr key={u.id}>
                            <td scope='row'>{index + 1}</td>
                            <td onClick={() => handleShowView(u)} style={{ cursor: 'pointer' }}>{u.name}</td>
                            <td onClick={() => handleShowView(u)} style={{ cursor: 'pointer' }}>{u.email}</td>
                            <td onClick={() => handleShowUpdate(u)}><i className='fa fa-edit' style={{ color: 'blue', cursor: 'pointer' }}></i></td>
                            <td onClick={() => handleShowDelete(u)}><i className='fa fa-remove' style={{ color: 'red', cursor: 'pointer' }}></i></td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header>
                    <Modal.Title>Add User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" className="form-control" style={{ textAlign: 'left', boxSizing: 'unset' }} placeholder='username' onChange={e => setUserName(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="form-control" style={{ textAlign: 'left', boxSizing: 'unset' }} placeholder='email' onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" style={{ textAlign: 'left', boxSizing: 'unset' }} placeholder='password' onChange={e => setPassword(e.target.value)} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => createUsers()}>
                        Save
                    </Button>
                    <Button variant="secondary" onClick={() => handleClose()}>
                        <i className='fa fa-close'></i>Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showUpdate} onHide={handleCloseUpdate} animation={false}>
                <Modal.Header>
                    <Modal.Title>Update user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" className="form-control" style={{ textAlign: 'left', boxSizing: 'unset' }} placeholder='username' onChange={e => setUserName(e.target.value)} value={userName} />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="form-control" style={{ textAlign: 'left', boxSizing: 'unset' }} placeholder='email' value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => updateUsers()}>
                        Update
                    </Button>
                    <Button variant="secondary" onClick={() => handleCloseUpdate()}>
                        <i className='fa fa-close'></i>Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showDelete} onHide={handleCloseDelete} animation={false}>
                <Modal.Header>
                    <Modal.Title>Delete User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h2>Are you sure you want to delete?</h2>
                </Modal.Body>
                <Modal.Footer>
                    <Button style={{ backgroundColor: 'red' }} onClick={() => deleteUsers()}>
                        <i className='fa fa-remove'></i>{" "} Delete
                    </Button>
                    <Button variant="secondary" onClick={() => handleCloseDelete()}>
                        <i className='fa fa-close'></i>{" "}Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showView} onHide={handleCloseView} animation={false}>
                <Modal.Header>
                    <Modal.Title>View user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='row'>
                        <div className='col-3'>
                            Username:
                        </div>
                        <div className='col-3'>
                            {users.name}
                        </div>
                    </div>
                    <hr></hr>
                    <div className='row'>
                        <div className='col-3'>
                            Email:
                        </div>
                        <div className='col-3'>
                            {users.email}
                        </div>
                    </div>
                    <hr></hr>
                    <div className='row'>
                        <div className='col-3'>
                            Gender:
                        </div>
                        <div className='col-3'>
                            {users.gender}
                        </div>
                    </div>
                    <hr></hr>
                    <div className='row'>
                        <div className='col-3'>
                            Phone:
                        </div>
                        <div className='col-3'>
                            {users.phone}
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleCloseView()} style={{ backgroundColor: 'red' }}>
                        <i className='fa fa-close'></i>{" "}Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default UserManagement;
