import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { Modal } from 'react-bootstrap';
import { getListAllUser, createUser, updateUser, getUserbyID, deleteUser } from '../../service/files';

function UserManagement() {

    const [users, setUsers] = useState()
    const [listUser, setUserlist] = useState([])
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const handleShowUpdate = () => {
        setShow(true)
    }

    const getData = () => {
        let promise;
        promise = getListAllUser()
        promise
            .then(response => {
                setUserlist(response.data)
                console.log(response.data)
            }).catch(error => {
                console.log(error);
            })
    }

    useEffect(() => {
        getData();
    }, [])

    const createUsers = () => {
        if (users !== null &&  users !== undefined) {
            createUser(users)
            .then(response => {
                setShow(false)
                getData();
            }).catch(error => {
                console.log(error)
            })
        }
    }

    const updateUsers = () => {
        if (users !== null && users !== undefined) {
            updateUser(users)
            .then(response => {
                setShow(false);
                getData();
            }).catch(error => {
                console.log(error);
            })
        }
    }

    const deleteUsers = (usernames) => {
        deleteUser(usernames)
        .then(response => {
            getData();
        }).catch(error => {
            console.log(error);
        })
    } 

  return (
    <>
       <div className='container'>
            <h2>Manage User</h2>
            <div className='row col-md-auto'>
                <button className='btn btn-success' onClick={() => handleShow()}><i className='fa fa-plus'></i> Add User</button>
            </div>

            <table className='table bordered mt-4'>
                <thead>
                    <tr>
                        <th scope='col'>ID</th>
                        <th scope='col-2'>Username</th>
                        <th scope='col-2'>Email</th>
                        <th onClick={() => handleShowUpdate()}>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {listUser.map((u, index) => {
                        <tr key={u.id}>
                            <td scope='row'>{index + 1}</td>
                            <td scope='row'>{u.name}</td>
                            <td scope='row'>{u.email}</td>
                            <td><i className='fa fa-plus'></i></td>
                            <td><i className='fa fa-remove'></i></td>
                        </tr>
                    })}
                </tbody>
            </table>
       </div>

       <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Header>
                <Modal.Title>Add User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control" style={{ textAlign: 'left', boxSizing: 'unset' }} placeholder='username'/>
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" style={{ textAlign: 'left', boxSizing: 'unset' }} placeholder='email'/>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" style={{ textAlign: 'left', boxSizing: 'unset' }} placeholder='password'/>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => createUsers()}>
                    Add
                </Button>
                <Button variant="secondary" onClick={() => handleClose()}>
                    <i></i>Close
                </Button>
            </Modal.Footer>
        </Modal>
    </>
  );
}

export default UserManagement;
