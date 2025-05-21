/**
 * NavBar.jsx
 * - What: Minimal top navigation bar for SPA.
 * - Why: Provides navigation links for main routes.
 * - How: Uses semantic HTML and CSS Modules for styling.
 */

import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";

export default function NavBar() {
  return (
    <nav className={styles.navbar} aria-label="Main navigation">
      <NavLink to="/" className={styles.logo} end>
        Code Archive
      </NavLink>
      <div>
        <NavLink
          to="/archive"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
        >
          Archive
        </NavLink>
        <NavLink
          to="/add"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
        >
          Add Snippet
        </NavLink>
      </div>
    </nav>
  );
}
