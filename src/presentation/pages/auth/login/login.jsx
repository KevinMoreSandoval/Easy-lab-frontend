import styles from "./login.module.css"
import { DSANavbarAuth,DSALoginForm } from "../../../components";

const LoginPage = () => {
  return (
    <>
    <DSANavbarAuth/>
    <section className={styles.container}>
      <DSALoginForm/>
    </section>

    </>
  );
};

export default LoginPage;
