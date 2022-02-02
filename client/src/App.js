import { useEffect, useState } from 'react';
import Tables from './components/reservation/Tables';
import Axios from 'axios';
import "./App.css";


function App() {
  const [usernameReg, setUsernameReg] = useState("");
  const [userpasswordReg, setUserpasswordReg] = useState("");
  const [usercontactReg, setUsercontactReg] = useState("");
  const [userfullnameReg, setUserfullnameReg] = useState("");

  const [username, setUsername] = useState("");
  const [userpassword, setUserpassword] = useState("");

  const [loginStatus, setLoginStatus] = useState("");

  Axios.defaults.withCredentials = true;
  /*
  user register function. passing username, password, contact number and user full name
  to register api from input field and get response from register api
   */
  const register = () => {
    Axios.post("http://localhost:8080/api/user/register", {
      username: usernameReg,
      password: userpasswordReg,
      contact: usercontactReg,
      fullname: userfullnameReg,
    }).then((response) => {
      console.log(response.data.sqlMessage);
    });
  };
  /*
  compare input username and password to database, set login status as username if matched
  */
  const login = () => {
    Axios.post("http://localhost:8080/api/user/login", {
      username: username,
      password: userpassword,
    }).then((response) => {
      if (response.data.message) {
        setLoginStatus(response.data.message);
      } else {
        setLoginStatus(response.data);
      }
    });
  };
  /*
  user logout, delete user session
  */
  const logout = () => {
    Axios.get("http://localhost:8080/api/user/logout").then((response) => {
      window.location.reload();
    });
  };

  /*
  checking a user session exist to keep the user logged in when the web page is reloaded
  */
  useEffect(() => {
    Axios.get("http://localhost:8080/").then((response) => {
      if (response.data.loggedIn === true) {
        setLoginStatus(response.data.user);
        console.log(response.data.user);
      } else {
        console.log("no logged in");
      }
    });
  }, []);

  return (
    <div className="App">
      <div className="registration">
        <h1>Registration</h1>
        <label>Username</label>
        <input
          type="text"
          onChange={(e) => {
            setUsernameReg(e.target.value);
          }}
        />
        <label>Password</label>
        <input
          type="password"
          onChange={(e) => {
            setUserpasswordReg(e.target.value);
          }}
        />
        <label>Contact number</label>
        <input
          type="number"
          onChange={(e) => {
            setUsercontactReg(e.target.value);
          }}
        />
        <label>Full name</label>
        <input
          type="text"
          onChange={(e) => {
            setUserfullnameReg(e.target.value);
          }}
        />
        <button onClick={register}> Register </button>
      </div>

      <div className="login">
        <h1>Login</h1>
        <input
          type="text"
          placeholder="Username..."
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password..."
          onChange={(e) => {
            setUserpassword(e.target.value);
          }}
        />

        <button onClick={login}> Login </button>
        <button onClick={logout}> Logout </button>
      </div>

      <h1>{loginStatus}</h1>

      <Tables />
    </div>
  );
}

export default App;
