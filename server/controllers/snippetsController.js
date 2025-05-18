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
//   - Sends JSON response (success or error)
// -----------------------------------------------------------

const Snippet = require('../models/Snippet');




// -------------------------------------------------- GET /api/snippets -----    // List all snippets (newest first)

exports.getAllSnippets = async (req, res) => {
    try {
      const snippets = await Snippet.find().sort({ createdAt: -1 })
        console.log(snippets)
        if (snippets) {
            res.json(snippets)
            return snippets
        }
    }
    
    catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Server error in Controllers' });
  }
};


//      ----------------------------------- POST /api/snippets   ----------------------------------------------------->     ----- // Add a new snippet

exports.createSnippet = async (req, res) => {
  try {
    const snippet = await Snippet.create(req.body)
    res.status(201).json(snippet);
  }
  
  catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: 'Server error while creating snippet' });
  }
};





// -----------------------------------------------------GET /api/snippets/:id -----

exports.getSnippetById = async (req, res) => {
  try {
      const snippet = await Snippet.findById(req.params.id);
      if (!snippet)
          return res.status(404).json({ error: 'Snippet not found' });
      
      res.json(snippet);
  }
    
  catch (err) {
    res.status(400).json({ error: 'Invalid snippet ID' });
  }
};





// ----- PUT /api/snippets/:id -----
exports.updateSnippet = async (req, res) => {
  try {
    const snippet = await Snippet.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!snippet) return res.status(404).json({ error: 'Snippet not found' });
    res.json(snippet);
  }
  
  catch (err) {
    res.status(400).json({ error: err.message });
  }
};




// ----- DELETE /api/snippets/:id -----
exports.deleteSnippet = async (req, res) => {
  try {
    const snippet = await Snippet.findByIdAndDelete(req.params.id)
      if (!snippet)
          return res.status(404).json({ error: 'Snippet not found' });
      res.json({ message: 'Snippet deleted.' });
  }
  
  catch (err) {
    res.status(400).json({ error: 'Invalid snippet ID' });
  }
};

