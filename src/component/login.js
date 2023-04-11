import { React, useState } from "react";
import '../access/main.css';
import axios from "axios";
import { API_URL } from "../service/config";


function Login() {
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (e) => {
        e.preventDefault()
        await axios.post(`${API_URL}login`, 
        {
            username: username,
            password: password    
        })
        .then(response => {
            localStorage.clear()
            localStorage.setItem('accesstoken', response.data.jwt)
            localStorage.setItem('usertoken', JSON.stringify(response.data.user))
            window.location.replace("http://localhost:3000/upload")
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
                    <form onSubmit={handleLogin}>
                        <input 
                            type="text" 
                            id="login" 
                            className="fadeIn second" 
                            placeholder="Username"
                            value={username}
                            onChange={e => setUserName(e.target.value)}
                        />
                        <input 
                            type="text" 
                            id="password" 
                            className="fadeIn third" 
                            placeholder="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <input type="submit" className="fadeIn fourth" value="Log In" />
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;