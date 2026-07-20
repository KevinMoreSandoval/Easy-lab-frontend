import { Outlet } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import Sidebar from "../../components/sidebar";
import { adminNavItems } from "./adminNavItems";
import styles from "./admin.module.css";

export default function AdminLayout() {
  const { user } = useAuth();

  return (
    <div className={styles.layout}>
      <Sidebar items={adminNavItems} ariaLabel="Navegación de administración" />

      <main className={styles.mainContent}>
        <div className={styles.headerTop}>
          <span className={styles.userBadge}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
            {user?.nombreCompleto}
          </span>
        </div>

        <Outlet />
      </main>
    </div>
  );
}
