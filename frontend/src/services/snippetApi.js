/**
 * snippetApi.js
 * Service layer for communicating with the backend API.
 *
 * Tips:
 * - Always parse fetch responses using res.json()
 * - Handle errors early so UI doesn't crash
 * - Centralize API URLs in one place
 */

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api/snippets";

// Fetch all snippets
export async function getSnippets() {
  const res = await fetch(API_URL);

  if (!res.ok) {
    throw new Error("Failed to fetch snippets");
  }

  const json = await res.json();

  return json.data;
}

// Create snippet
export async function addSnippet(data) {
  const normalized = {
    ...data,
    tags: (data.tags || []).map((t) =>
      typeof t === "string"
        ? { label: t, color: "#facc15" }
        : t
    ),
  };

  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(normalized),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.error || "Failed to add snippet");
  }

  return json.data;
}
