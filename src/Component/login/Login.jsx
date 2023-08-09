 import style from "./login.module.css";
import { Link, NavLink } from "react-router-dom";
import { useState, useEffect} from "react";
import Logo from './wanderlist (1).png';
function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorUsername, setErrorUsername] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);

    useEffect(() => {
        // Clean up local storage data when component unmounts
        return () => {
          localStorage.getItem('UserID') !== null ? localStorage.removeItem('UserID') : console.log("no userID");
          localStorage.getItem('token') != null ? localStorage.removeItem('token') : console.log("no token");
        };
    
      }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (username === '') {
            setErrorUsername(true);
        } else {
            setErrorUsername(false);
        }

        if (password === '') {
            setErrorPassword(true);
        } else {
            setErrorPassword(false);
        }

        if (username != '' && password != '') {
            try {
                // Send login request to the server
                const response = await fetch('http://127.0.0.1:3000/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, password }),
                });

                const data = await response.json();
               

                if (response.ok) {
                    const { token } = data;
                    localStorage.setItem('token', token);

                    fetch('http://127.0.0.1:3000/protected', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                            // Add any other custom headers here
                        },
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            localStorage.setItem('UserID', data);
                            window.location.href = '/Homepage';
                        
                        })
                        .catch((error) => {
                            console.error(data.error);
                        });
                } else {
                    alert(data.error);
                }
            } catch (error) {
                console.error(error);
            }

        }
    };

    return (
        <div id={style.container}>
            <div id={style.LoginContainer}>
                <div id={style.formContainer}>

                    <form onSubmit={handleSubmit}>
                    <div> <img className="imgLogo" src={Logo} alt="Logo" style={{height:"30vh", borderRadius:"20px"}} /></div>
                        <br />
                        <input type="Username" placeholder="username" onChange={(e) => setUsername(e.target.value)}></input>
                        <br /> <div className="errorLabel"> {errorUsername && <label>Enter  Username!</label>}</div>

                        <br />
                        <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)}></input>
                        <br />  <div className="errorLabel"> {errorPassword && <label>Enter  Password!</label>}</div>
                        <br />
                        <button id={style.buttonLogin} type="submit" className="loginButton">Login</button>
                        <p>Dont have an account? <Link to='/register'>Sign Up</Link></p>
                        <div id={style.line}></div>
                        
                    </form>
                </div>

                <div id={style.welcome}>
                 <div> <img className="imgLogo" src={Logo} alt="Logo" /></div>
                 <div><p id={style.mobileSignup}>Dont have an account? <Link to='/register'>Sign Up</Link></p></div>
                </div>

            </div>
            <footer id={style.footer}>@WanderList</footer>
        </div>
    );
}

export default Login;