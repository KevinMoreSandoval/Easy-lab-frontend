import { useState } from "react";
import styles from "./tabSelector.module.css";
 
const tabs = ["Paciente", "Médico", "Recepción"];
 
const TabSelector= ({ defaultTab = "Paciente", onChange })=> {
  const [activeTab, setActiveTab] = useState(defaultTab);
 
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (onChange) onChange(tab);
  };
 
  return (
    <div className={styles.tabContainer} role="tablist" aria-label="Tipo de usuario">
      {tabs.map((tab) => (
        <button
          key={tab}
          type="button"
          role="tab"
          aria-selected={activeTab === tab}
          className={`${styles.tab} ${activeTab === tab ? styles.active : ""}`}
          onClick={() => handleTabClick(tab)}
        >
          {tab}
          {activeTab === tab && <span className={styles.indicator} aria-hidden="true" />}
        </button>
      ))}
    </div>
  );
}

export default TabSelector
 
