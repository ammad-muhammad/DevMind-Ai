const router = require('express').Router();
const { register, login, me, changePassword, deleteAccount, verifyOTP, resendOTP } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, me);
router.put('/change-password', protect, changePassword);
router.delete('/delete-account', protect, deleteAccount);

router.post('/verify-otp', verifyOTP);
router.post('/resend-otp', resendOTP);

module.exports = router;