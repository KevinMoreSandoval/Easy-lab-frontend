import { NavLink, useNavigate } from "react-router-dom";
import styles from "./sidebar.module.css";
import { useAuth } from "../../../context/AuthContext";

export default function Sidebar({
  items = [],
  ariaLabel = "Navegación principal",
}) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoContainer}>
        <img
          src="/assets/img/logo.png"
          alt="EasyLab Logo"
          className={styles.logo}
        />
      </div>

      <nav className={styles.nav} aria-label={ariaLabel}>
        {items.map(({ to, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            end
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.navItemActive : ""}`
            }
          >
            <Icon />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className={styles.logoutSection}>
        <button
          type="button"
          className={styles.logoutBtn}
          onClick={handleLogout}
        >
          <svg
            aria-hidden="true"
            className={styles.logoutIcon}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.8}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h11.25"
            />
          </svg>
          <span>Cerrar sesión</span>
        </button>
      </div>
    </aside>
  );
}
