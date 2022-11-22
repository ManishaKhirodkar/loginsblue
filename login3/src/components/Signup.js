import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../components/style.css'


function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate= useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/home');
        }
    },[])
    
    const collectData = async () => {
        console.warn(name,email,password)
        let result = await fetch('http://localhost:5000/register', {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
            headers: {
                'content-type': 'application/json'
            },
        });
        result = await result.json();
        console.warn(result);
        localStorage.setItem("user", JSON.stringify(result.result));
        localStorage.setItem("token", JSON.stringify(result.auth));
        if (result) {
            navigate('/home')
        }
    }

    return (
        <div className="container-fluid">
            <div className="card">
                <div className="inner-box">
                    <div className="card-back">
                        <h2>REGISTER</h2>
                        <form>
                            <input type="text"name='uname' className="input-box" placeholder="Your Name" required value={name} onChange={(e) => setName(e.target.value)} />
                            <input type="email" name='uname' className="input-box" placeholder="Your Email id" required value={email} onChange={(e) => setEmail(e.target.value)} />
                            <input type="password" name='psw' className="input-box" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
                            <button type="submit"  className="submit-btn"  onClick={collectData}>Submit</button>
                            <input type="checkbox" /><span>Remember Me</span>
                        </form>
                        <a className="btn" href='/'>I've an account</a>
                       
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup