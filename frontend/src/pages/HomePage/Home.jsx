// Home.jsx - Main landing page for the SPA
// What: Displays the home/landing content.
// Why: Required as a route in App.jsx and as the default page.
// How: Rendered for "/" and as fallback for unknown routes.

import React from "react";
import SnippetForm from "../../components/SnippetForm/SnippetForm";

export default function Home() {
  // Wrapper div applies page-level styling using CSS Modules
  return (
    <div className="homeWrapper">
      <SnippetForm />

      <main className="homeContent">
        {/* Main content area for the home page */}
        <h1>Welcome to Code Archive</h1>
        <p>This is the home page of your SPA.</p>
      </main>
    </div>
  );
}
