// Helper: Normalize tags to always be { label, color } objects
// This utility ensures all tags are objects with a label and a default color if not provided.

// Define the normalizeTags function to standardize tag objects for consistent usage across the app
const normalizeTags = (tags) => {
  // Map over each tag; if it's a string, convert to object with default color, else return as is
  return tags.map((tag) =>
    typeof tag === "string" ? { label: tag, color: "lch(74 50 180)" } : tag
  );
};

// Export the normalizeTags function as the default export for easy import in other modules
export default normalizeTags;


// Export the normalizeTags function for use in other modules (ES module syntax for Vite/React)

