import Nav from './Nav'
import styles from './Header.module.css';
const Header = () => {
    return (
        <header className={`wrapper ${styles['header-container']}`}>
            {/* home icon */}
            <div className={styles.logo}>
                Logo
            </div>
            <Nav />
        </header>
    )
};

export default Header;