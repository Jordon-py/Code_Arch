import styles from "../styles/Hero.module.css";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <h1 id="hero-heading">
        Welcome to <span className={styles.highlight}>Code Archive</span>
      </h1>
      <p className={styles.subtitle}>
        Save, organize, and instantly reuse your most useful code snippets and functions. Boost your workflow with one click.
      </p>
      <div className={styles.actions}>
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
