import React, { useState } from "react";
import TopBar from "./TopBar";
import Main from "./Main";

import { TOKEN_KEY } from "../constants";
import "../styles/App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem(TOKEN_KEY) ? true : false//通过localstorage来拿token,token is key and token value is value
  );
  //callback function
  //把logout传给topbar，然后topbar需要调用logout来告诉app.js
  //when clicked the logout, have to remove the token and setLoggedIn as false
  const logout = () => {
    console.log("log out");
    localStorage.removeItem(TOKEN_KEY);
    setIsLoggedIn(false);
  };

  const loggedIn = (token) => {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);//记录token
      setIsLoggedIn(true); //if loggedin, setisloggedIn :true
    }
  };

  return (
    <div className="App">
      <TopBar isLoggedIn={isLoggedIn} handleLogout={logout} /> 
      <Main isLoggedIn={isLoggedIn} handleLoggedIn ={loggedIn}/>
    </div>
  );
}
export default App;