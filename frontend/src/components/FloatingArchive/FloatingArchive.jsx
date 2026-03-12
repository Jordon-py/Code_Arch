/**
 * FloatingArchive.jsx
 *
 * Displays the snippet archive grid.
 *
 * Tips:
 * - Always use stable keys (_id from MongoDB)
 * - Empty states improve UX dramatically
 */

import SnippetCard from "../SnippetCard/SnippetCard.jsx";
import { motion } from "framer-motion";
import styles from "./FloatingArchive.module.css";

const gridVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.98,
    filter: "blur(6px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 190,
      damping: 19,
      mass: 0.4,
    },
  },
};

export default function FloatingArchive({ snippets = [] }) {
  return (
    <section className={styles.archive}>

      {snippets.length === 0 && (
        <div className={styles.emptyMsg}>
          🚀 Your archive is empty.
          <br />
          Add your first snippet above.
        </div>
      )}

      <motion.div
        className={styles.grid}
        layout
        variants={gridVariants}
        initial="hidden"
        animate="visible"
      >
        {snippets.map((snippet, i) => (
          <motion.div
            key={snippet._id || i}
            layout
            variants={itemVariants}
            className={styles.item}
          >
            <SnippetCard snippet={snippet} index={i} />
          </motion.div>
        ))}
      </motion.div>

    </section>
  );
}
