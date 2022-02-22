import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logout from "../Login/Logout";
import AuthContext from "../../store/auth-context";
import styles from "./Nav.module.css";
const Nav = () => {
  const ctx = useContext(AuthContext);
  let navigate = useNavigate();
  const [current, setCurrent] = useState("Home");

  useEffect(() => {
    if (window.location.href === "http://localhost:3000/") {
      setCurrent("Home");
    } else if (window.location.href === "http://localhost:3000/reviews") {
      setCurrent("Review");
    } else if (
      window.location.href === "http://localhost:3000/my-reservation"
    ) {
      setCurrent("Reservation");
    } else if (window.location.href === "http://localhost:3000/login") {
      setCurrent("Login");
    } else {
      setCurrent("Home");
    }
  }, [window.location.href]);

  return (
    <nav>
      <ul>
        <li>
          <Link
            className={styles[`${current === "Home" ? "active" : ""}`]}
            to="/"
          >
            <ion-icon name="home"></ion-icon>
            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link
            className={styles[`${current === "Review" ? "active" : ""}`]}
            to="/reviews"
          >
            <ion-icon name="chatbox-ellipses"></ion-icon>
            <span>Review</span>
          </Link>
        </li>
        {ctx.isLoggedIn && (
          <li>
            <Link
              className={styles[`${current === "Reservation" ? "active" : ""}`]}
              to="/my-reservation"
            >
              <ion-icon name="calendar-clear"></ion-icon>
              <span>Reservation</span>
            </Link>
          </li>
        )}
        <li>
          {/* <Link to="/login" >Login</Link> */}
          {!ctx.isLoggedIn ? (
            <Link
              className={styles[`${current === "Login" ? "active" : ""}`]}
              to="/login"
            >
              <ion-icon name="person"></ion-icon>
              <span>Login</span>
            </Link>
          ) : (
            <div
              onClick={() => {
                setCurrent("Home");
                navigate("/");
              }}
            >
              <Logout onLogout={ctx.userStatusHandler} />
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
