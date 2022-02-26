import { useContext } from "react";
import { NavLink } from "react-router-dom";
import styles from './NavMobile.module.css'
import AuthContext from "../../store/auth-context";
import Logout from "../Login/Logout";

const NavMobile =() => {
    const ctx = useContext(AuthContext);
    return(
        <nav className={styles['nav-container']}>
      <ul className={`wrapper ${styles['link-container']}`}>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? styles.active : '')}
            to="/"
          >
            <ion-icon name="home"></ion-icon>
            <span>Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/reviews"
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            <ion-icon name="chatbox-ellipses"></ion-icon>
            <span>Review</span>
          </NavLink>
        </li>
        {ctx.isLoggedIn && (
          <li>
            <NavLink
              to="/my-reservation"
              className={({ isActive }) => (isActive ? styles.active : '')}
            >
              <ion-icon name="calendar-clear"></ion-icon>
              <span>Reservation</span>
            </NavLink>
          </li>
        )}
        <li>
          {!ctx.isLoggedIn ? (
            <NavLink
              to="/login"
              className={({ isActive }) => (isActive ? styles.active : '')}
            >
              <ion-icon name="person"></ion-icon>
              <span>Login</span>
            </NavLink>
          ) : (
            <Logout onLogout={ctx.userStatusHandler} />
          )}
        </li>
      </ul>
    </nav >
    )
}

export default NavMobile