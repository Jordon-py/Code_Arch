/**
 * App.jsx
 * - SPA entry point.
 * - Sets up client-side routing, layout, and global design patterns.
 * - Uses React Router for navigation—no page reloads.
 * - Applies modular CSS for maintainability.
 */

import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar"; //   Layout components
import Footer from "./components/Footer";

import Home from "./pages/Home"; //  -----   Pages
const Archive = lazy(() => import("./pages/Archive"));
const AddSnippet = lazy(() => import("./pages/AddSnippet"));

import styles from "./styles/App.module.css"; // Modular CSS for root layout

export default function App() {
  return (
    <>
      {/* Global Layout */}
      <div className={styles.appWrapper}>
        {/* Consistent navigation at top */}
        <Navbar />

        {/* Central content area for all routes */}
        <main className={styles.mainContent}>
          {/* Suspense provides fallback UI while lazy routes load */}
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              {/* Default route: Home page */}
              <Route path="/" element={<Home />} />
              {/* Archive and AddSnippet routes */}
              <Route path="/archive" element={<Archive />} />
              <Route path="/add" element={<AddSnippet />} />
              {/* Catch-all: redirect unknown routes to Home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </main>

        {/* Footer always visible */}
        <Footer />
      </div>
    </>
  );
}
