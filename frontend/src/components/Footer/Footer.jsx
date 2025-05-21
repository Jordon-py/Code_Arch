/**
 * Footer.jsx - SPA footer component.
 * - What: Displays footer content at the bottom of every page.
 * - Why: Provides consistent branding and info.
 * - How: Included in App.jsx layout.
 */

import React from "react";
import styles from "./Footer.module.css"; // Import scoped CSS for styling

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <small>&copy; {new Date().getFullYear()} Code Archive</small>
    </footer>
  );
}
