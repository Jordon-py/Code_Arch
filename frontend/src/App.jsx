/**
 * App.jsx
 *
 * Root component for the Code Archive SPA.
 *
 * Tips:
 * - Keep data fetching here for global state
 * - Always show loading UI
 * - Always show error UI
 */

import { lazy, Suspense, useEffect, useState } from "react";
import { motion } from "framer-motion";
import SnippetForm from "./components/SnippetForm/SnippetForm";
import FloatingArchive from "./components/FloatingArchive/FloatingArchive";
import { getSnippets, addSnippet } from "./services/snippetApi";
import styles from "./App.module.css";
import SideBar from "./components/SideBar/SideBar";

const AmbientScene = lazy(() => import("./components/AmbientScene/AmbientScene"));

export default function App() {
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAmbient, setShowAmbient] = useState(false);

  // Load snippets
  useEffect(() => {
    async function load() {
      try {
        const data = await getSnippets();
        setSnippets(data.map(s => ({ ...s, animating: false })));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  useEffect(() => {
    const handlePointerMove = (event) => {
      document.documentElement.style.setProperty("--x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--y", `${event.clientY}px`);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  useEffect(() => {
    const media = window.matchMedia(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)"
    );

    const updateAmbientPreference = () => {
      setShowAmbient(media.matches);
    };

    updateAmbientPreference();
    media.addEventListener("change", updateAmbientPreference);

    return () => {
      media.removeEventListener("change", updateAmbientPreference);
    };
  }, []);

  async function handleSaveSnippet(formData, done) {
    try {
      const created = await addSnippet(formData);

      setSnippets((prev) => [
        ...prev,
        { ...created, animating: true },
      ]);

      setTimeout(() => {
        setSnippets((prev) =>
          prev.map((s) =>
            s._id === created._id
              ? { ...s, animating: false }
              : s
          )
        );
        done?.();
      }, 1200);
    } catch (err) {
      setError(err.message);
      done?.();
    }
  }

  return (
    <div className={styles.appWrapper}>
      {showAmbient && (
        <Suspense fallback={null}>
          <AmbientScene />
        </Suspense>
      )}
      <SideBar />

      <div className={styles.content}>
        <motion.header
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1>Code Archive</h1>
          <p>Save, search, and organize your code snippets.</p>
        </motion.header>

        <main className={styles.main}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.55 }}
            className={styles.formShell}
          >
            <SnippetForm onSave={handleSaveSnippet} />
          </motion.div>

          {loading && <div className={styles.loading}>Loading snippets...</div>}

          {error && <div className={styles.error}>Error: {error}</div>}

          {!loading && <FloatingArchive snippets={snippets} />}
        </main>
      </div>
    </div>
  );
}
