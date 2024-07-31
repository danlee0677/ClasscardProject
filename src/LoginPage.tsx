import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import axios from "axios";

interface props {
    setLoggedIn : any;
    setLoggedUser : any
}

export const Login : React.FC<props> = ({setLoggedIn, setLoggedUser} : props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const onRegisterButtonClick = () => {
        navigate('../new')
    }

    const onLoginButtonClick = () => {
        axios.get(`http://localhost:3001/user/${username}`)
        .then((response) => {
            if (response.data['password'] === password) {
                setLoggedIn(() => (true));
                setLoggedUser(username);
                navigate('../')
            }
            else {
                alert('Invalid Password!')
            }
        })
        .catch((error) => {
            if (error.response.status === 404) {
                alert('Invalid Username! Try again')
            }
        })
        
    }

    return (
        <div>
            <div className = "titlecase">
                This is the Login Page
            </div>
            <div className = "loginFormContainer">
                <div>
                    <label>ID: </label>
                    <input
                        type = "text"
                        className = "idInput"
                        value = {username}
                        onInput = {(e : any) => (setUsername(e.target.value))}
                    />
                </div>
                <br/>
                <div>
                    <label>Password: </label>
                    <input 
                        type = "password"
                        className = "passwordInput"
                        value = {password}
                        onInput = {(e : any) => (setPassword(e.target.value))}
                    />
                    <br/>
                    
                    {showPassword ? (
                        <div>
                            {password}
                        </div>
                    ) : (
                        <div> </div>
                    )}
                    <br/>
                    
                    <label>Show Password</label>
                    <input 
                        type = "checkbox" 
                        className = "passwordCheckbox"
                        checked = {showPassword}
                        onChange={() => (setShowPassword((val) => (!val)))}
                    />
                </div>
                <div className="loginButtonContainer">
                    <button onClick = {onLoginButtonClick} className = "loginButton">
                        Login
                    </button>
                </div>
            </div>
            <div className = "registerButtonContainer">
                <button onClick = {onRegisterButtonClick} className = 'registerButton'>
                    Sign up
                </button>
            </div>
        </div>
    )
}