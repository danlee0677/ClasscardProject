import React from "react";
import { useNavigate } from "react-router-dom";
import './Home.css';

export const NotLoginedHome : React.FC = () => {
    const navigate = useNavigate();

    const onButtonClick = () => {
        navigate("./login")
    }

    const onNewUserButtonClick = () => {
        navigate('./new')
    }

    return (
        <div className = "notLoginedHome">
            <div className = "titlecase">
                Welcome!
            </div>
            <div className = "loginRedirectButtonContainer">
                <button className = "loginRedirectButton" onClick = {onButtonClick}>
                    Login
                </button>
            </div>
            <div className = "newUserButtonContainer">
                <button className="newUserButton" onClick = {onNewUserButtonClick}>
                    Sign up
                </button>
            </div>
        </div>
    )
}
