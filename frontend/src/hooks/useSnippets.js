// src/hooks/useSnippets.js     // dependencies
import React from "react";
import { loadSnippets, saveSnippets } from "../services/snippetStorage";
// -------------------------------------> 



function newTs() {                  /** ------------ Generate a new timestamp */    
  return Date.now();
}

/**
 * Custom React hook for snippet management
 * - Loads initial data from storage
 * - Persists on every change
 * - Provides add/update/delete/toggleFavorite
 */
export function useSnippets() {
  const [snippets, setSnippets] = React.useState(loadSnippets());


  React.useEffect(() => saveSnippets(snippets), [snippets]);    /** Save snippets to localStorage whenever they change */


  function addSnippet(data) {                 /** ------------ Add a new snippet */  /** Add a new snippet with defaults */
    const newSnip = {
      snippetId: `snippet-${newTs()}`,
      title: data.title || "Untitled",
      description: data.description || "",
      content: data.content || "",
      language: data.language || "javascript",
      category: data.category || "Uncategorized",
      domain: data.domain || [ "Control Flow", "Loops", "Functions" ],
      tags: data.tags || [],
      createdTimestamp: newTs(),
      updatedTimestamp: newTs(),
      usageCount: 0,
      favorite: false,
      archived: false,
    };
    setSnippets([newSnip, ...snippets]);
  }


  function updateSnippet(id, updates) {               /** ------------ Update snippet by ID */
    setSnippets(snippets.map(sn => 
      sn.snippetId !== id 
        ? sn 
        : { ...sn, ...updates, updatedTimestamp: newTs() }
    ));
  }


  function deleteSnippet(id) {                        /** ------------ Mark as archived (soft‑delete) */
    updateSnippet(id, { archived: true });
  }


  function toggleFavorite(id) {                   /** ------------ Toggle favorite status */
    const sn = snippets.find(s => s.snippetId === id);
    if (sn) updateSnippet(id, { favorite: !sn.favorite });
  }

  return { snippets, addSnippet, updateSnippet, deleteSnippet, toggleFavorite };
}
// export default useSnippets;