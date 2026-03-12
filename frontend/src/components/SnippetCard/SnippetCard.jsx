import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import styles from "./SnippetCard.module.css";

export default function SnippetCard({ snippet }) {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const x = useSpring(pointerX, { stiffness: 220, damping: 18, mass: 0.2 });
  const y = useSpring(pointerY, { stiffness: 220, damping: 18, mass: 0.2 });

  const rotateX = useTransform(y, [-12, 12], [8, -8]);
  const rotateY = useTransform(x, [-12, 12], [-8, 8]);

  const title = snippet.title || snippet.name || "Untitled Snippet";
  const tags = Array.isArray(snippet.tags) ? snippet.tags : [];

  const handlePointerMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const offsetX = event.clientX - rect.left - rect.width / 2;
    const offsetY = event.clientY - rect.top - rect.height / 2;
    const normalizedX = offsetX / (rect.width / 2);
    const normalizedY = offsetY / (rect.height / 2);

    pointerX.set(normalizedX * 12);
    pointerY.set(normalizedY * 10);

    event.currentTarget.style.setProperty(
      "--glow-x",
      `${((offsetX / rect.width) + 0.5) * 100}%`
    );
    event.currentTarget.style.setProperty(
      "--glow-y",
      `${((offsetY / rect.height) + 0.5) * 100}%`
    );
  };

  const handlePointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <motion.article
      whileHover={{
        y: -6,
        scale: 1.03,
      }}
      whileTap={{ scale: 0.995 }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
      style={{ x, y, rotateX, rotateY, transformPerspective: 1100 }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onBlur={handlePointerLeave}
      className={styles.card}
      tabIndex={0}
    >
      <header className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        {snippet.category && <span className={styles.meta}>{snippet.category}</span>}
      </header>

      {snippet.description && <p className={styles.description}>{snippet.description}</p>}

      <pre className={styles.code}>{snippet.code}</pre>

      {tags.length > 0 && (
        <ul className={styles.tags} aria-label="Snippet tags">
          {tags.slice(0, 4).map((tag, index) => {
            const label = typeof tag === "string" ? tag : tag.label;
            return (
              <li key={`${label}-${index}`} className={styles.tag}>
                {label}
              </li>
            );
          })}
        </ul>
      )}
    </motion.article>
  );
}
