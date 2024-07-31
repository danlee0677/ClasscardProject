import React from "react";
import { useNavigate } from "react-router-dom";

interface props {
    loggedIn : boolean
}

export const Create : React.FC<props> = (props : props) => {
    const {loggedIn} = props;
    const navigate = useNavigate();
    return (
        <div>
            {loggedIn ? (
                <div className="titlecase">
                    This is the Creation Page
                </div>
            ) : (
                <div>
                    <div className = "titlecase">
                        Please log in before creation
                    </div>
                    <div className = "loginRedirectButtonContainer">
                        <button className = "loginRedirectButton" onClick = {() => (navigate('../login'))}>
                            Login
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}