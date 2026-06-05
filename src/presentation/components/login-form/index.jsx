import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./loginForm.module.css";
import { DSATabSelector, DSATextInput, DSAButton, DSACheckbox } from "..";
import { useLoginValidation } from "../../hooks";
import { useAuth } from "../../../context/AuthContext";
import { apiRequest } from "../../../infrastructure/api/authApi";

/**
 * Mapeo de rol del backend → ruta del dashboard correspondiente.
 * Se usa tras el login exitoso para redirigir al flujo correcto.
 */
const ROLE_ROUTES = {
  PACIENTE: "/paciente/dashboard",
  MEDICO: "/medico/dashboard",
  RECEPCION: "/recepcion/dashboard",
};

const LoginForm = () => {
  const [activeTab, setActiveTab] = useState("Paciente");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [rememberUser, setRememberUser] = useState(false);
  const [errors, setErrors] = useState({ identifier: "", password: "" });
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { userTypeConfig, validateLoginData } = useLoginValidation();
  const { login } = useAuth();
  const navigate = useNavigate();

  const currentIdentifier = userTypeConfig[activeTab];
  const hasLoginData = identifier.trim() !== "" && password.trim() !== "";

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setIdentifier("");
    setPassword("");
    setRememberUser(false);
    setErrors({ identifier: "", password: "" });
    setServerError("");
  };

  const handleIdentifierChange = (event) => {
    setIdentifier(event.target.value);
    setErrors((currentErrors) => ({ ...currentErrors, identifier: "" }));
    setServerError("");
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setErrors((currentErrors) => ({ ...currentErrors, password: "" }));
    setServerError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // 1. Validación local (formato de campos)
    const validation = validateLoginData({
      userType: activeTab,
      identifier,
      password,
    });

    setErrors(validation.errors);

    if (!validation.isValid) return;

    // 2. Enviar credenciales al backend
    setIsSubmitting(true);
    setServerError("");

    try {
      const response = await apiRequest("/auth/login", {
        method: "POST",
        body: JSON.stringify({
          userType: activeTab,
          identifier: identifier.trim(),
          password,
        }),
      });

      // 3. Guardar sesión en el contexto
      login(response.token, {
        rol: response.rol,
        nombreCompleto: response.nombreCompleto,
      });

      // 4. Redirigir al dashboard según el rol
      const targetRoute = ROLE_ROUTES[response.rol] || "/login";
      navigate(targetRoute, { replace: true });
    } catch (err) {
      setServerError(err.error || "Error al iniciar sesión. Intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
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

        {serverError && (
          <p className={styles.serverError}>{serverError}</p>
        )}

        <div className={styles.textContainer}>
          <DSACheckbox
            checked={hasLoginData && rememberUser}
            onChange={(event) => setRememberUser(event.target.checked)}
            disabled={!hasLoginData}
          />
          <p className={styles.span}>Olvidé mi contraseña</p>
        </div>

        <DSAButton
          label={isSubmitting ? "Ingresando..." : "Iniciar sesión"}
          disabled={!hasLoginData || isSubmitting}
          type="submit"
        />
        <p>¿Aún no tienes cuenta? <span className={styles.span}>Regístrate ahora</span> </p>

      </form>
    </>
  );
};

export default LoginForm;
