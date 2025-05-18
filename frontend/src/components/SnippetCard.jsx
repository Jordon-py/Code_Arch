/**
 * SnippetCard.jsx
 * - Displays a single code snippet in a card format.
 * - Uses semantic <article> for standalone snippet content.
 * - Handles code formatting, category display, and tags.
 * - Each card is accessible and responsive.
 */

import styles from "../styles/SnippetCard.module.css";

export default function SnippetCard({ snippet }) {
  return (
    <article className={styles.card} tabIndex={0} aria-label={`Code snippet: ${snippet.title}`}>
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
        {snippet.tags.map(tag => (
          <li key={tag.label} className={styles.tag}>{tag.label}</li>
        ))}
      </ul>
    </article>
  );
}
