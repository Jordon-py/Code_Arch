/**
 * SnippetList.jsx
 * - Renders a list of SnippetCards.
 * - Shows an empty state if no snippets exist.
 * - Accepts a `snippets` prop—can be from API or static sample.
 */

import React from "react";
import SnippetCard from "./SnippetCard/SnippetCard";

export default function SnippetList({ snippets = [] }) {
  if (!snippets.length) {
    return <p>No snippets yet. Try adding one!</p>;
  }
  return (
    <section aria-label="Saved code snippets">
      {snippets.map((snippet) => (
        <SnippetCard key={snippet.id || snippet._id} snippet={snippet} />
      ))}
    </section>
  );
}
