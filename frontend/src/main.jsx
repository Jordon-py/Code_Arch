// main.jsx - SPA entry point. Mounts React app to #root and applies global styles.
// What: Sets up React root and global CSS, wraps app in a single BrowserRouter.
// Why: Only one Router should exist in the app to avoid runtime errors.
// How: BrowserRouter wraps App, which contains all routes.

import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css"; // Global styles

// Mount the SPA to the root DOM node
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
