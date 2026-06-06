import { Outlet } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import Sidebar from "../../components/sidebar";
import { recepcionNavItems } from "./recepcionNavItems";
import styles from "./recepcionDashboard.module.css";

export default function RecepcionLayout() {
  const { user } = useAuth();

  return (
    <div className={styles.layout}>
      <Sidebar items={recepcionNavItems} ariaLabel="Navegación de recepción" />

      <main className={styles.mainContent}>
        <div className={styles.headerTop}>
          <span style={{ marginRight: '16px', fontWeight: '500', color: '#334155', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{width: '20px', height: '20px', color: '#64748b'}}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
            {user?.nombreCompleto || "Ana Torres Mendoza"}
          </span>
        </div>
        
        <Outlet />
      </main>
    </div>
  );
}
