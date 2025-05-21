/**
 * SnippetCard.jsx
 * - Displays a single code snippet in a card format.
 * - Uses semantic <article> for standalone snippet content.
 * - Handles code formatting, category display, and tags.
 * - Each card is accessible and responsive.
 * - Tags are normalized to support both string and object formats for robustness.
 */

import styles from "../styles/SnippetCard.module.css";

export default function SnippetCard({ snippet }) {
  // Defensive: Normalize tags to always display correctly (string or {label, color})
  const tags = (snippet.tags || []).map((tag) =>
    typeof tag === "string" ? { label: tag } : tag
  );

  return (
    <article
      className={styles.card}
      tabIndex={0}
      aria-label={`Code snippet: ${snippet.title}`}
    >
      <header className={styles.header}>
        <h3 className={styles.title}>{snippet.title}</h3>
        <span className={styles.category}>
          {snippet.category} / {snippet.subcategory}
        </span>
      </header>
      {/* Use <pre><code> for code semantics and copy-paste UX */}
      <pre className={styles.codeBlock}>
        <code>{snippet.code}</code>
      </pre>
      <ul className={styles.tags}>
        {tags.map((tag) => (
          <li key={tag.label} className={styles.tag}>
            {tag.label}
          </li>
        ))}
      </ul>
    </article>
  );
}
