import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import './LoginPage.css'
import axios from "axios";

interface props {
    setLoggedIn : any,
    setLoggedUser : any
}

export const NewUser : React.FC<props> = (props : props) => {
    const {setLoggedIn, setLoggedUser} = props;

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [idCheck, setIdCheck] = useState(false);
    const [samePassword, setSamePassword] = useState(true);
    const [isValidUsername, setIsValidUsername] = useState(true);
    const navigate = useNavigate();

    const onRegisterButtonClick = () => {
        if (samePassword) {
            axios.post('http://localhost:3001/user', 
                {
                    "username":username,
                    "password":password
                }
            )
            .then((response) => {
                setLoggedIn(() => (true))
                setLoggedUser(username);
                navigate('../')
            })
            .catch((error) => {
                if (error.response.status === 409) {
                    alert("Invalid Username. Try again")
                    navigate('./')
                }
            })
        }
        else {
            alert("Password Different! Try again")
        }
    }

    const onIdCheckButtonClick = () => {
        setIdCheck(true);
        axios.get(`http://localhost:3001/user/${username}`)
        .then((response) => {
            setIsValidUsername(false);
        })
        .catch((error) => {
            if (error.response.status === 404) {
                setIsValidUsername(true);
            }
        })
    }

    const onPasswordChange = (evt : any) => {
        setPassword(evt.target.value);
    }

    const onPasswordCheckChange = (evt : any) => {
        setPasswordCheck(evt.target.value);
    }

    useEffect(() => {
        if (password === passwordCheck) setSamePassword(true);
        else setSamePassword(false);
    })

    return (
        <div>
            <div className = "titlecase">
                Register
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
                    <button onClick = {onIdCheckButtonClick} className = "idCheckButton">
                        check ID
                    </button>
                    <div>
                        {idCheck ? (
                            <div>
                                {(isValidUsername) ? (
                                    <div className="okay">
                                        Valid Username
                                    </div>
                                ) : (
                                    <div className="warning">
                                        Invalid Username!
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div/>
                        )}
                    </div>
                </div>
                <br/>
                <div>
                    <label>Password: </label>
                    <input 
                        type = "password"
                        className = "passwordInput"
                        value = {password}
                        onInput = {onPasswordChange}
                    />
                    <br/>
                    <label>Check: </label>
                    <input
                        type = "password"
                        className = "passwordCheck"
                        value = {passwordCheck}
                        onInput = {onPasswordCheckChange}
                    />
                    <br/>
                    {(samePassword) ? (
                        <div className = "okay">
                            Same Password
                        </div>
                    ) : (
                        <div className = "warning"> Different! </div>
                    )}
                    <br/>
                    {showPassword ? (
                        <div>
                            Password: {password}
                            <br/>
                            Check: {passwordCheck}
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
                <p>
                    <button onClick = {onRegisterButtonClick} className = "loginButton">
                       Create!
                    </button>
                </p>
            </div>
        </div>
    )
}