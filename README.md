const User = require('../Model/user.model');
const bcrypt = require('bcrypt')
const ErrorResponse = require('../utils/error.response');
const profileModel = require('../Model/profile.model');


const registerUser = async (req, res, next) => {
  try {
    // Destructure and normalize email
    let { firstName, lastName, phoneNumber, email, dob } = req.body;
    email = email.toLowerCase().trim(); 
    // Check if user exists with normalized email
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return next(new ErrorResponse('User already registered', 400));
    }

    // Hash DOB and create user with normalized email
    const hashedDob = await bcrypt.hash(dob.trim(), 10);
    const newUser = await User.create({
      firstName,
      lastName,
      phoneNumber,
      email, 
      dob,
      password: hashedDob,
      isActive: true
    });

    // ... rest of the code
  } catch (error) {
    next(error);
  }
};


const loginUserByPhoneNumber = async (req, res, next) => {
  try {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
      return res.status(400).json({ message: 'Phone number is required' });
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
      return next(new ErrorResponse('Invalid phone number format', 400));
    }

    const user = await User.findOne({ where: { phoneNumber } });

    if (!user) {
      return next(new ErrorResponse('User does not exist', 400));
    }

    if (!user.isActive) {
      return res.status(200).json({
        message: 'User exists but is not active',
        data: {
          isActiveUser: user.isActive,
        },
      });
    }

    return res.status(200).json({
      message: 'User found',
      data: {
        id: user.id,
        name: user.name,
        phoneNumber: user.phoneNumber,
        email: user.email,
      },
    });

  } catch (error) {
    next(error);
  }
};

const loginByUserCred = async (req, res, next) => {
  try {
    let { email, dob } = req.body;
    email = email.toLowerCase().trim();
    dob = dob.trim();

    console.log("[DEBUG] Input Email:", email); // What's the input?
    console.log("[DEBUG] Input DOB:", dob); // What's the input DOB?

    const user = await User.findOne({ where: { email } });
    
    if (!user) {
      console.log("[DEBUG] User not found in DB");
      return next(new ErrorResponse('Invalid credentials', 401));
    }

    console.log("[DEBUG] Stored Hash:", user.password); // What's the stored hash?
    
    const isMatch = await bcrypt.compare(dob, user.password);
    console.log("[DEBUG] Bcrypt Match Result:", isMatch); // true/false?

    // ... rest of the code
  } catch (error) {
    next(error);
  }
};



module.exports = { registerUser, loginUserByPhoneNumber ,loginByUserCred };
