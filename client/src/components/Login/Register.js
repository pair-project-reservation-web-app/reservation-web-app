import { useState, useRef, Fragment } from "react";
import Axios from "axios";

const Register = () => {
  const usernameReg = useRef();
  const passwordReg = useRef();
  const contactReg = useRef();
  const userFullnameReg = useRef();

  const registerHandler = (e) => {
    e.preventDefault();
    const username = usernameReg.current.value;
    const password = passwordReg.current.value;
    const contact = contactReg.current.value;
    const fullname = userFullnameReg.current.value;

    Axios.post("http://localhost:8080/api/user/register", {
      username: username,
      password: password,
      contact: contact,
      fullname: fullname,
    }).then((response) => {
      console.log(response.data.sqlMessage);
    });
  };

  return (
    <Fragment>
      <form className="registration" onSubmit={registerHandler}>
        <h1>Registration</h1>
        <label>Username</label>
        <input type="text" ref={usernameReg} />
        <label>Password</label>
        <input type="password" ref={passwordReg} />
        <label>Contact number</label>
        <input type="number" ref={contactReg} />
        <label>Full name</label>
        <input type="text" ref={userFullnameReg} />
        <button type="submit"> Register </button>
      </form>
    </Fragment>
  );
};

export default Register;
