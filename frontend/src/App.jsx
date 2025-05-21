// App.jsx
import { useEffect, useState } from "react";
import SnippetForm from "./components/SnippetForm/SnippetForm";
import FloatingArchive from "./components/FloatingArchive/FloatingArchive";
import { getSnippets, addSnippet } from "./services/snippetApi";
import "./App.module.css"; // Global styles (ensure the path is relative)
import SideBar from "./components/SideBar/SideBar";  
// import Footer from "./components/Footer/Footer"; // Uncomment if you want to include the footer
import SnippetCard from "./components/SnippetCard/SnippetCard";

export default function App() {
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load snippets on mount
  useEffect(() => {
    getSnippets()
      .then((data) => {
        // Add .animating = false for all loaded snippets
        setSnippets(data.map((snip) => ({ ...snip, animating: false })));
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to load snippets");
        setLoading(false);
      });
  }, []);

  // Save handler for form
  async function handleSaveSnippet(formData, done) {
    setError(null);
    try {
      // 1. POST to backend
      const created = await addSnippet(formData);
      // 2. Add with animating:true (for float-in)
      setSnippets((prev) => [
        ...prev,
        { ...created, animating: true },
      ]);
      // 3. Remove animation after 1.2s
      setTimeout(() => {
        setSnippets((prev) =>
          prev.map((s) =>
            s._id === created._id ? { ...s, animating: false } : s
          )
        );
        done && done(); // Reset the form
      }, 1200); // Sync to your animation duration
    } catch (err) {
      setError(err.message || "Failed to save snippet");
      done && done();
    }
  }

  return (
    <div className="appWrapper">
      <SideBar />
      <header className="app-header">
        <h1 className="app-title">Code Archive</h1>
        <p className="app-description">Save, search, and organize your code snippets efficiently.</p>
      </header>
      <main>
        <SnippetForm onSave={handleSaveSnippet} />
        {loading && <div style={{ textAlign: "center", margin: "2rem" }}>Loading archive…</div>}
        {error && <div style={{ color: "#f33", textAlign: "center", margin: "1rem" }}>{error}</div>}
        <FloatingArchive snippets={snippets} />
      </main>
    </div>
  );
}