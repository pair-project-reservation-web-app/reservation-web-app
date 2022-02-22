import Nav from "./Nav";
import Logo from "../../img/Logo-white.png";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header className={`wrapper ${styles["header-container"]}`}>
      {/* <div className={styles.logo}>Logo</div> */}
      <Link to="/">
        <img className={styles.logo} src={Logo} alt="web-logo" />
      </Link>

      <Nav />
    </header>
  );
};

export default Header;
