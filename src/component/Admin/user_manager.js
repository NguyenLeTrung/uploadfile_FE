import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Modal } from "react-bootstrap";
import {
  getListAllUser,
  createUser,
  updateUser,
  deleteUser,
  resetPasswordbyId,
} from "../../service/files";
import { API_LOCALHOST } from "../../service/config";
import { showNotification } from "../../service/notifications";
import Sidebars from "../Layout/sidebar";
import Pagination from "../Layout/pagination";


function UserManagement() {
  const userLogin = JSON.parse(localStorage.getItem("usertoken"));
  if (!userLogin) {
    window.location.replace(`${API_LOCALHOST}admin/login`);
  }

  const [users, setUsers] = useState({});
  const [lstUser, setLstUser] = useState([]);
  const [show, setShow] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showView, setShowView] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseView = () => setShowView(false);
  const handleShowView = (u) => {
    setShowView(true);
    setUsers(u);
  };
  const handleCloseUpdate = () => setShowUpdate(false);
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [phone, setPhone] = useState();
  const [id, setId] = useState();
  const [newPasswordId, setNewPasswordId] = useState();
  const [showResetPasswordbyId, setshowResetPasswordbyId] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);

  const handleShowDelete = (user) => {
    setShowDelete(true);
    setId(user.id);
  };

  const handleCloseResetPasswordId = () => setshowResetPasswordbyId(false);
  const handleShowResetPasswordId = (user) => {
    setshowResetPasswordbyId(true);
    setId(user.id);
  };

  const handleShowUpdate = (user) => {
    setShowUpdate(true);
    setUserName(user.name);
    setEmail(user.email);
    setId(user.id);
  };

  // Search
  const [keySearch, setKeySearch] = useState()
  // const [currentPage, setCurrentPage] = useState(1)
  // const [postPerPage, setPostPerPage] = useState(8)

  useEffect(() => {
    const userLogin = JSON.parse(localStorage.getItem("usertoken"));
    if (!userLogin) {
      window.location.replace(`${API_LOCALHOST}admin/login`);
    }
    getData();
  }, []);

  const getData = () => {
    getListAllUser()
      .then((response) => {
        setLstUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // pagination
  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPage = 5
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = lstUser.slice(firstIndex, lastIndex);
  const npage = Math.ceil(lstUser.length / recordsPerPage)
  const numbers = [...Array(npage + 1).keys()].slice(1)

  const createUsers = () => {
    if (
      userName !== null &&
      userName !== undefined &&
      email !== null &&
      email !== undefined &&
      password !== null &&
      password !== undefined
    ) {
      createUser(userName, email, password)
        .then((response) => {
          setShow(false);
          showNotification("Create user success !", "success");
          getData();
        })
        .catch((error) => {
          console.log(error);
          showNotification("Create user fail !", "danger");
        });
    }
  };

  const updateUsers = () => {
    if (
      userName !== null &&
      userName !== undefined &&
      email !== null &&
      email !== undefined
    ) {
      updateUser(userName, email, id)
        .then((response) => {
          setShowUpdate(false);
          showNotification("Update user success !", "success");
          getData();
        })
        .catch((error) => {
          console.log(error);
          showNotification("Update user fail !", "danger");
        });
    }
  };

  const deleteUsers = () => {
    deleteUser(id)
      .then((response) => {
        setShowDelete(false);
        showNotification("Delete user success !", "success");
        getData();
      })
      .catch((error) => {
        console.log(error);
        showNotification("Delete user fail !", "danger");
      });
  };
  
  const hidePassword = () => {
    setShowPassword(!showPassword);
  };

  const resetPasswordbyIds = () => {
    resetPasswordbyId(newPasswordId, id)
      .then((response) => {
        setshowResetPasswordbyId(false);
        showNotification("Update Password success", "success");
        console.log("success");
      })
      .catch((error) => {
        console.log(error);
        showNotification("Update Password fail", "danger");
      });
  };

  const changeNewPasswordbyId = (e) => {
    setNewPasswordId(e.target.value);
  };


  // Search
  const handleSearch = () => {
    if(keySearch !== '' && keySearch !== undefined && keySearch !== null){
      const lstUserFilter = lstUser.filter(x => x.name.toLowerCase().includes(keySearch.toLowerCase()) 
      || x.email.toLowerCase().includes(keySearch.toLowerCase()))
      setLstUser(lstUserFilter);
    }else{
      getData();
    }
  }

  return (
    <>
    <Sidebars />
      <div className="container" style={{ minHeight: "100vh" }}>
        <h2>Manage User</h2>
        <div className="row col-md-auto">
          <div className="col-md-8">
            <button className="btn btn-success" onClick={() => handleShow()}>
              <i className="fa fa-plus"></i> Add User
            </button>
          </div>
          <div className="col-md-4" style={{ textAlign: "right" }}>
            <form className="form-inline my-2 my-lg-0">
              <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={(e) => setKeySearch(e.target.value)}/>
              <button className="btn btn-outline-info my-2 my-sm-0" type="button" onClick={() => handleSearch()}><i class="fa fa-search"></i></button>
            </form>
          </div>
        </div>
        <div className="tab-content">
            <table className="table bordered mt-4">
              <thead className="thead-light">
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col-2">Username</th>
                  <th scope="col-2">Email</th>
                  <th scope="col-2">Update</th>
                  <th scope="col-2">Delete</th>
                  <th scope="col-2">Reset Password</th>
                </tr>
              </thead>
              <tbody>
                {lstUser ? (
                  records.map((u, index) => (
                    <tr key={u.id}>
                      <td>{index + 1}</td>
                      <td
                        onClick={() => handleShowView(u)}
                        style={{ cursor: "pointer" }}
                      >
                        {u.name}
                      </td>
                      <td
                        onClick={() => handleShowView(u)}
                        style={{ cursor: "pointer" }}
                      >
                        {u.email}
                      </td>
                      <td onClick={() => handleShowUpdate(u)}>
                        <i
                          className="fa fa-edit"
                          style={{ color: "blue", cursor: "pointer" }}
                        ></i>
                      </td>
                      <td onClick={() => handleShowDelete(u)}>
                        <i
                          className="fa fa-remove"
                          style={{ color: "red", cursor: "pointer" }}
                        ></i>
                      </td>
                      <td
                        style={{ cursor: "pointer" }}
                        onClick={() => handleShowResetPasswordId(u)}
                      >
                        <i className="fa fa-key"></i>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr></tr>
                )}
              </tbody>
            </table>
            <nav>
                <ul className="pagination">
                  <li className="page-item">
                    <a href="#" className="page-link" onClick={prePage}>Prev</a>
                  </li>
                  {
                    numbers.map((n, i) => (
                      <li className={`page-item ${currentPage === n ? "active" : ""}`} key={i}>
                        <a href="#" className="page-link" 
                        onClick={changePage}>
                          {n}
                        </a>
                      </li>
                    ))
                  }
                  <li className="page-item">
                    <a href="#" className="page-link" onClick={nextPage}>Next</a>
                  </li>
                </ul>
            </nav>
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
            <Button variant="primary" onClick={() => createUsers()}>
              Save
            </Button>
            <Button variant="secondary" onClick={() => handleClose()}>
              Close
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
              <input
                type="text"
                className="form-control"
                style={{ textAlign: "left" }}
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
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
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => updateUsers()}>
              Update
            </Button>
            <Button variant="secondary" onClick={() => handleCloseUpdate()}>
              Close
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
            <Button
              style={{ backgroundColor: "red" }}
              onClick={() => deleteUsers()}
            >
              Delete
            </Button>
            <Button variant="secondary" onClick={() => handleCloseDelete()}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={showView} onHide={handleCloseView} animation={false}>
          <Modal.Header>
            <Modal.Title>View user</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-3">Username:</div>
              <div className="col-3">{users.name}</div>
            </div>
            <hr></hr>
            <div className="row">
              <div className="col-3">Email:</div>
              <div className="col-3">{users.email}</div>
            </div>
            <hr></hr>
            <div className="row">
              <div className="col-3">Gender:</div>
              <div className="col-3">{users.gender}</div>
            </div>
            <hr></hr>
            <div className="row">
              <div className="col-3">Phone:</div>
              <div className="col-3">{users.phone}</div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => handleCloseView()}
              style={{ backgroundColor: "red" }}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal
          show={showResetPasswordbyId}
          onHide={handleCloseResetPasswordId}
          animation={true}
        >
          <Modal.Header>
            <Modal.Title>Reset Password</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form-group">
              <label>New Password</label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="**************"
                value={newPasswordId}
                onChange={changeNewPasswordbyId}
                defaultValue={""}
              />
            </div>
            <input type="checkbox" onClick={() => hidePassword()} /> Show
            Password
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => resetPasswordbyIds()}>
              Change
            </Button>
            <Button
              variant="secondary"
              onClick={() => handleCloseResetPasswordId()}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

      <footer className="text-center text-lg-start bg-light text-muted">
        <div
          className="text-center p-2"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.05)", justifyContent: "center" }}
        >
          Copyright © 2023 Julie Sandlau. All rights reserved
        </div>
      </footer>
    </>
  );

  // 
  function prePage() {
    if (currentPage !== firstIndex) {
      setCurrentPage(currentPage - 1)
    }
  }

  function changePage(id) {
    setCurrentPage(id)
  }

  function nextPage() {
    if (currentPage !== lastIndex) {
      setCurrentPage(currentPage + 1)
    }
  }
}

export default UserManagement;
