import { useState, useRef, Fragment } from "react";
import Axios from "axios";

const Login = (props) => {
  const username = useRef();
  const password = useRef();

  const loginHandler = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:8080/api/user/login", {
      username: username.current.value,
      password: password.current.value,
    }).then((response) => {
      console.log(response);
      if (response.data.message) {
        //invalid
        /*
        error handler needed here
        add a handler later
        */
      } else {
        //valid
        props.onLogin(response.data.user, response.data.userId);
      }
    });
  };

  return (
    <Fragment>
      <form className="login" onSubmit={loginHandler}>
        <h1>Login</h1>
        <input type="text" placeholder="Username..." ref={username} />
        <input type="password" placeholder="Password..." ref={password} />
        <button type="submit"> Login </button>
      </form>
    </Fragment>
  );
};

export default Login;
