import { useReducer, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import Axios from "axios";
import Input from "../UI/Input/Input";
import AuthContext from "../../store/auth-context";

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
  const ctx = useContext(AuthContext);

  const [loginStatus, dispatchLogin] = useReducer(loginReducer, {
    email: "",
    password: "",
    emailIsValid: null,
    passwordIsValid: null,
  });


  const userEmailHandler = (e) => {
    dispatchLogin({ type: "USER_EMAIL", value: e.target.value });
  };

  const userPasswordHandler = (e) => {
    dispatchLogin({ type: "USER_PASSWORD", value: e.target.value });
  };

  const loginHandler = (e) => {
    e.preventDefault();
    Axios.post("https://reservation-mysql.herokuapp.com/api/user/login", {
      username: loginStatus.email,
      password: loginStatus.password,
    }).then((response) => {
      if (!response.data.status) {
        //invalid
        ctx.setModalHandler(response.data.message);
        /*
        error handler needed here
        add a handler later
        */
      } else {
        //valid
        // props.onLogin(response.data.user, response.data.userId);
        props.onLogin(response.data.status, response.data.message.userId);
        navigate("/");
      }
    });
  };

  // const loginHandler = (e) => {
  //   e.preventDefault();
  //   Axios.post("https://reservation-mysql.herokuapp.com/api/user/login", {
  //     username: loginStatus.email,
  //     password: loginStatus.password,
  //   }).then((response) => {
  //     if (!response.data.status) {
  //       //invalid        console.log('in f', response.data)
  //       ctx.setModalHandler(response.data.message);

  //     } else {

  //       props.onLogin(true, response.data.message.userId);
  //       navigate("/");
  //     }
  //   });
  // };

  return (
    <section className={styles['login-page']}>
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
    </section>
  );
};

export default Login;
