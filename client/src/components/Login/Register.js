import { useState, useRef, Fragment, useReducer, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import Input from "../UI/Input/Input";

const registerReducer = (state, action) => {
  if (action.type === "username") {
    return {
      ...state,
      username: action.value,
      usernameValid: action.value.includes("@"),
    };
  }
  if (action.type === "password") {
    return {
      ...state,
      password: action.value,
      passwordValid: action.value.trim().length > 6,
    };
  }
  if (action.type === "confirmPassword") {
    return {
      ...state,
      password2: action.value,
      password2Valid: action.value === state.password,
    };
  }
  if (action.type === "contact") {
    return {
      ...state,
      contact: action.value,
      contactValid: action.value.trim().length > 9,
    };
  }
  if (action.type === "fullname") {
    return {
      ...state,
      fullname: action.value,
      fullnameValid: action.value.trim().length > 2,
    };
  }

  return {
    username: "",
    password: "",
    password2: "",
    contact: "",
    fullname: "",
    usernameValid: null,
    passwordValid: null,
    password2Valid: null,
    contactValid: null,
    fullnameValid: null,
  };
};

const Register = () => {
  let navigate = useNavigate();

  const [registerStatus, dispatchRegister] = useReducer(registerReducer, {
    username: "",
    password: "",
    password2: "",
    contact: "",
    fullname: "",
    usernameValid: null,
    passwordValid: null,
    password2Valid: null,
    contactValid: null,
    fullnameValid: null,
  });

  const usernameHandler = (e) => {
    dispatchRegister({ type: "username", value: e.target.value });
  };
  const passwordHandler = (e) => {
    dispatchRegister({ type: "password", value: e.target.value });
  };
  const confirmPasswordHandler = (e) => {
    dispatchRegister({ type: "confirmPassword", value: e.target.value });
  };
  const contactHandler = (e) => {
    dispatchRegister({
      type: "contact",
      value: e.target.value.replace(/\D/g, ""),
    });
  };
  const fullnameHandler = (e) => {
    dispatchRegister({
      type: "fullname",
      value: e.target.value.replace(/[^a-zA-Z ]/gi, ""),
    });
  };
  // const usernameReg = useRef();
  // const passwordReg = useRef();
  // const contactReg = useRef();
  // const userFullnameReg = useRef();

  const registerHandler = (e) => {
    e.preventDefault();
    if (
      registerStatus.usernameValid &&
      registerStatus.passwordValid &&
      registerStatus.password2Valid &&
      registerStatus.contactValid &&
      registerStatus.fullnameValid
    ) {
      Axios.post("http://localhost:8080/api/user/register", {
        username: registerStatus.username,
        password: registerStatus.password,
        contact: registerStatus.contact,
        fullname: registerStatus.fullname,
      }).then((response) => {
        console.log(response.data.sqlMessage);
        navigate("/login");
      });
    } else {
      console.log("INPUT VALUES INVALID");
    }
    // const username = usernameReg.current.value;
    // const password = passwordReg.current.value;
    // const contact = contactReg.current.value;
    // const fullname = userFullnameReg.current.value;
  };

  return (
    <Fragment>
      <form className="registration" onSubmit={registerHandler}>
        <h1>Registration</h1>
        <Input
          type="email"
          label="User"
          placeholder="Email address"
          value={registerStatus.username}
          onChange={usernameHandler}
          isValid={registerStatus.usernameValid}
        />
        <Input
          type="password"
          label="password"
          placeholder="password"
          value={registerStatus.password}
          onChange={passwordHandler}
          isValid={registerStatus.passwordValid}
        />
        <Input
          type="password"
          label="Confirm password"
          placeholder="Confirm password"
          value={registerStatus.password2}
          onChange={confirmPasswordHandler}
          isValid={registerStatus.password2Valid}
        />
        <Input
          type="text"
          label="Contact number"
          placeholder="Contact number"
          value={registerStatus.contact}
          onChange={contactHandler}
          isValid={registerStatus.contactValid}
          maxLength="11"
        />
        <Input
          type="text"
          label="Full name"
          placeholder="Full name"
          value={registerStatus.fullname}
          onChange={fullnameHandler}
          isValid={registerStatus.fullnameValid}
        />
        {/* <label>Username</label>
        <input type="text" ref={usernameReg} />
        <label>Password</label>
        <input type="password" ref={passwordReg} />
        <label>Contact number</label>
        <input type="number" ref={contactReg} />
        <label>Full name</label>
        <input type="text" ref={userFullnameReg} /> */}
        <button type="submit"> Register </button>
      </form>
    </Fragment>
  );
};

export default Register;
