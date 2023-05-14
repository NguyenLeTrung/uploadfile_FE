import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Modal } from "react-bootstrap";
import {
  getListAllAdmin,
  createAdmin,
  deleteAdmin,
  updateAdmin,
} from "../../service/files";
import { API_LOCALHOST } from "../../service/config";
import { showNotification } from "../../service/notifications";
import Sidebars from "../Layout/sidebar";

function AdminManagement() {
  const userLogin = JSON.parse(localStorage.getItem("usertoken"));
  if (!userLogin) {
    window.location.replace(`${API_LOCALHOST}admin/login`);
  }

  const [staffs, setStaffs] = useState({});
  const [lstStaff, setLstStaff] = useState([]);
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [phone, setPhone] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [id, setId] = useState();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showView, setShowView] = useState(false);
  const handleCloseView = () => setShowView(false)
  const handleShowView = (u) => {
    setShowView(true);
    setStaffs(u);
  }

  const [showUpdate, setShowUpdate] = useState(false)
  const handleCloseUpdate = () => setShowUpdate(false)
  const handleShowUpdate = (staff) => {
    setShowUpdate(true);
    setUserName(staff.name)
    setEmail(staff.email);
    setId(staff.id)
  }

  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => setShowDelete(false)
  const handleShowDelete = (user) => {
    setShowDelete(true);
    setId(user.id)
  }

  useEffect(() => {
    const userLogin = JSON.parse(localStorage.getItem("usertoken"));
    if (!userLogin) {
      window.location.replace(`${API_LOCALHOST}admin/login`);
    }
    getData();
  }, []);

  // List Staff
  const getData = () => {
    getListAllAdmin()
      .then((response) => {
        setLstStaff(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Create Admin
  const createStaff = () => {
    if (
      userName !== null &&
      userName !== undefined &&
      email !== null &&
      email !== undefined &&
      password !== null &&
      password !== undefined
    ) {
      createAdmin(userName, email, password)
        .then((response) => {
          setShow(false);
          showNotification("Create Admin success!", "success");
          getData();
        })
        .catch((error) => {
          console.log(error);
          showNotification("Create Admin fail!", "danger");
        });
    }
  };

  // Show/Hide Password
  const hidePassword = () => {
    setShowPassword(!showPassword);
  };


  // Update Admin
  const updateStaffs = () => {
    if (userName !== null && userName !== undefined
        && email !== null && email !== undefined)
    {
        updateAdmin(userName, email, id)
        .then(response => {
            setShowUpdate(false)
            showNotification("Update Admin success", "success");
        })
        .catch(error => {
            console.log(error);
            showNotification("Update Admin fail!", "danger");
        })
    }
  }

  // Delete Admin
  const deleteStaffs = () => {
    deleteAdmin(id) 
    .then(response => {
        setShowDelete(false);
        showNotification("Delete Admin success", "success");
        getData();
    })
    .catch(error => {
        console.log(error);
        showNotification("Delete Admin Fail!", "danger");
    })
  }

  return (
    <>
      <Sidebars />
      <div className="container" style={{ minHeight: "100vh" }}>
        <h2>Manage Admin</h2>
        <div className="row col-md-auto">
          <div className="col-md-8">
            <button className="btn btn-success" onClick={() => handleShow()}>
              <i className="fa fa-plus"></i> Add Admin
            </button>
          </div>
          <div className="col-md-4" style={{ textAlign: "right" }}>
            <form className="form-inline my-2 my-lg-0">
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                className="btn btn-outline-info my-2 my-sm-0"
                type="submit"
              >
                <i class="fa fa-search"></i>
              </button>
            </form>
          </div>
        </div>
        <div className="tab-content">
          <div className="tab-pane fade show active" id="user">
            <table className="table bordered mt-4">
              <thead className="thead-light">
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col-2">Username</th>
                  <th scope="col-2">Email</th>
                  <th scope="col-2">Update</th>
                  <th scope="col-2">Delete</th>
                </tr>
              </thead>
              <tbody>
                {lstStaff ? (
                  lstStaff.map((u, index) => (
                    <tr key={u.id}>
                      <td>{index + 1}</td>
                      <td style={{ cursor: "pointer" }} onClick={() => handleShowView(u)}>{u.name}</td>
                      <td style={{ cursor: "pointer" }} onClick={() => handleShowView(u)}>{u.email}</td>
                      <td>
                        <i
                          className="fa fa-edit"
                          style={{ color: "blue", cursor: "pointer" }}
                          onClick={() => handleShowUpdate(u)}
                        ></i>
                      </td>
                      <td>
                        <i
                          className="fa fa-remove"
                          style={{ color: "red", cursor: "pointer" }}
                          onClick={() => handleShowDelete(u)}
                        ></i>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              style={{ textAlign: "left" }}
              placeholder="Username"
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              style={{ textAlign: "left" }}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              style={{ textAlign: "left" }}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              style={{ right: "50px", top: "83%" }}
              onClick={() => hidePassword()}
            >
              {showPassword ? (
                <i className="fas fa-eye"></i>
              ) : (
                <i className="fas fa-eye-slash"></i>
              )}
            </span>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => createStaff()}>
            Save
          </Button>
          <Button variant="secondary" onClick={() => handleClose()}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    
    <Modal show={showView} onHide={handleCloseView} animation={false}>
            <Modal.Header>
                <Modal.Title>View Admin</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <div className="col-3">Username:</div>
                    <div className="col-3">{staffs.name}</div>
                </div>
                <hr></hr>
                <div className="row">
                    <div className="col-3">Email:</div>
                    <div className="col-3">{staffs.email}</div>
                </div>
                <hr></hr>
                <div className="row">
                    <div className="col-3">Gender:</div>
                    <div className="col-3">{staffs.gender}</div>
                </div>
                <hr></hr>
                <div className="row">
                    <div className="col-3">Phone:</div>
                    <div className="col-3">{staffs.phone}</div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => handleCloseView()} style={{ backgroundColor: "red"}}>
                    Close
                </Button>
            </Modal.Footer>
    </Modal>

    <Modal show={showUpdate} onHide={handleCloseUpdate} animation={false}>
            <Modal.Header>
                <Modal.Title>Update Admin</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="form-group">
                    <label>UserName</label>
                    <input 
                        type="text"
                        className="form-control"
                        style={{ textAlign: "left" }}
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        style={{ textAlign: "left" }}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Phone</label>
                    <input 
                        type="text"
                        className="form-control"
                        style={{ textAlign: "left" }}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => updateStaffs()}>
                    Update
                </Button>
                <Button variant="secondary" onClick={() => handleCloseUpdate()}>
                    Close
                </Button>
            </Modal.Footer>
    </Modal>

    <Modal show={showDelete} onHide={handleCloseDelete} animation={false}>
        <Modal.Header>
            <Modal.Title>Delete Admin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h2>Are you sure you want to delete ?</h2>
        </Modal.Body>
        <Modal.Footer>
            <Button
                style={{ backgroundColor: "red" }}
                onClick={() => deleteStaffs()} 
            >
                Delete
            </Button>
            <Button variant="secondary" onClick={() => handleCloseDelete()}>
                Close
            </Button>
        </Modal.Footer>
    </Modal>

      <footer className="text-center text-lg-start bg-light text-muted">
        <div
          className="text-center p-2"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.05)",
            justifyContent: "center",
          }}
        >
          Copyright © 2023 Julie Sandlau. All rights reserved
        </div>
      </footer>
    </>
  );
}

export default AdminManagement;
