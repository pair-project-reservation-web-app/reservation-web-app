import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Logout from '../Login/Logout';
import AuthContext from '../../store/auth-context';
import styles from './Nav.module.css';
const Nav = () => {

    const ctx = useContext(AuthContext);

    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    {/* <Link to="/login" >Login</Link> */}
                    {!ctx.isLoggedIn ? <Link to="/login">Login</Link> : <Logout onLogout={ctx.userStatusHandler} />}
                </li>
            </ul>
        </nav>
    )
};


export default Nav;