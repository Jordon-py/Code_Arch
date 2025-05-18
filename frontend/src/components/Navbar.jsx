/**
 * Navbar.jsx
 * - Top-level navigation.
 * - Uses semantic HTML (<nav>).
 * - Highlights current route for accessibility (aria-current, visually).
 */

import { NavLink } from "react-router-dom";
import styles from "../styles/Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar} aria-label="Main navigation">
      <div className={styles.logo}>Code Archive</div>
      <ul className={styles.links}>
        {/* NavLink auto-applies 'active' style on current route */}
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? styles.active : undefined} end>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/archive" className={({ isActive }) => isActive ? styles.active : undefined}>
            Archive
          </NavLink>
        </li>
        <li>
          <NavLink to="/add" className={({ isActive }) => isActive ? styles.active : undefined}>
            Add Snippet
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
