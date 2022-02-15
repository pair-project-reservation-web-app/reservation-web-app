import { Fragment, useReducer, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import Axios from "axios";
import Input from "../UI/Input/Input";
import Modal from "../UI/Modal";

const loginReducer = (state, action) => {
  if (action.type === "USER_EMAIL") {
    return {
      ...state,
      email: action.value,
      emailIsValid: action.value.includes("@"),
    };
  }

  if (action.type === "USER_PASSWORD") {
    return {
      ...state,
      password: action.value,
      passwordIsValid: action.value.trim().length > 6,
    };
  }

  return {
    email: "",
    password: "",
    emailIsValid: false,
    passwordIsValid: false,
  };
};

const Login = (props) => {
  let navigate = useNavigate();

  const [loginStatus, dispatchLogin] = useReducer(loginReducer, {
    email: "",
    password: "",
    emailIsValid: null,
    passwordIsValid: null,
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [modalDisplay, setModalDisplay] = useState(false);

  const displayHandler = (e) => {
    e.preventDefault();
    setModalDisplay(false);
  };
  const userEmailHandler = (e) => {
    dispatchLogin({ type: "USER_EMAIL", value: e.target.value });
  };

  const userPasswordHandler = (e) => {
    dispatchLogin({ type: "USER_PASSWORD", value: e.target.value });
  };

  const loginHandler = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:8080/api/user/login", {
      username: loginStatus.email,
      password: loginStatus.password,
    }).then((response) => {
      console.log("res", response);
      if (!response.data.status) {
        //invalid

        setErrorMessage(response.data.message);
        setModalDisplay(true);
        /*
        error handler needed here
        add a handler later
        */
      } else {
        //valid
        console.log(response.data.message.userId);
        // props.onLogin(response.data.user, response.data.userId);
        props.onLogin(true, response.data.message.userId);
        navigate("/");
      }
    });
  };

  return (
    <Fragment>
      <form className={styles["login-form"]} onSubmit={loginHandler}>
        <h1>Login</h1>
        <Input
          type="email"
          label="email"
          placeholder="Email"
          onChange={userEmailHandler}
          value={loginStatus.email}
          isValid={loginStatus.emailIsValid}
        />
        <Input
          type="password"
          label="password"
          placeholder="Password"
          onChange={userPasswordHandler}
          value={loginStatus.password}
          isValid={loginStatus.passwordIsValid}
        />

        <button type="submit"> Login </button>
        <Link to="/register">Register</Link>
      </form>
      <Modal
        display={modalDisplay}
        displayHandler={displayHandler}
        message={errorMessage}
      />
    </Fragment>
  );
};

export default Login;

// const Login = (props) => {
//   const username = useRef();
//   const password = useRef();

//   const loginHandler = (e) => {
//     e.preventDefault();
//     Axios.post("http://localhost:8080/api/user/login", {
//       username: username.current.value,
//       password: password.current.value,
//     }).then((response) => {
//       console.log(response);
//       if (response.data.message) {
//         //invalid
//         console.log(response.data.message);
//         /*
//         error handler needed here
//         add a handler later
//         */
//       } else {
//         //valid
//         props.onLogin(response.data.user, response.data.userId);
//       }
//     });
//   };

//   return (
//     <Fragment>
//       <form className={styles['login-form']} onSubmit={loginHandler}>
//         <h1>Login</h1>
//         <input type="email" placeholder="Username..." ref={username} />
//         <input type="password" placeholder="Password..." ref={password} />
//         <button type="submit"> Login </button>
//       </form>
//     </Fragment>
//   )
// }

// export default Login;
