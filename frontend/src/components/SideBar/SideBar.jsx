/**
 * SideBar.jsx
 * - What: Minimal fixed vertical sidebar navigation for SPA.
 * - Why: Provides quick access to main routes.
 * - How: Uses CSS Modules for styling and react-icons for icons.
 */

import React, { useState } from "react";
import styles from "./SideBar.module.css";
import { FaHome, FaUserAlt, FaCog, FaBell } from "react-icons/fa";
import { motion } from "framer-motion";

// Menu items for navigation; add/remove as needed
const menu = [
  { label: "Home", icon: <FaHome /> },
  { label: "Profile", icon: <FaUserAlt /> },
  { label: "Settings", icon: <FaCog /> },
  { label: "Notifications", icon: <FaBell /> },
];

export default function SideBar() {
  // Track the index of the active menu item; default to the first item (Home)
  const [activeIndex, setActiveIndex] = useState(0);

  const handleKeyDown = (event, idx) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setActiveIndex(idx);
    }
  };

  return (
    <nav className={styles.sidebar} aria-label="Main sidebar navigation">
      <ul>
        {menu.map((item, idx) => (
          <motion.li
            key={item.label}
            role="button"
            tabIndex={0}
            className={`${styles.menuItem} ${
              activeIndex === idx ? styles.active : ""
            }`}
            onClick={() => setActiveIndex(idx)}
            onKeyDown={(event) => handleKeyDown(event, idx)}
            whileHover={{ x: 6, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
          >
            {item.icon}
            <span className={styles.linkLabel}>{item.label}</span>
          </motion.li>
        ))}
      </ul>
    </nav>
  );
}
