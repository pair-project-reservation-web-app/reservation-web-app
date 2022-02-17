import {
  useState,
  useContext,
  Fragment,
  useReducer,
  useEffect,
  createContext,
} from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import Input from "../UI/Input/Input";
import AuthContext from "../../store/auth-context";

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
  const ctx = useContext(AuthContext);

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
  const [buttonDisable, setButtonDisable] = useState(false);

  useEffect(() => {
    if (
      registerStatus.usernameValid &&
      registerStatus.passwordValid &&
      registerStatus.password2Valid &&
      registerStatus.contactValid &&
      registerStatus.fullnameValid
    ) {
      setButtonDisable(true);
    }
  }, [registerStatus]);

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

    Axios.post("http://localhost:8080/api/user/register", {
      username: registerStatus.username,
      password: registerStatus.password,
      contact: registerStatus.contact,
      fullname: registerStatus.fullname,
    }).then((response) => {
      if (!response.data.status) {
        ctx.setModalHandler(response.data.message);
      } else {
        ctx.setModalHandler(response.data.message);
        navigate("/login");
      }
    });
  };
  // const username = usernameReg.current.value;
  // const password = passwordReg.current.value;
  // const contact = contactReg.current.value;
  // const fullname = userFullnameReg.current.value;

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
        {registerStatus.usernameValid === false && (
          <p className="warning">Please enter an Email address</p>
        )}
        <Input
          type="password"
          label="password"
          placeholder="password"
          value={registerStatus.password}
          onChange={passwordHandler}
          isValid={registerStatus.passwordValid}
        />
        {registerStatus.passwordValid === false && (
          <p className="warning">A password length must be over 6characters</p>
        )}
        <Input
          type="password"
          label="Confirm password"
          placeholder="Confirm password"
          value={registerStatus.password2}
          onChange={confirmPasswordHandler}
          isValid={registerStatus.password2Valid}
        />
        {registerStatus.password2Valid === false && (
          <p className="warning">A confirm-password doesn't match</p>
        )}
        <Input
          type="text"
          label="Contact number"
          placeholder="Contact number"
          value={registerStatus.contact}
          onChange={contactHandler}
          isValid={registerStatus.contactValid}
          maxLength="11"
        />
        {registerStatus.contactValid === false && (
          <p className="warning">A contact number must be over 10 digits</p>
        )}
        <Input
          type="text"
          label="Full name"
          placeholder="Full name"
          value={registerStatus.fullname}
          onChange={fullnameHandler}
          isValid={registerStatus.fullnameValid}
        />
        {registerStatus.fullnameValid === false && (
          <p className="warning">Full name must be over two letters</p>
        )}
        {/* <label>Username</label>
        <input type="text" ref={usernameReg} />
        <label>Password</label>
        <input type="password" ref={passwordReg} />
        <label>Contact number</label>
        <input type="number" ref={contactReg} />
        <label>Full name</label>
        <input type="text" ref={userFullnameReg} /> */}
        <button type="submit" disabled={!buttonDisable}>
          {" "}
          Register{" "}
        </button>
      </form>
    </Fragment>
  );
};

export default Register;
