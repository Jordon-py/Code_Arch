// AddSnippet.jsx - Page for adding new code snippets.
// What: Provides a form to add a new snippet.
// Why: Required for /add route in SPA.
// How: Lazy-loaded in App.jsx for performance.

import { useState } from "react";
import SnippetForm from "../components/SnippetForm";
import { addSnippet } from "../services/snippetApi";
import { useNavigate } from "react-router-dom";

export default function AddSnippet() {
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  async function handleSave(fields) {
    setStatus("Saving...");
    try {
      await addSnippet(fields);
      setStatus("Snippet saved! Redirecting...");
      setTimeout(() => navigate("/archive"), 1200);
    } catch (err) {
      setStatus("Error: " + err.message);
    }
  }

  return (
    <main>
      <h2>Code_Arch</h2>
      <SnippetForm onSave={handleSave} />
      {status && (
        <div
          style={{
            marginTop: "1rem",
            color: status.startsWith("Error") ? "red" : "#4cc9f0",
          }}
        >
          {status}
        </div>
      )}
    </main>
  );
}
