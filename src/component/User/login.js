import { React, useState } from "react";
import '../../access/main.css'
import axios from "axios";
import { API_URL } from "../../service/config";
import { API_LOCALHOST } from "../../service/config";
import "../../access/image/logo_icon.png"

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

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
            window.location.replace(`${API_LOCALHOST}upload`)
            setTimeout(function() {
                window.location.reload();
            }, 1000)
        })
        .catch(error => console.log(error));
    }

    return (
        <>
            <div className="container wrapper fadeInDown">
                <div id="formContent">
                    <h2>Login</h2>
                    <form onSubmit={handleLogin}>
                        <div className="form group fadeIn third">
                            <label>Email</label>
                            <input 
                                type="email"
                                id="login"
                                placeholder="Email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <br></br>         
                        <div className="form group fadeIn fouth">
                            <label>Password</label>
                            <input 
                                type="password"
                                id="login"
                                placeholder="Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                        <input type="submit" className="fadeIn fourth" value="Log In" />
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;