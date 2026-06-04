import styles from "./button.module.css";

const Button = ({ label, onClick, disabled, type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${styles.button} ${disabled ? styles.disabled : ""}`}
    >
      {label}
    </button>
  );
};

export default Button;
