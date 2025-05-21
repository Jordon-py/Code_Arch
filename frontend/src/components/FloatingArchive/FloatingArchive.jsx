import SnippetCard from '../SnippetCard/SnippetCard.jsx';
import styles from './FloatingArchive.module.css';

export default function FloatingArchive({ snippets }) {
  return (
    <section className={styles.archive}>
      {snippets.length === 0 && (
        <div className={styles.emptyMsg}>No snippets yet! Add your first above.</div>
      )}
      <div className={styles.grid}>
        {snippets.map((snippet, i) => (
          <SnippetCard key={snippet.id} snippet={snippet} index={i} />
        ))}
      </div>
    </section>
  );
}
