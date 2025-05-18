// snippetApi.js - Service for interacting with backend snippet API
// Handles all CRUD operations for code snippets via REST endpoints.
// Ensures tag structure is normalized for backend compatibility.

const API_URL = "http://localhost:5000/api/snippets";

// Fetch all snippets
export async function getSnippets() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch snippets");
  return res.json();
}

// Create a new snippet
export async function addSnippet(data) {
  // Normalize tags to always be { label, color } objects for backend
  const normalized = {
    ...data,
    tags: (data.tags || []).map((t) =>
      typeof t === "string" ? { label: t, color: "#facc15" } : t
    ),
  };
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(normalized),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to add snippet");
  }
  return res.json();
}

// Optional: Implement update and delete as needed
