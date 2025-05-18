// src/services/snippetStorage.js

const STORAGE_KEY = "codeSnippets";

/** ------------------------------------------------------ Read and parse the snippets array from localStorage */
export function loadSnippets() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    console.warn("Could not parse stored snippets.");
    return [];
  }
}

/** ----------------------------------------------------------------- Serialize and save the snippets array to localStorage */
export function saveSnippets(snippets) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(snippets));
}
