import styles from "./navbarAuth.module.css"
const NavbarAuth = ()=>{
    return (

        <header className={styles.container}>
        <nav className={styles.nav}>
            <img src="assets/img/logo.png" alt=""  className={styles.logo}/>
        </nav>
    </header>
    );

}
export default NavbarAuth ;