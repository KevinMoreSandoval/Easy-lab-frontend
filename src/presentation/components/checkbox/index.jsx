import styles from "./checkbox.module.css";

const Checkbox = ({ label = "Recordar usuario y contraseña", checked, onChange, id = "checkbox", disabled = false }) => {
  return (
    <label htmlFor={id} className={`${styles.wrapper} ${disabled ? styles.disabled : ""}`}>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className={styles.hiddenInput}
      />
      <span className={`${styles.box} ${checked ? styles.checked : ""}`}>
        {checked && (
          <svg viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.checkIcon}>
            <path d="M1 5L4.5 8.5L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
};

export default Checkbox;