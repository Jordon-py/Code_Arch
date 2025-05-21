import styles from './SnippetCard.module.css';

export default function SnippetCard({ snippet, index }) {
  return (
    <div
      className={`${styles.card} ${snippet.animating ? styles.animating : ''}`}
      style={{
        animationDelay: `${index * 0.08}s`
      }}
      tabIndex={0} // for accessibility/focus
    >
      <div className={styles.title}>{snippet.title}</div>
      <div className={styles.meta}>
        <span className={styles.category}>{snippet.category}</span>
        {snippet.subcategory && <span>› {snippet.subcategory}</span>}
      </div>
      <pre className={styles.code}>{snippet.code}</pre>
      <div className={styles.tags}>
        {snippet.tags.map((tag) => (
          <span
            key={typeof tag === "string" ? tag : tag.label}
            className={styles.tag}
            style={{
              background: (typeof tag === "object" && tag.color) ? tag.color : "#facc15"
            }}
          >
            {typeof tag === "string" ? tag : tag.label}
          </span>
        ))}
      </div>
    </div>
  );
}
