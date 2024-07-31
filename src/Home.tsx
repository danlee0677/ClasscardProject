import React from "react";
import { NotLoginedHome } from "./NotLoginedHome";
import { LoginedHome } from "./LoginedHome";

interface Props {
    loggedIn : boolean
    setLoggedIn : any
    loggedUser : string
    setLoggedUser : any
}

const Home : React.FC<Props> = (props : Props) => {
    const {loggedIn, setLoggedIn, loggedUser, setLoggedUser} = props;
    return (
        <div>
            {loggedIn ? (
                <LoginedHome setLoggedIn={setLoggedIn} loggedUser = {loggedUser} setLoggedUser = {setLoggedUser} />
            ) : (
                <NotLoginedHome/>
            )}
        </div>
    )
}

export default Home;