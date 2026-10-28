import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import Message from '../models/messageModel.js';
import crypto from 'crypto';
import { sendEmail } from '../utils/sendEmail.js';



export const registerUserService = async ({ name, email, password, tick }) => {
  // 1. Check required fields
  if (!name || !email || !password) {
    const error = new Error('Name, email, and password are required');
    error.statusCode = 400;
    throw error;
  }

 
  

  // 3. Password length check
  if (password.length < 6) {
    const error = new Error('Password must be at least 6 characters long');
    error.statusCode = 400;
    throw error;
  }

  // 4. Duplicate user check
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const error = new Error('User already registered with this email');
    error.statusCode = 409;
    throw error;
  }

  // 5. Password hash
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // 6. Save in DB (tick ko boolean handle karke)
  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    tick: Boolean(tick),
  });

  // 7. Sanitized return (password bahar nahi bhejna)
  return {
    id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    tick: newUser.tick,
    
  };
};


//login
export const loginUserService = async ({ email, password }) => {
  // 1. Validation: Fields check
  if (!email || !password) {
    const error = new Error('Email and password are required');
    error.statusCode = 400;
    throw error;
  }

  // 2. Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error('Invalid email or password');
    error.statusCode = 401;
    throw error;
  }

  // 3. Compare password using bcrypt
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const error = new Error('Invalid email or password');
    error.statusCode = 401;
    throw error;
  }

  // 4. Generate JWT Token
  const token = jwt.sign(
    { id: user._id, email: user.email,role: user.role},
    process.env.JWT_SECRET || 'fallbacksecret',
    { expiresIn: '1d' }
  );

  // 5. Safe user return
  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      tick: user.tick,
      role:user.role,
    },
    token,
  };
};
// Profile fetch karne ke liye service
export const getUserProfileService = async (userId) => {
  const user = await User.findById(userId).select('-password');
  if (!user) {
    const error = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }
  return user;
};

export const createMessageService = async ({ userId, name, email, message }) => {
  // 1. Validation
  if (!name || !email || !message) {
    const error = new Error('Name, email, and message are all required');
    error.statusCode = 400;
    throw error;
  }

  // 2. Database me create karein
  const newMessage = await Message.create({
    userId,
    name,
    email,
    message,
  });

  return newMessage;
};

export const forgotPasswordService = async ({ email }) => {
  // 1. Validation: Email aayi ya nahi?
  if (!email) {
    const error = new Error('Email is required');
    error.statusCode = 400;
    throw error;
  }

  // 2. Check: User database me exist karta hai?
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error('User not found with this email');
    error.statusCode = 404;
    throw error;
  }

  // 3. Token Generate: 32 bytes ka random string (jaise: "4f9b8c2e...")
  const resetToken = crypto.randomBytes(32).toString('hex');

  // 4. Expiry Set: Abhi ke time se 15 minute baad ka waqt
  const expireTime = Date.now() + 15 * 60 * 1000; // 15 mins in milliseconds

  // 5. Database Update: User ke document me yeh dono save kar do
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = expireTime;
  await user.save();

  // 6. Return: Controller ko token return kar do
 const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

  // 5.2 Email ka HTML template
  const htmlMessage = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 500px; margin: auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
      <h2 style="color: #0284c7; text-align: center;">Reset Your Password</h2>
      <p>Hello,</p>
      <p>Aapne apna password reset karne ki request bheji thi. Naya password banane ke liye niche diye gaye button par click karein:</p>
      
      <div style="text-align: center; margin: 25px 0;">
        <a href="${resetUrl}" style="background-color: #0284c7; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
          Reset Password
        </a>
      </div>

      <p style="font-size: 13px; color: #64748b;">
        Yeh link agle <b>15 minutes</b> ke liye valid hai. Agar aapne request nahi ki thi, toh is email ko ignore karein.
      </p>
    </div>
  `;

  // 5.3 Mail send kiya
  await sendEmail({
    to: user.email,
    subject: 'Password Reset Request',
    html: htmlMessage,
  });

  // 👆 YAHAN TAK NAYA PART THA 👆

  // 6. Return: Controller ko token return kar do (Jaise pehle tha waisa hi)
  return {
    resetToken,
    email: user.email,
  };
};
export const resetPasswordService = async ({ token, newPassword }) => {
  // 1. Validation
  if (!token || !newPassword) {
    const error = new Error('Token and new password are required');
    error.statusCode = 400;
    throw error;
  }

  if (newPassword.length < 6) {
    const error = new Error('Password must be at least 6 characters long');
    error.statusCode = 400;
    throw error;
  }

  // 2. Token match karein aur check karein expiry time bacha hai ya nahi ($gt = greater than now)
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    const error = new Error('Invalid or expired reset token');
    error.statusCode = 400;
    throw error;
  }

  // 3. Naye password ko hash karein
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(newPassword, salt);

  // 4. Token aur expiry clear kar dein taaki yeh link dobara use na ho sake (One-time use)
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  return { message: 'Password has been reset successfully' };
};
export const getAllMessagesService = async () => {
  try {
    const messages = await Message.find()
      .populate({
        path: 'userId',
        select: 'name email role',
        model: User, // 👈 Directly imported User model pass karne se 500 crash fix ho jayega
      })
      .sort({ createdAt: -1 });

    return messages;
  } catch (error) {
    console.error('Database Error in getAllMessagesService:', error.message);
    throw error;
  }
};



