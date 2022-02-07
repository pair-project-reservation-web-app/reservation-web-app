import { useEffect, useState } from "react";
import Tables from "./components/Reservation/Tables";
import Axios from "axios";
import "./App.css";
import Reservation from "./components/Reservation/Reservation";
import UserResStatus from "./components/Reservation/UserResStatus";
import Review from "./components/Review/Review";
import Reviews from "./components/Review/Reviews";
import Login from "./components/Login/Login";
import Register from "./components/Login/Register";
import Logout from "./components/Login/Logout";

function App() {
  const [loginStatus, setLoginStatus] = useState("");
  const [userId, setUserId] = useState(null);

  Axios.defaults.withCredentials = true;
  /*
  user register function. passing username, password, contact number and user full name
  to register api from input field and get response from register api
   */
  const register = () => {};
  /*
  compare input username and password to database, set login status as username if matched
  */
  const userStatus = (status, id) => {
    setLoginStatus(status);
    setUserId(id);
  };
  /*
  user logout, delete user session
  */

  /*
  checking a user session exist to keep the user logged in when the web page is reloaded
  */
  useEffect(() => {
    Axios.get("http://localhost:8080/").then((response) => {
      if (response.data.loggedIn === true) {
        console.log(response.data);
        setLoginStatus(response.data.user);
        ////// grab the current login userId for searching reservation by this userId
        setUserId(response.data.userId);
      } else {
        console.log("no logged in");
      }
    });
  }, [userId, loginStatus]);

  return (
    <div className="App">
      <Register />
      <Login onLogin={userStatus} />
      <Logout onLogout={userStatus} />
      <h1>
        NAME: {loginStatus.length > 0 ? loginStatus : "Please Log in"}{" "}
        {userId ? `ID: ${userId}` : " "}
      </h1>
      <Tables />
      <Reservation />
      <Review />
      <Reviews userId={userId} />
      <UserResStatus userId={userId} />
    </div>
  );
}

export default App;
