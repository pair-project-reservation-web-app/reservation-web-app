import Nav from './Nav'
import styles from './Header.module.css';
const Header = (props) => {
    return (
        <header className={`wrapper ${styles['header-container']}`}>
            {/* home icon */}
            <div className={styles.logo}>
                Logo
            </div>
            <Nav onLogout={props.onLogout} />
        </header>
    )
};

export default Header;