import { useState } from "react";
import styles from "./loginForm.module.css";
import { DSATabSelector, DSATextInput, DSAButton, DSACheckbox } from "..";

const LoginForm = () => {
  const [activeTab, setActiveTab] = useState("Paciente");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [rememberUser, setRememberUser] = useState(false);

  const identifierConfig = {
    Paciente: {
      label: "Documento de identidad",
      placeholder: "Ingresa tu documento de identidad",
      type: "text",
    },
    Médico: {
      label: "Código de colegiatura",
      placeholder: "Ingresa tu código de colegiatura",
      type: "text",
    },
    Recepción: {
      label: "Correo institucional",
      placeholder: "Ingresa tu correo institucional",
      type: "email",
    },
  };
  const currentIdentifier = identifierConfig[activeTab];
  const hasLoginData = identifier.trim() !== "" && password.trim() !== "";

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setIdentifier("");
    setPassword("");
    setRememberUser(false);
  };

  return (
    <>
      <div className={styles.container}>
        <h3 className={styles.title}>¡Inicia sesión en EASYLAB!</h3>
        <DSATabSelector onChange={handleTabChange} />
        <DSATextInput
          label={currentIdentifier.label}
          required={true}
          placeholder={currentIdentifier.placeholder}
          type={currentIdentifier.type}
          value={identifier}
          onChange={(event) => setIdentifier(event.target.value)}
        />
        <DSATextInput
          label={"Contraseña"}
          required={true}
          placeholder={"Ingresa tu contraseña"}
          type={"password"}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <div className={styles.textContainer}>
          <DSACheckbox
            checked={hasLoginData && rememberUser}
            onChange={(event) => setRememberUser(event.target.checked)}
            disabled={!hasLoginData}
          />
          <p className={styles.span}>Olvidé mi contraseña</p>
        </div>

        <DSAButton label={"Iniciar sesión"} disabled={!hasLoginData} />
        <p>¿Aún no tienes cuenta? <span className={styles.span}>Regístrate ahora</span> </p>

      </div>
    </>
  );
};

export default LoginForm;
