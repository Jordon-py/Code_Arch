import { useEffect, useState } from "react";
import SnippetList from "../components/SnippetList";
import { getSnippets } from "../services/snippetApi";

// Archive.jsx - Displays archived code snippets.
// What: Shows a list of saved/archived snippets.
// Why: Required for /archive route in SPA.
// How: Lazy-loaded in App.jsx for performance.

export default function Archive() {
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSnippets()
      .then((data) => setSnippets(data))
      .catch(() => setSnippets([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h2 style={{ marginBottom: "1.5rem" }}>Your Code Archive</h2>
      {loading ? <p>Loading...</p> : <SnippetList snippets={snippets} />}
    </div>
  );
}
