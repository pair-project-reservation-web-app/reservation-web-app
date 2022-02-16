import { Fragment, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";

import Axios from "axios";

const Logout = (props) => {
  const ctx = useContext(AuthContext);
  let navigate = useNavigate();

  const logoutHandler = () => {
    Axios.get("http://localhost:8080/api/user/logout").then(() => {
      ctx.setModalHandler("Logged out");
      navigate("/");
      props.onLogout(false, null);
    });
  };
  return (
    <Fragment>
      <button onClick={logoutHandler}>logout</button>
    </Fragment>
  );
};

export default Logout;
