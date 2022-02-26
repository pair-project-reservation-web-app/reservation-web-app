import { useContext } from "react";
import { NavLink } from "react-router-dom";
import styles from './NavDT.module.css'
import AuthContext from "../../store/auth-context";
import Logout from "../Login/Logout";
import mainIcon from '../../img/Logo-white.png'

const NavDT = () => {
    const ctx = useContext(AuthContext);
    
    return( 
    <div className={styles['container']}>
        <NavLink to="/">
            <img src={mainIcon} alt="main-icon"/>
            
          </NavLink>
        <nav className={styles['nav-container']}>
            <ul className={!ctx.isLoggedIn && (`${styles['logged-out']}`)}>
                    {ctx.isLoggedIn && (
                    <li>
                        <NavLink
                        to="/my-reservation"
                        className={({ isActive }) => (isActive ? styles.active : '')}
                        >
                        <span>Reservation</span>
                        </NavLink>
                    </li>
                    )}
                <li>
                <NavLink
                    to="/reviews"
                    className={({ isActive }) => (isActive ? styles.active : '')}
                >
                    
                    <span>Review</span>
                </NavLink>
                </li>
                <li>
                {!ctx.isLoggedIn ? (
                    <NavLink
                    to="/login"
                    className={({ isActive }) => (isActive ? styles.active : '')}
                    >
                    
                    <span>Login</span>
                    </NavLink>
                ) : (
                    <Logout onLogout={ctx.userStatusHandler} />
                )}
                </li>
            </ul>
        </nav>
    </div>)
}

export default NavDT