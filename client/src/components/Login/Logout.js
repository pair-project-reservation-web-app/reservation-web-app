import { Fragment } from "react";
import { useNavigate } from 'react-router-dom'

import Axios from "axios";

const Logout = (props) => {
  let navigate = useNavigate();

  const logoutHandler = () => {
    Axios.get("http://localhost:8080/api/user/logout").then(() => {
      navigate('/')
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
