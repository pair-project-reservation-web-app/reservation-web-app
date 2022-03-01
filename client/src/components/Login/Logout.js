import { Fragment, useContext } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../../store/auth-context";

import Axios from "axios";
import styles from "./Logout.module.css";

const Logout = (props) => {
  const ctx = useContext(AuthContext);
  let navigate = useNavigate();


  const logoutHandler = () => {
    Axios.get("https://reservation-mysql.herokuapp.com/api/user/logout").then(() => {
      ctx.setModalHandler("Logged out");
      props.onLogout(false, null);
      navigate('/');
    });
  };
  return (
    <Fragment>
      <button className={styles.btn} onClick={logoutHandler}>
        <ion-icon name="person"></ion-icon>
        <span>Logout</span>
      </button>
    </Fragment>
  );
};

export default Logout;
