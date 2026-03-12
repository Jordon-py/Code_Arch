// ------------------------------------------------------------------------------------
// Snippet.js - Mongoose model for code snippets in the project
// Defines the schema for storing code snippets, their metadata, and tag structure.
// Used by Express route handlers for CRUD operations on snippets in MongoDB.
// Tags are always stored as { label, color } objects for consistency.
// ------------------------------------------------------------------------------------

const mongoose = require("mongoose");
const { Schema } = mongoose;

// Enumerated categories
const CATEGORIES = [
  "Functions & Components",
  "Logic & Flow",
];

// Subcategories per category (for validation in UI/frontend)
const SUBCATEGORIES = {
  "Functions & Components": [
    "React Component",
    "React Hooks"
  ],

  "Logic & Flow": [
    "Conditionals",
    "Loops"
  ],
};

// Enumerated tags (can be expanded via admin approval)
const ALLOWED_TAGS = [
  "react",
  "loop",
  "sort",
  "search"
];

const TagSchema = new Schema(
  {
    label: { type: String, required: true, enum: ALLOWED_TAGS },
    color: { type: String, default: "#ffe992ff" },
  },
  { id: false }
);

const SnippetSchema = new Schema(
  {
    title: { type: String, required: true, trim: true, minlength: 4, maxlength: 100, },
    description: { type: String, required: true, trim: true, minlength: 10, maxlength: 300, },
    code: { type: String, required: true },
    language: { type: String, default: "python" },
    category: { type: String, required: true, enum: CATEGORIES },
    subcategory: { type: String, required: true }, // UI/logic should only allow valid subcategories
    tags: [TagSchema], // Always an array of { label, color } objects
  },
  { timestamps: true }
);

module.exports = mongoose.model("Snippet", SnippetSchema);
