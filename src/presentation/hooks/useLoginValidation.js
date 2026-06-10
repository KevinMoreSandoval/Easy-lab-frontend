const LOGIN_USER_CONFIG = {
  Administración: {
    label: "Correo institucional",
    placeholder: "Ingresa tu correo institucional",
    type: "email",
    validateIdentifier: (identifier) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier) ? "" : "Ingresa un correo válido.",
  },
  Médico: {
    label: "Código de colegiatura",
    placeholder: "Ingresa tu código de colegiatura",
    type: "text",
    validateIdentifier: (identifier) =>
      /^\d{5,6}$/.test(identifier) ? "" : "El código debe tener entre 5 y 6 dígitos.",
  },
  Recepción: {
    label: "Correo institucional",
    placeholder: "Ingresa tu correo institucional",
    type: "email",
    validateIdentifier: (identifier) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier) ? "" : "Ingresa un correo válido.",
  },
};

const validatePassword = (password) => {
  if (password.trim() === "") return "Ingresa tu contraseña.";
  if (password.length < 6) return "La contraseña debe tener al menos 6 caracteres.";

  return "";
};

export const useLoginValidation = () => {
  const validateLoginData = ({ userType, identifier, password }) => {
    const currentConfig = LOGIN_USER_CONFIG[userType];
    const trimmedIdentifier = identifier.trim();

    const identifierError =
      trimmedIdentifier === ""
        ? "Completa este campo."
        : currentConfig.validateIdentifier(trimmedIdentifier);
    const passwordError = validatePassword(password);

    return {
      isValid: identifierError === "" && passwordError === "",
      errors: {
        identifier: identifierError,
        password: passwordError,
      },
    };
  };

  return {
    userTypeConfig: LOGIN_USER_CONFIG,
    validateLoginData,
  };
};
