// Footer.jsx - SPA footer component.
// What: Displays footer content at the bottom of every page.
// Why: Provides consistent branding and info.
// How: Included in App.jsx layout.

import React from "react";

export default function Footer() {
  return (
    <footer
      style={{
        textAlign: "center",
        padding: "1rem",
        background: "lch(98 0 0)",
      }}
    >
      <small>&copy; {new Date().getFullYear()} Code Archive</small>
    </footer>
  );
}
