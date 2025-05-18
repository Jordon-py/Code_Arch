// controllers/snippetsController.js
//
// Controller boilerplate for handling CRUD logic for snippets.
// -----------------------------------------------------------
// Each exported function matches a REST endpoint:
//
//   getAllSnippets    -> GET    /api/snippets
//   createSnippet     -> POST   /api/snippets
//   getSnippetById    -> GET    /api/snippets/:id
//   updateSnippet     -> PUT    /api/snippets/:id
//   deleteSnippet     -> DELETE /api/snippets/:id
//
// Each function:
//   - Receives Express req/res
//   - Interacts with the Snippet model (Mongoose)
//   - Sends JSON response (success or error) in a consistent format
// -----------------------------------------------------------

const Snippet = require("../models/Snippet");

// -------------------------------------------------- GET /api/snippets -----    // List all snippets (newest first)

exports.getAllSnippets = async (req, res) => {
  try {
    const snippets = await Snippet.find().sort({ createdAt: -1 });
    res.json({ success: true, data: snippets });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, error: "Server error in Controllers" });
  }
};

//      ----------------------------------- POST /api/snippets   ----------------------------------------------------->     ----- // Add a new snippet

exports.createSnippet = async (req, res) => {
  try {
    const snippet = await Snippet.create(req.body);
    res.status(201).json({ success: true, data: snippet });
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ success: false, error: err.message });
    }
    res
      .status(500)
      .json({ success: false, error: "Server error while creating snippet" });
  }
};

// -----------------------------------------------------GET /api/snippets/:id -----

exports.getSnippetById = async (req, res) => {
  try {
    const snippet = await Snippet.findById(req.params.id);
    if (!snippet)
      return res
        .status(404)
        .json({ success: false, error: "Snippet not found" });

    res.json({ success: true, data: snippet });
  } catch (err) {
    res.status(400).json({ success: false, error: "Invalid snippet ID" });
  }
};

// ----- PUT /api/snippets/:id -----
exports.updateSnippet = async (req, res) => {
  try {
    const snippet = await Snippet.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!snippet)
      return res
        .status(404)
        .json({ success: false, error: "Snippet not found" });
    res.json({ success: true, data: snippet });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// ----- DELETE /api/snippets/:id -----
exports.deleteSnippet = async (req, res) => {
  try {
    const snippet = await Snippet.findByIdAndDelete(req.params.id);
    if (!snippet)
      return res
        .status(404)
        .json({ success: false, error: "Snippet not found" });
    res.json({ success: true, message: "Snippet deleted." });
  } catch (err) {
    res.status(400).json({ success: false, error: "Invalid snippet ID" });
  }
};
