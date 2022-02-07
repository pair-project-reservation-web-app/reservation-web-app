import { Fragment } from "react";
import Axios from "axios";

const Logout = (props) => {
  const logoutHandler = () => {
    Axios.get("http://localhost:8080/api/user/logout").then(() => {
      props.onLogout("", null);
    });
  };
  return (
    <Fragment>
      <button onClick={logoutHandler}>logout</button>
    </Fragment>
  );
};

export default Logout;
