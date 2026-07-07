const router = require('express').Router();
const { createChat, sendMessage, getAllChats, getChatById, deleteChat } = require('../controllers/chatController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.route('/')
  .post(createChat)
  .get(getAllChats);

router.route('/:id')
  .post(sendMessage)
  .get(getChatById)
  .delete(deleteChat);

module.exports = router;