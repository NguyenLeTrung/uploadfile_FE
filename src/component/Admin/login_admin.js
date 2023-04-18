import { React, useState } from "react";
import '../../access/main.css'
import axios from "axios";


function LoginAdmin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (e) => {
        e.preventDefault()
        await axios.post(`http://113.177.27.200:3010/v1/auth/login-password`, 
        {
            email: email,
            password: password    
        })
        .then(response => {
            localStorage.clear()
            localStorage.setItem('accesstoken', response.data.data.token.access_token)
            localStorage.setItem('refreshtoken', response.data.data.token.refresh_token)
            localStorage.setItem('usertoken', JSON.stringify(response.data.data.user))

        })
        .catch(error => console.log(error));

        const users = JSON.parse(localStorage.getItem("usertoken"))
        if (users.service === 'staff') {
            window.location.replace("http://localhost:3000/dashboard")
            setTimeout(function() {
                window.location.reload();
            }, 1000)
        }
    }

    return (
        <>
            <div className="container wrapper fadeInDown">
                <div id="formContent">
                    <form onSubmit={handleLogin}>
                        <input 
                            type="email"
                            id="login"
                            className="fadeIn third"
                            placeholder="Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <input 
                            type="password" 
                            id="login" 
                            className="fadeIn fouth" 
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

export default LoginAdmin;