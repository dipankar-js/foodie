const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');

// @desc   Register user
// @route  POST /api/v1/auth/register
// @access Public
exports.register = async (req, res, next) => {
  const {name, email, password} = req.body;

  try {
    // Create user
    const user = await User.create({
      name,
      email,
      password,
    });

    sendTokenResponse(user, 200, res);
  } catch (error) {
    next(error);
  }
};

// @desc   Login user
// @route  POST /api/v1/auth/login
// @access Public
exports.login = async (req, res, next) => {
  const {email, password} = req.body;

  // Validate email and password
  if (!email || !password) {
    return next(new ErrorResponse('Please provide an email and password', 400));
  }

  // Check user
  const user = await User.findOne({email}).select('+password');

  if (!user) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  // Check if password matches
  const isMatch = await user.matchedPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  sendTokenResponse(user, 200, res);
};

// @desc   Log out user and clear cookie
// @route  GET /api/v1/auth/logout
// @access Private
exports.logout = async (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    data: {},
  });
};

// @desc   Get current loggedIn user
// @route  POST /api/v1/auth/me
// @access Private
exports.getMe = async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: user,
  });
};

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token,
  });
};
