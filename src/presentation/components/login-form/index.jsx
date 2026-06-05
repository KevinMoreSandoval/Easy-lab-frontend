import { useState } from "react";
import styles from "./loginForm.module.css";
import { DSATabSelector, DSATextInput, DSAButton, DSACheckbox } from "..";
import { useLoginValidation } from "../../hooks";

const LoginForm = () => {
  const [activeTab, setActiveTab] = useState("Paciente");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [rememberUser, setRememberUser] = useState(false);
  const [errors, setErrors] = useState({ identifier: "", password: "" });
  const { userTypeConfig, validateLoginData } = useLoginValidation();

  const currentIdentifier = userTypeConfig[activeTab];
  const hasLoginData = identifier.trim() !== "" && password.trim() !== "";

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setIdentifier("");
    setPassword("");
    setRememberUser(false);
    setErrors({ identifier: "", password: "" });
  };

  const handleIdentifierChange = (event) => {
    setIdentifier(event.target.value);
    setErrors((currentErrors) => ({ ...currentErrors, identifier: "" }));
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setErrors((currentErrors) => ({ ...currentErrors, password: "" }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validation = validateLoginData({
      userType: activeTab,
      identifier,
      password,
    });

    setErrors(validation.errors);

    if (!validation.isValid) return;

    // Aquí se conectará el servicio de autenticación cuando esté disponible.
  };

  return (
    <>
      <form className={styles.container} onSubmit={handleSubmit} noValidate>
        <h3 className={styles.title}>¡Inicia sesión en EASYLAB!</h3>
        <DSATabSelector onChange={handleTabChange} />
        <DSATextInput
          label={currentIdentifier.label}
          required={true}
          placeholder={currentIdentifier.placeholder}
          type={currentIdentifier.type}
          value={identifier}
          onChange={handleIdentifierChange}
          error={errors.identifier}
        />
        <DSATextInput
          label={"Contraseña"}
          required={true}
          placeholder={"Ingresa tu contraseña"}
          type={"password"}
          value={password}
          onChange={handlePasswordChange}
          error={errors.password}
        />
        <div className={styles.textContainer}>
          <DSACheckbox
            checked={hasLoginData && rememberUser}
            onChange={(event) => setRememberUser(event.target.checked)}
            disabled={!hasLoginData}
          />
          <p className={styles.span}>Olvidé mi contraseña</p>
        </div>

        <DSAButton label={"Iniciar sesión"} disabled={!hasLoginData} type="submit" />
        <p>¿Aún no tienes cuenta? <span className={styles.span}>Regístrate ahora</span> </p>

      </form>
    </>
  );
};

export default LoginForm;
