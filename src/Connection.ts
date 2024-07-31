import React from "react";
import axios from "axios";

interface postInterface {
    username : string
    password : string
}

interface getInterface {
    username : string
}

export const Post : Function = ({username, password} : postInterface) => {
    // const formData = new FormData();
    // formData.append("username", username);
    // formData.append("password", password);

    axios.post('http://localhost:3001/user',
        {
            "username" : username,
            "password" : password
        }
    ).then((response) => {console.log(response)})
    .catch((error) => (console.log(error)))
}

// export const Get : Function = ({username} : getInterface) => {

//     axios ({
//         url: `http://localhost:3001/user/${username}`,
//         method : "POST",
//         data: {

//         }
//     })
// }