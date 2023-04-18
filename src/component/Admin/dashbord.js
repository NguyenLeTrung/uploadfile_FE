import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { Modal } from 'react-bootstrap';

function UserManagement() {

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const handleShowUpdate = () => {
        setShow(true)
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
                    <tr>
                        <td scope='row'>1</td>
                        <td scope='row-2'>1233532</td>
                        <td scope='row'>test@gmail.com</td>
                        <td><i className='fa fa-edit' style={{ color: 'blue'}}></i></td>
                        <td><i className='fa fa-trash' style={{ color: 'red'}}></i></td>
                    </tr>
                    <tr>
                        <td scope='row'>2</td>
                        <td scope='row'>1233532</td>
                        <td scope='row'>tr124@gmail.com</td>
                        <td><i className='fa fa-edit' style={{ color: 'blue'}}></i></td>
                        <td><i className='fa fa-trash' style={{ color: 'red'}}></i></td>
                    </tr>
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
                    <input type="text" className="form-control" style={{ textAlign: 'left' }} />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" style={{ textAlign: 'left', boxSizing: 'unset' }}/>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="text" className="form-control" style={{ textAlign: 'left' }} />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary">
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
