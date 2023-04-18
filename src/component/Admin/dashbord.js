import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { Modal } from 'react-bootstrap';
import { getListAllUser, createUser, updateUser, getUserbyID, deleteUser } from '../../service/files';

function UserManagement() {

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

    const handleShowUpdate = (user) => {
        setShowUpdate(true)
        setUserName(user.name)
        setEmail(user.email)
        setId(user.id)
    }

    useEffect(() => {
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

    const deleteUsers = (user) => {
        deleteUser(user)
            .then(response => {
                getData();
            }).catch(error => {
                console.log(error);
            })
    }

    return (
        <div className='container'>
            <h2>Manage User</h2>
            <div className='row col-md-auto'>
                <button className='btn btn-success' onClick={() => handleShow()}><i className='fa fa-plus'></i> Add User</button>
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
                            <td onClick={() => handleShowView(u)}>{u.name}</td>
                            <td>{u.email}</td>
                            <td onClick={() => handleShowUpdate(u)}><i className='fa fa-edit'></i></td>
                            <td onClick={() => deleteUsers(u)}><i className='fa fa-remove'></i></td>
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
            <Modal show={showView} onHide={handleCloseView} animation={false}>
                <Modal.Header>
                    <Modal.Title>View user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <label>Username: {users.name}</label>
                    </div>
                    <div className="form-group">
                        <label>Email: {users.email}</label>
                    </div>
                    <div className="form-group">
                        <label>Gender: {users.gender}</label>
                    </div>
                    <div className="form-group">
                        <label>Phone: {users.phone}</label>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleCloseView()}>
                        <i className='fa fa-close'></i>Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default UserManagement;
