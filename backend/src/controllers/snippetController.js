const Snippet = require('../models/Snippet');

const saveSnippet = async (req, res) => {
  try {
    const userId = req.user._id;
    const { title, code, language, description } = req.body;

    if (!title || !code) {
      return res.status(400).json({ message: "Title and code are required" });
    }

    const snippet = new Snippet({
      userId,
      title,
      code,
      language: language || "JavaScript",
      description: description || ""
    });

    await snippet.save();
    res.status(201).json({ snippet });
  } catch (error) {
    console.error('saveSnippet error:', error);
    res.status(500).json({ message: 'Server error saving snippet' });
  }
};

const getSnippets = async (req, res) => {
  try {
    const userId = req.user._id;
    const snippets = await Snippet.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json({ snippets });
  } catch (error) {
    console.error('getSnippets error:', error);
    res.status(500).json({ message: 'Server error fetching snippets' });
  }
};

const deleteSnippet = async (req, res) => {
  try {
    const userId = req.user._id;
    const snippetId = req.params.id;

    const snippet = await Snippet.findOneAndDelete({ _id: snippetId, userId });
    
    if (!snippet) {
      return res.status(404).json({ message: "Snippet not found" });
    }

    res.status(200).json({ message: "Snippet deleted" });
  } catch (error) {
    console.error('deleteSnippet error:', error);
    res.status(500).json({ message: 'Server error deleting snippet' });
  }
};

module.exports = { saveSnippet, getSnippets, deleteSnippet };
