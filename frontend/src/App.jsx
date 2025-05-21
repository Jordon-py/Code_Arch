/**
 * App.jsx
 * - What: Minimal SPA entry point for Code Archive.
 * - Why: Sets up sidebar navigation and a placeholder main area.
 * - How: Imports only essential components, uses inline style for layout.
 * - Usage: This is the root React component, rendered by main.jsx.
 */

import React from "react";
import NavBar from "./components/NavBar/NavBar";
import SideBar from "./components/SideBar/SideBar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/HomePage/Home"

export default function App() {
  // Renders sidebar, navbar, main content, and footer.
  return (
    <>
      
      <main className="appWrapper">
        <SideBar />
        <Home />
      </main>
      
      <Footer />
    </>
  )
};