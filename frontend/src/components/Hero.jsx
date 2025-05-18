/**
 * Hero.jsx
 * - Eye-catching intro with strong call-to-action.
 * - Uses semantic <section>, headings, and accessible buttons.
 * - Modular CSS for custom gradients and interaction.
 */

import styles from "../styles/Hero.module.css";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <h1 id="hero-heading">
        Welcome to <span className={styles.highlight}>Code Archive</span>
      </h1>
      <p className={styles.subtitle}>
        Your personal, beautifully organized library for code snippets and reusable functions.
      </p>
      <div className={styles.actions}>
        {/* Use semantic links styled as buttons for best accessibility */}
        <Link to="/archive" className={styles.button}>
          Browse Archive
        </Link>
        <Link to="/add" className={styles.buttonOutline}>
          Add New Snippet
        </Link>
      </div>
    </section>
  );
}
