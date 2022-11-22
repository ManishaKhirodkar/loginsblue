import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../components/style.css'


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/home')
        }
    }, [])
    const handlelogin = async () => {
        console.warn("email,password", email, password);
        let result = await fetch('http://localhost:5000/login', {
            method: 'post',
            body: JSON.stringify({ email, password }),
            headers: {
                'content-type': 'application/json'
            }
        });
        result = await result.json();
        console.warn(result);
        if (result.auth) {
            localStorage.setItem('user', JSON.stringify(result.user));
            localStorage.setItem('token', JSON.stringify(result.auth));
            navigate('/home')
        } else {
            alert('Please enter correct details');
        }
    }

    return (
        <div className="container-fluid">
            <div className="card">
                <div className="inner-box" >
                    <div className="card-front">
                        <h2>LOGIN</h2>
                        <form>
                            <input type="email" className="input-box" placeholder="Your Email id" required 
                            value={email} onChange={(e) => setEmail(e.target.value)}/>
                            <input type="password" className="input-box" placeholder="Password" required 
                            value={password} onChange={(e) => setPassword(e.target.value)}/>
                            <button type="submit" className="submit-btn" onClick={handlelogin}>Submit</button>
                            <input type="checkbox" /><span>Remember Me</span>
                        </form>
                      <a className="btn" href='/signup'>I'm New Here</a>
                        <a href="">Forgot password</a>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Login