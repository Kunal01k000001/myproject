  import  {registerUserService,loginUserService,getUserProfileService,createMessageService,forgotPasswordService,resetPasswordService ,getAllMessagesService} from '../services/authService.js'
import Message from '../models/messageModel.js';



  export const register = async (req, res) => {
  try {
    const { name, email, password, tick } = req.body;

    const userData = await registerUserService({ name, email, password, tick });

    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: userData,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Internal Server Error',
    });
  }
};



export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const data = await loginUserService({ email, password });

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      data,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Internal Server Error',
    });
  }
};


export const getProfile = async (req, res) => {
  try {
    // req.user.id hume authMiddleware (protect) se milta hai
    const user = await getUserProfileService(req.user._id);

    return res.status(200).json({
      success: true,
      message: 'Profile fetched successfully',
      data: user,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Internal Server Error',
    });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const userId = req.user._id; // 👈 authMiddleware se mila hua user

    const savedMessage = await createMessageService({
      userId,
      name,
      email,
      message,
    });

    return res.status(201).json({
      success: true,
      message: 'Message sent successfully!',
      data: savedMessage,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Internal Server Error',
    });
  }
};

export const getMyMessages = async (req, res) => {
  try {
    // req.user._id authMiddleware se aayegi
    const messages = await Message.find({ userId: req.user._id }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: messages,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error fetching messages',
    });
  }
};
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Service ko call kiya
    const data = await forgotPasswordService({ email });

    // Client ko response bheja
    return res.status(200).json({
      success: true,
      message: 'Password reset link/token generated successfully',
      resetLink: data.resetLink, // Testing ke liye hum response me bhej rahe hain
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Internal Server Error',
    });
  }
};
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;     // URL se :token nikala
    const { newPassword } = req.body; // Form se naya password nikala

    const data = await resetPasswordService({ token, newPassword });

    return res.status(200).json({
      success: true,
      message: data.message,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Internal Server Error',
    });
  }
};
export const verifyAdmin = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: 'Admin access verified',
      data: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
};
export const getAllMessages = async (req, res) => {
  try {
    const messages = await getAllMessagesService();

    return res.status(200).json({
      success: true,
      message: 'All messages fetched successfully',
      data: messages,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error fetching messages',
    });
  }
};