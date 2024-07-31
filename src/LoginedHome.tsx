import React from "react";
import { useNavigate } from "react-router-dom";

interface props {
    setLoggedIn : any
    loggedUser : string
    setLoggedUser : any
}

export const LoginedHome : React.FC<props> = (props : props) => {
    const {setLoggedIn, loggedUser, setLoggedUser} = props;
    const navigate = useNavigate();
    const onCreateButtonClick = () => {
        navigate('./create')
    }

    const onLogoutButtonClick = () => {
        setLoggedUser('')
        setLoggedIn(() => (false))
    }

    return (
        <div>
            <div className = "titlecase">
                Welcome, {loggedUser}!
            </div>
            <div className = "createButtonContainer">
                <button className = "createButton" onClick = {onCreateButtonClick}>
                    Create
                </button>
            </div>
            <div className="logoutButtonContainer">
                <button className = "logoutButton" onClick = {onLogoutButtonClick}>
                    Logout
                </button>
            </div>
        </div>
    )
}