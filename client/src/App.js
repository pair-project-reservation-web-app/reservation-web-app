import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Axios from "axios";
import Header from "./components/Layout/Hedaer";
import Footer from "./components/Layout/Footer";
import Tables from "./components/Reservation/Tables";
import Modal from "./components/UI/Modal";

import UserResStatus from "./components/Reservation/UserResStatus";
import Review from "./components/Review/Review";
import Reviews from "./components/Review/Reviews";
import Login from "./components/Login/Login";
import Register from "./components/Login/Register";
import NotFound from "./route/NotFound";

import AuthContext from "./store/auth-context";
import "./App.css";

function App() {
  const [loginStatus, setLoginStatus] = useState(false);
  const [userId, setUserId] = useState(null);

  const [modalMessage, setModalMessage] = useState();

  Axios.defaults.withCredentials = true;
  /*
  user register function. passing username, password, contact number and user full name
  to register api from input field and get response from register api
  */
  // const register = () => { };
  /*
  compare input username and password to database, set login status as username if matched
 */
  const userStatusHandler = (status, id) => {
    setLoginStatus(status);
    setUserId(id);
  };

  const displayHandler = (e) => {
    e.preventDefault();
    setModalMessage(null);
  };

  const setModalHandler = (errorMessage) => {
    setModalMessage(errorMessage);
  };

  /*
  checking a user session exist to keep the user logged in when the web page is reloaded
  */
  useEffect(() => {
    Axios.get("https://reservation-mysql.herokuapp.com/").then((response) => {
      if (response.data.loggedIn === true) {
        //console.log(response.data);
        setLoginStatus(response.data.user);
        ////// grab the current login userId for searching reservation by this userId
        setUserId(response.data.userId);
      } else {
        //console.log("no logged in");
      }
    });
  }, [userId, loginStatus]);

  return (
    <div className="App">
      <AuthContext.Provider
        value={{
          isLoggedIn: loginStatus,
          userId,
          userStatusHandler,
          setModalHandler,
        }}
      >
        <Router>
          <Header />
          <main>
            <Routes>
              <Route path="*" element={<NotFound />} />
              <Route
                path="/"
                element={
                  <React.Fragment>
                    <Tables />
                  </React.Fragment>
                }
              />
              <Route path="/my-reservation" element={<UserResStatus />} />
              <Route
                path="/reviews"
                element={
                  <Fragment>
                    {loginStatus && <Review />}
                    <Reviews />
                  </Fragment>
                }
              />
              <Route
                path="/login"
                element={<Login onLogin={userStatusHandler} />}
              />
              <Route path="/register" element={<Register />} />

              {/* need to be re-direction by clicking the button where placed inside of table(showing currently available tables) component*/}
            </Routes>
            {modalMessage && (
              <Modal
                displayHandler={displayHandler}
                message={modalMessage}
              />
            )}
          </main>

          <Footer />
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
