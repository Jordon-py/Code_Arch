/**
 * Enhanced SnippetForm.jsx
 * What: Form for adding/editing code snippets.
 * Why: Central to snippet creation in SPA.
 * How: Handles validation, triggers floating archive animation, and supports MongoDB-ready data.
 */

import React, { useState } from "react";
import {
  CATEGORY_OPTIONS,
  SUBCATEGORY_OPTIONS,
  TAG_SUGGESTIONS,
} from "../../constants/snippetOptions.js";
import normalizeTags from "../../utils/normalizeTags.js";
import styles from "./SnippetForm.module.css";

export default function SnippetForm({ onSave }) {
  // --- Form state ---
  const [fields, setFields] = useState({
    title: "",
    description: "",
    category: "",
    subcategory: "",
    tags: [],
    code: "",
  });
  const [errors, setErrors] = useState({});
  const [tagInput, setTagInput] = useState("");
  const [submitting, setSubmitting] = useState(false); // For animation/future UX

  // --- Validation ---
  const validate = (fields) => {
    const errors = {};
    if (!fields.title.trim()) errors.title = "Title is required.";
    if (!fields.description.trim())
      errors.description = "Description is required.";
    if (!fields.category) errors.category = "Category is required.";
    if (!fields.subcategory) errors.subcategory = "Subcategory is required.";
    if (!fields.code.trim()) errors.code = "Code is required.";
    return errors;
  };

  // --- Handlers ---
  function handleChange(e) {
    const { name, value } = e.target;
    setFields((prev) => {
      const updatedFields = { ...prev, [name]: value };
      if (name === "category") updatedFields.subcategory = "";
      return updatedFields;
    });
  }

  function handleAddTag(e) {
    e.preventDefault();
    const tag = tagInput.trim();
    if (
      tag &&
      !fields.tags.some((t) => (typeof t === "string" ? t : t.label) === tag)
    ) {
      setFields((prev) => ({
        ...prev,
        tags: [...prev.tags, { label: tag, color: "#facc15" }],
      }));
    }
    setTagInput("");
  }

  function handleRemoveTag(tag) {
    setFields((prev) => ({
      ...prev,
      tags: prev.tags.filter(
        (t) =>
          (typeof t === "string" ? t : t.label) !==
          (typeof tag === "string" ? tag : tag.label)
      ),
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    const validationErrors = validate(fields);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      setSubmitting(false);
      return;
    }
    const normalizedFields = {
      ...fields,
      tags: normalizeTags(fields.tags),
    };

    // Pass in a callback for when animation completes, if needed
    onSave &&
      onSave(normalizedFields, () => {
        // Called after "floating" animation finishes, can reset state here if you want
        setFields({
          title: "",
          description: "",
          category: "",
          subcategory: "",
          tags: [],
          code: "",
        });
        setSubmitting(false);
      });
    // If you want instant reset, just call setFields here too
    setSubmitting(false);
  }

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
      autoComplete="off"
      aria-label="Add new code snippet"
      style={{
        opacity: submitting ? 0.7 : 1,
        pointerEvents: submitting ? "none" : "auto",
      }}
    >
      {/* Title */}
      <div className={styles.fieldGroup}>
        <label htmlFor="title">
          Title<span className={styles.required}>*</span>
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={fields.title}
          onChange={handleChange}
          className={errors.title ? styles.error : ""}
          maxLength={100}
          autoFocus
          required
        />
        {errors.title && (
          <span className={styles.errorMsg}>{errors.title}</span>
        )}
      </div>

      {/* Description */}
      <div className={styles.fieldGroup}>
        <label htmlFor="description">
          Description<span className={styles.required}>*</span>
        </label>
        <textarea
          id="description"
          name="description"
          value={fields.description}
          onChange={handleChange}
          rows={3}
          maxLength={300}
          className={errors.description ? styles.error : ""}
          required
        />
        {errors.description && (
          <span className={styles.errorMsg}>{errors.description}</span>
        )}
      </div>

      {/* Category, Subcategory, Tags */}
      <div className={styles.flexRow}>
        {/* Category */}
        <div className={styles.fieldGroup}>
          <label htmlFor="category">
            Category<span className={styles.required}>*</span>
          </label>
          <select
            id="category"
            name="category"
            value={fields.category}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            {CATEGORY_OPTIONS.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && (
            <span className={styles.errorMsg}>{errors.category}</span>
          )}
        </div>

        {/* Subcategory */}
        <div className={styles.fieldGroup}>
          <label htmlFor="subcategory">
            Subcategory<span className={styles.required}>*</span>
          </label>
          <select
            id="subcategory"
            name="subcategory"
            value={fields.subcategory}
            onChange={handleChange}
            required
            disabled={!fields.category}
          >
            <option value="">Select subcategory</option>
            {fields.category &&
              SUBCATEGORY_OPTIONS[fields.category].map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
          </select>
          {errors.subcategory && (
            <span className={styles.errorMsg}>{errors.subcategory}</span>
          )}
        </div>

        {/* Tags */}
        <div className={styles.fieldGroup}>
          <label htmlFor="tags">Tags</label>
          <div className={styles.tagsInput}>
            {fields.tags.map((tag) => (
              <span
                key={typeof tag === "string" ? tag : tag.label}
                className={styles.tag}
                style={{
                  background:
                    typeof tag === "object" && tag.color
                      ? tag.color
                      : "#facc15",
                }}
              >
                {typeof tag === "string" ? tag : tag.label}
                <button
                  type="button"
                  aria-label={`Remove tag ${
                    typeof tag === "string" ? tag : tag.label
                  }`}
                  className={styles.removeTag}
                  onClick={() => handleRemoveTag(tag)}
                >
                  ×
                </button>
              </span>
            ))}
            <input
              type="text"
              id="tags"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => (e.key === "Enter" ? handleAddTag(e) : null)}
              placeholder="Add tag and press Enter"
              list="tag-suggestions"
            />
            <datalist id="tag-suggestions">
              {TAG_SUGGESTIONS.filter(
                (t) =>
                  !fields.tags.some(
                    (tag) => (typeof tag === "string" ? tag : tag.label) === t
                  )
              ).map((t) => (
                <option key={t} value={t} />
              ))}
            </datalist>
          </div>
        </div>
      </div>

      {/* Code Editor */}
      <div className={styles.fieldGroup}>
        <label htmlFor="code">
          Code<span className={styles.required}>*</span>
        </label>
        <textarea
          id="code"
          name="code"
          value={fields.code}
          onChange={handleChange}
          rows={7}
          className={errors.code ? styles.error : styles.codeEditor}
          required
          spellCheck={false}
          style={{ fontFamily: "'Fira Mono', 'Consolas', monospace" }}
        />
        {errors.code && <span className={styles.errorMsg}>{errors.code}</span>}
      </div>

      <button
        className={styles.submitBtn}
        type="submit"
        disabled={submitting}
        aria-busy={submitting}
      >
        {submitting ? "Saving..." : "Save Snippet"}
      </button>
    </form>
  );
}
