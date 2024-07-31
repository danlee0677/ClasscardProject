import React, {useState} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Home';
import { Login } from './LoginPage';
import { Create } from './CreateSet';
import { NewUser } from './NewUser';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedUser, setLoggedUser] = useState('');

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path = "/"
          element = {<Home loggedIn = {loggedIn} setLoggedIn={setLoggedIn} loggedUser = {loggedUser} setLoggedUser = {setLoggedUser}/>}
        >
        </Route>
        <Route path = "/login" element = {<Login setLoggedIn = {setLoggedIn} setLoggedUser={setLoggedUser}/>}>
        </Route>
        <Route
          path = "/create"
          element = {<Create loggedIn = {loggedIn}/>}
        >
        </Route>
        <Route
          path = "/new"
          element = {<NewUser setLoggedIn = {setLoggedIn} setLoggedUser = {setLoggedUser}/>}
        >
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;