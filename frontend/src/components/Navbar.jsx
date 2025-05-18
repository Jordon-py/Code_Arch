/**
 * Navbar.jsx
 * - Top-level navigation bar for SPA.
 * - Provides navigation links for main routes.
 * - Enables user navigation across SPA pages.
 * - Uses semantic HTML (<nav>).
 * - Highlights current route for accessibility (aria-current, visually).
 */

import React from "react";
import { NavLink } from "react-router-dom";
import styles from "../styles/Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar} aria-label="Main navigation">
      <NavLink to="/" className={styles.logo} end>
        Code Archive
      </NavLink>
      <div>
        {/* NavLink 'end' prop ensures Home is only active on exact "/" */}
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
