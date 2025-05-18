// Home.jsx - Main landing page for the SPA
// What: Displays the home/landing content.
// Why: Required as a route in App.jsx and as the default page.
// How: Rendered for "/" and as fallback for unknown routes.

import React from "react";

export default function Home() {
  return (
    <main>
      <h1>Welcome to Code Archive</h1>
      <p>This is the home page of your SPA.</p>
    </main>
  );
}
