import React, { useState } from "react";
import { showNotification } from "../../service/notifications";
import imageLogo from "../../access/image/logo_icon.png";
import { API_LOCALHOST } from "../../service/config";
import { resetPasswords } from "../../service/files";
import { Button, Modal } from "react-bootstrap";

function Sidebars() {
  const [showResetPassword, setshowResetPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [showPassword, setShowPassword] = useState();

  const handleCloseResetPassword = () => setshowResetPassword(false);
  const handleShowResetPassword = () => {
    setshowResetPassword(true);
  };

  const hidePassword = () => {
    setShowPassword(!showPassword);
  };

  const resetPassword = () => {
    resetPasswords(currentPassword, newPassword)
      .then((response) => {
        setshowResetPassword(false);
        showNotification("Update Password success", "success");
      })
      .catch((error) => {
        console.log(error);
        showNotification("Update Password fail", "danger");
      });
  };

  const changeCurrentPassword = (e) => {
    setCurrentPassword(e.target.value);
  };

  const changeNewPassword = (e) => {
    setNewPassword(e.target.value);
  };

  const logOut = () => {
    localStorage.clear();
    showNotification("Logout Success", "success");
    window.location.replace(`${API_LOCALHOST}admin/login`);
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-light"
        style={{ marginTop: "-20px" }}
      >
        <div>
          <a className="navbar-brand" href="/dashboard/user">
            <img
              src={imageLogo}
              alt="logo_icon"
              style={{ marginLeft: "40px" }}
            />
          </a>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fa fa-bars"></i>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a
                className="nav-link"
                href="/dashboard/user"
                style={{ width: "150px" }}
              >
                Manage User
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="/dashboard/admin"
                style={{ width: "150px" }}
              >
                Manage Admin
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                style={{ width: "150px", cursor: 'pointer' }}
                onClick={() => handleShowResetPassword()}
              >
                Reset Password
              </a>
            </li>
          </ul>

          <a style={{ cursor: "pointer" }} onClick={() => logOut()} href="#/">
            Sign Out <i className="fa-solid fa-right-from-bracket"></i>
          </a>
        </div>
      </nav>
      <Modal
        show={showResetPassword}
        onHide={handleCloseResetPassword}
        animation={true}
      >
        <Modal.Header>
          <Modal.Title>ResetPassword</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label>Current Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="***************"
              value={currentPassword}
              onChange={changeCurrentPassword}
              defaultValue={""}
            />
          </div>
          <div className="form-group">
            <label>New Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="****************"
              value={newPassword}
              onChange={changeNewPassword}
              defaultValue={""}
            />
          </div>
          <input type="checkbox" onClick={() => hidePassword()} />
          {" "} Show Password
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => resetPassword()}>
            Change
          </Button>
          <Button
            variant="secondary"
            onClick={() => handleCloseResetPassword()}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Sidebars;
