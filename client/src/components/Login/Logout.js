import { Fragment, useContext } from "react";
import styles from "./Logout.module.css";
import AuthContext from "../../store/auth-context";

import Axios from "axios";

const Logout = (props) => {
  const ctx = useContext(AuthContext);

  const logoutHandler = () => {
    Axios.get("http://localhost:8080/api/user/logout").then(() => {
      ctx.setModalHandler("Logged out");
      props.onLogout(false, null);
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
