const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { saveSnippet, getSnippets, deleteSnippet } = require('../controllers/snippetController');

router.use(protect);

router.post('/', saveSnippet);
router.get('/', getSnippets);
router.delete('/:id', deleteSnippet);

module.exports = router;
