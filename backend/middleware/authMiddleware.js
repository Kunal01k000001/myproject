// middlewares/authMiddleware.js
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const protect = async (req, res, next) => {
  try {
    let token;

    // 1. Authorization header check karein: "Bearer <token>"
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    // Agar token nahi mila
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.',
      });
    }

    // 2. Token verify karein
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'fallbacksecret'
    );

    // 3. User ko DB se fetch karke req.user me attach karein (password exclude karke)
    const currentUser = await User.findById(decoded.id).select('-password');
    if (!currentUser) {
      return res.status(404).json({
        success: false,
        message: 'The user belonging to this token no longer exists.',
      });
    }

    req.user = currentUser;
    next(); // Agle step / controller par jane do
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
    });
  }
};
export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next(); // Agar admin hai to aage jane do
  } else {
    return res.status(403).json({
      success: false,
      message: 'Access denied: Admin resource only',
    });
  }
};