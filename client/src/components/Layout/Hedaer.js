import Nav from "./Nav";
import styles from "./Header.module.css";
const Header = () => {
  return (
    <header className={`wrapper ${styles["header-container"]}`}>
      <Nav />
    </header>
  );
};

export default Header;
