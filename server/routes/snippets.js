
// routes/snippets.js
//
// REST endpoint for CRUD operations on code snippets
// in the Code Archive project.
// This file defines the routes for the snippets API.
// -------------------------------------------------------------
// For each CRUD action, define a route:
//
//   GET    /api/snippets         -> List all snippets
//   POST   /api/snippets         -> Add new snippet
//   GET    /api/snippets/:id     -> Get one snippet by ID
//   PUT    /api/snippets/:id     -> Edit an existing snippet
//   DELETE /api/snippets/:id     -> Remove a snippet by ID
//
// Each route should:
//   1. Receive an HTTP request (GET, POST, etc.)
//   2. Pass the request data to the appropriate controller function
//   3. Respond with the result (JSON) or error
//
// Syntax:
//   router.<method>(<route>, <controllerFunction>)
//   e.g., router.get('/', getAllSnippets)
// -------------------------------------------------------------

const express = require('express');
const router = express.Router();

// Import controller functions
const { getAllSnippets, getSnippetById, createSnippet, updateSnippet, deleteSnippet} = require('../controllers/snippetsController');


//  ------------------------------------------------------------------------------------->
// Define routes for snippets
    // -------------------------------------------------------------
router.get('/', getAllSnippets);
router.post('/', createSnippet);                // Add new snippet
router.get('/:id', getSnippetById);             // Get one snippet by ID
router.put('/:id', updateSnippet);              // Edit snippet by ID
router.delete('/:id', deleteSnippet);           // Delete snippet by ID

module.exports = router;
