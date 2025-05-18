/**
 * App.jsx
 * - SPA entry point.
 * - Sets up client-side routing, layout, and global design patterns.
 * - Uses React Router for navigation—no page reloads.
 * - Applies modular CSS for maintainability.
 */

import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";                             //   Layout components
import Footer from "./components/Footer";


import Home from "./pages/Home";                   //  -----   Pages
import Archive from "./pages/Archive";
import AddSnippet from "./pages/AddSnippet";

import styles from "./styles/App.module.css";     // Modular CSS for root layout





export default function App() {
  return (
    <Router>
      {/* Global Layout */}
      <div className={styles.appWrapper}>
        {/* Consistent navigation at top */}
        <Navbar />

        {/* Central content area for all routes */}
        <main className={styles.mainContent}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/archive" element={<Archive />} />
            <Route path="/add" element={<AddSnippet />} />
            {/* 
              Optional: add a 404 "Not Found" page here for unmatched routes
              <Route path="*" element={<NotFound />} /> 
            */}
          </Routes>
        </main>

        {/* Footer always visible */}
        <Footer />
      </div>
    </Router>
  );
}
