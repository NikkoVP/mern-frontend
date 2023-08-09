import { useState, useEffect } from 'react';
import style from './register.module.css';
import { Link } from 'react-router-dom';
import Logo from './wanderlist (1).png';
function Register() {

    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    //error message 
    const [userLength, setUserLength] = useState(false)
    const [passwordLength, setPasswordLength] = useState(false);
    const [emailLength, setEmailLength] = useState('');
    //AlreadyRegister 
    const [userList, setUserList] = useState([]);


    // GET THE USERS
    const fetchData = async () => {
        const response = await fetch(`http://127.0.0.1:3000/users`)
        const { data } = await response.json();
        setUserList(data)
    };

    useEffect(() => {
        fetchData();
    }, []);

    const user = userList.filter((data) => {
        if (data.username === username) {
            return data;
        }
    })

    //   SIGNUP FUNCTION
    function signup(e) {
        e.preventDefault();
        console.log(`hello ${username}`);
        console.log(username)
        //USERNAME VALIDATION
        if (username.length <= 5) {
            setUserLength(true)
        }
        else {
            setUserLength(false)
        }

        // PASSWORD VALIDATION
        if (password.length <= 5) {
            setPasswordLength(true)
        }
        else {
            setPasswordLength(false)
        }

        if (userLength === false && passwordLength === false && emailLength !== ' ') {
            const userData = {
                username,
                password,
                email
            }
            console.log(user)
            if (user.length === 0) {

                fetch('http://127.0.0.1:3000/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userData),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data);
                        alert("Registration Successful!");
                        window.location.href= '/';
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            } else { alert("username taken") }
        }
        
    };


    return (
        <div>
  <div id={style.container}>
                <div id={style.SignUpContainer}>
                    <div id={style.formContainer}>

                        <form onSubmit={signup}>
                            <h1>Registration</h1>
                            <br />
                            <input type="Username" id="userName" placeholder="username" onChange={(e) => setUserName(e.target.value)} ></input>
                            <br />{userLength ? <span>Username should be atleast length of 6 character</span> : null}
                            <br />
                            <br />
                            <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} ></input>
                            <br />{passwordLength ? <span>Password should be atleast of 6 character</span> : null}
                            <br />
                            <br />
                            <input type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} required ></input>
                            <br />
                            <br />
                            <br />
                            <button type='submit' id={style.buttonSignUp}>SignUp</button>
                            <div id={style.line}></div>
                            <p >Already have an account?<Link to='/'>Login</Link></p>
                        </form>
                    </div>

                    <div id={style.welcome}>
                    

                    </div>

                </div>
                <footer id={style.footer}>@WanderList</footer>
            </div>
        </div>
    );
}

export default Register;