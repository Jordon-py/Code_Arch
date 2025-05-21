/**
 * SnippetForm.jsx
 * - Handles user input for adding a new code snippet.
 * - Implements accessible, validated form.
 * - Uses controlled components for form fields.
 */

import {
  CATEGORY_OPTIONS,
  SUBCATEGORY_OPTIONS,
  TAG_SUGGESTIONS,
} from "../../constants/snippetOptions.js";
import normalizeTags from "../../utils/normalizeTags.js"; // Utility to normalize tags
import styles from "./SnippetForm.module.css";
import React, { useState } from "react";

//  ---------------------------------------------------------------------
// Helper: Normalize tags to { label, color } objects
// Helper: Validate that all required fields are filled
// Function to validate form fields and return an object containing error messages for invalid fields
//------------------------------------------------------------------------------------

// Function to validate form fields
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

//  ---------------------------------------------------------------------

// SnippetForm component: Form for adding a new code snippet
// - Props: onSave: Function to call when the form is submitted successfully
// - State: fields (form data), errors (validation errors), tagInput (for custom tag entry)
// - Functions: handleChange (update form fields), handleAddTag (add a tag), handleRemoveTag (remove a tag), handleSubmit (submit the form)
// - Render: Form with fields for title, description, category, subcategory, tags, and code

//   -------------------------------------------------------------------------

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
  const [tagInput, setTagInput] = useState(""); // For custom tag entry

  // --- Handle input changes (for all fields) ---
  function handleChange(e) {
    const { name, value } = e.target;
    setFields((prev) => {
      const updatedFields = { ...prev, [name]: value };
      if (name === "category") {
        updatedFields.subcategory = "";
      }
      return updatedFields;
    });
  }

  // --- Add a tag from input ---
  function handleAddTag(e) {
    e.preventDefault();
    const tag = tagInput.trim();
    // Always store tags as { label, color } objects for consistency
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

  // --- Remove a tag ---
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

  // --- Handle form submission ---
  async function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate(fields);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    // Normalize tags before saving (ensure all are { label, color })
    const normalizedFields = {
      ...fields,
      // Normalize tags to ensure backend compatibility
      tags: normalizeTags(fields.tags),
    };
    onSave && onSave(normalizedFields);
    // Optionally reset form
    setFields({
      title: "",
      description: "",
      category: "",
      subcategory: "",
      tags: [],
      code: "",
    });
  }

  // --- Render ---
  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
      autoComplete="off"
      aria-label="Add new code snippet"
    >
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

      {/* Group category, subcategory, and tags in a single flexRow for better layout */}
      <div className={styles.flexRow}>
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

        <div className={styles.fieldGroup} id={styles.tags}>
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

        {/* Tags input is now grouped in the same flexRow */}
        <div className={styles.fieldGroup} id={styles.tags}>
          <label htmlFor="tags">Tags</label>
          <div className={styles.tagsInput}>
            {fields.tags.map((tag) => (
              <span
                key={typeof tag === "string" ? tag : tag.label}
                className={styles.tag}
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

      <button className={styles.submitBtn} type="submit">
        Save Snippet
      </button>
    </form>
  );
}
