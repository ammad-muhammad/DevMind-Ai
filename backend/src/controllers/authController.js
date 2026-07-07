const User = require('../models/User');
const Chat = require('../models/Chat');
const Snippet = require('../models/Snippet');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
});

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (!email.includes('@') || !email.includes('.')) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    if (password.length < 6) {
      return res.status(400).json({ 
        message: "Password must be at least 6 characters" 
      });
    }
    if (username.length < 3 || username.length > 20) {
      return res.status(400).json({ 
        message: "Username must be 3-20 characters" 
      });
    }

    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    const user = new User({
      username,
      email,
      password: hashedPassword,
      isVerified: false,
      otp,
      otpExpiry
    });

    await user.save();

    transporter.sendMail({
      from: `"DevMind AI" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: 'Your DevMind AI Verification Code',
      html: `
        <div style="font-family: Arial, sans-serif;
        max-width: 500px; margin: 0 auto;
        background: #0a0a0a; color: #ffffff;
        padding: 40px; border-radius: 12px;">
          <h1 style="color: #7c3aed;">DevMind AI</h1>
          <p style="color: #9ca3af;">
            Your intelligent coding partner
          </p>
          <h2>Verify your email</h2>
          <p style="color: #d1d5db;">
            Your verification code:
          </p>
          <div style="background: #1f1f1f; 
          border: 2px solid #7c3aed;
          border-radius: 12px; padding: 24px; 
          text-align: center; margin: 24px 0;">
            <h1 style="color: #a78bfa; font-size: 42px;
            letter-spacing: 12px; margin: 0;">
              ${otp}
            </h1>
          </div>
          <p style="color: #6b7280; font-size: 14px;">
            Expires in 10 minutes. 
            If you did not request this, ignore this email.
          </p>
        </div>
      `
    }).catch(err => console.error('Email send error:', err));

    res.status(200).json({
      message: "OTP sent to your email",
      email: email,
      requiresVerification: true
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        message: "Email not verified",
        requiresVerification: true,
        email: email
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '24h'
    });

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

const me = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Me error:', error);
    res.status(500).json({ message: 'Server error fetching user profile' });
  }
};

const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const user = await User.findById(req.user._id);
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }
    if (newPassword.length < 6) {
      return res.status(400).json({ message: 'New password must be at least 6 characters' });
    }
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();
    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('changePassword error:', error);
    res.status(500).json({ message: 'Server error during password change' });
  }
};

const deleteAccount = async (req, res) => {
  try {
    const userId = req.user._id;
    await Chat.deleteMany({ userId });
    await Snippet.deleteMany({ userId });
    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: 'Account deleted' });
  } catch (error) {
    console.error('deleteAccount error:', error);
    res.status(500).json({ message: 'Server error deleting account' });
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    if (user.isVerified) {
      return res.status(400).json({ message: "Already verified" });
    }
    if (Date.now() > user.otpExpiry) {
      return res.status(400).json({ message: "OTP expired, please register again" });
    }
    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '24h'
    });

    res.status(200).json({
      message: "Email verified successfully",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar
      }
    });
  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({ message: 'Server error during verification' });
  }
};

const resendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    if (user.isVerified) {
      return res.status(400).json({ message: "Already verified" });
    }

    const otp = generateOTP();
    user.otp = otp;
    user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    await transporter.sendMail({
      from: `"DevMind AI" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: 'Your DevMind AI Verification Code',
      html: `
        <div style="font-family: Arial, sans-serif;
        max-width: 500px; margin: 0 auto;
        background: #0a0a0a; color: #ffffff;
        padding: 40px; border-radius: 12px;">
          <h1 style="color: #7c3aed;">DevMind AI</h1>
          <p style="color: #9ca3af;">
            Your intelligent coding partner
          </p>
          <h2>Verify your email</h2>
          <p style="color: #d1d5db;">
            Your verification code:
          </p>
          <div style="background: #1f1f1f; 
          border: 2px solid #7c3aed;
          border-radius: 12px; padding: 24px; 
          text-align: center; margin: 24px 0;">
            <h1 style="color: #a78bfa; font-size: 42px;
            letter-spacing: 12px; margin: 0;">
              ${otp}
            </h1>
          </div>
          <p style="color: #6b7280; font-size: 14px;">
            Expires in 10 minutes. 
            If you did not request this, ignore this email.
          </p>
        </div>
      `
    });

    res.status(200).json({ message: "OTP resent successfully" });
  } catch (error) {
    console.error('Resend OTP error:', error);
    res.status(500).json({ message: 'Server error during resend' });
  }
};

module.exports = { register, login, me, changePassword, deleteAccount, verifyOTP, resendOTP };