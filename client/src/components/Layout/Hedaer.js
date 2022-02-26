import Nav from "./Nav";
import Logo from "../../img/Logo-white.png";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header className={`wrapper ${styles["header-container"]}`}>
            <Nav />
    </header>
  );
};

export default Header;
