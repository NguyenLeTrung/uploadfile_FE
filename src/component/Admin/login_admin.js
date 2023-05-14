import { React, useState } from "react";
import '../../access/main.css'
import axios from "axios";
import { API_URL } from "../../service/config";
import { API_LOCALHOST } from "../../service/config";
import imageLogo from "../../access/image/logo_icon.png"
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { showNotification } from "../../service/notifications";

function LoginAdmin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [show, setShow] = useState(false)
    const [showView, setShowView] = useState(false)
    const handleCloseView = () => setShowView(false)
    const handleShowView = () => {
        setShowView(true);
    }

    const hidePassword = () => {
        setShow(!show)
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        await axios.post(`${API_URL}auth/login-password`,
            {
                email: email,
                password: password
            })
            .then(response => {
                localStorage.clear()
                localStorage.setItem('accesstoken', response.data.data.token.access_token)
                localStorage.setItem('refreshtoken', response.data.data.token.refresh_token)
                localStorage.setItem('usertoken', JSON.stringify(response.data.data.user))
                const users = JSON.parse(localStorage.getItem("usertoken"))
                if (users.service === 'staff') {
                    showNotification("Login Success!", "success")
                    window.location.replace(`${API_LOCALHOST}dashboard/user`)
                    console.log(`${API_LOCALHOST}dashboard/user`)
                    setTimeout(function () {
                        window.location.reload();
                    }, 1000)
                } else {
                    showNotification("Login Fail!", "danger")
                    setTimeout(function () {
                        window.location.reload();
                    }, 1000)
                }
            })  
            .catch(error => {
                console.log(error)
                showNotification("Login Fail!", "danger")
            });
    }

    return (
        <>
            <div className="container wrapper">
                <div>
                    <h2 style={{ color: 'black' }}>JULIE SANDLAU INTERNATIONAL</h2>
                    <img
                        src={imageLogo}
                        style={{ width: '30px', height: '30px' }}
                        alt="logo_icon"
                    />
                </div>
                <h2 style={{ fontSize: '12px', marginTop: '0px', marginBottom: '50px' }}>Private Upload File System</h2>
                <div id="formContent">
                    <h2>Login Admin</h2>
                    <form onSubmit={handleLogin}>
                        <div className="form group">
                            <label>Email</label>
                            <input
                                type="email"
                                id="login"
                                placeholder="Email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <br></br>
                        <div className="form group">
                            <label>Password</label>
                            <input
                                type={show ? 'text' : 'password'}
                                id="login"
                                placeholder="Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                            <span onClick={() => hidePassword()}>{show ? <i className="fas fa-eye"></i> : <i className="fas fa-eye-slash"></i>}</span>
                        </div>
                        <input type="submit" className="fadeIn" value="Log In" />
                        <a onClick={() => handleShowView()} style={{ cursor: 'pointer' }}>Terms & Conditions</a>
                    </form>
                </div>
                <Modal show={showView} onHide={handleCloseView} animation={false}>
                <Modal.Header>
                    <Modal.Title>Terms & Conditions</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    By uploading files into Julie Sandlau's secure data storage, you represent and warrant that you have the right and/or authority to agree to the following terms and conditions either on your own behalf or on behalf of your company (as applicable).
                    <br /> {" "}
                    You agree that the information, documents, materials, images, data, etc. that you include:<b>(a)</b> do not violate any applicable law, statute, directive, ordinance, treaty, contract, regulation, or Policies (collectively, "Laws"), <b>(b)</b> do not infringe any copyright, patent, trademark, trade secret, or other intellectual property rights of any person or entity,
                    <b>(c)</b> do not breach any duty toward or rights of, any person or entity, including rights of publicity and/or privacy, and <b>(d)</b> are not false, fraudulent, deceptive, or libelous.
                    <br /> {" "}
                    Violation of any of the foregoing may result in immediate termination of your agreement with Julie Sandlau or your account without notice and may subject you to legal penalties and consequences. 
                    You further agree that Julie Sandlau may download or delete any files that you upload for any or no reason.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleCloseView()} style={{ backgroundColor: 'red' }}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            </div>
        </>
    );
}

export default LoginAdmin;