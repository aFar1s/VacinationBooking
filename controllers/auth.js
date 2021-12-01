const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const ErrorResponse = require("../utility/errorResponse")
const User = require("../models/user");
const Bookings = require("../models/bookings");



// Register new user. Create new booking document
router.post("/registerUser", async (req, res, next) => {
    const { name, nric } = req.body;
  
    try {
      // Create User
      const user = await User.create({
        name,
        nric,
      });
  
      // Create Booking Document
      const bookings = new Bookings({ owner: user._id });
      await dashboard.save();
    
      sendToken(user, 200, res);
      console.log([ user, bookings ]);
    } catch (err) {
      next(err);
    }
  });


//================================================================
//================================================================
//================================================================




  // Login
router.post("/login", async (req, res, next) => {
    const { name, nric } = req.body;

  // Check if email and password is provided
  if (!name || !nric) {
    return next(new ErrorResponse("Please provide an Name and NRIC", 400));
  }

  try {
    // Check that user exists by email
    const user = await User.findOne({ name }).select("+nric");
    console.log(user._id);

    if (!user) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    // Check that NRIC match
    const isMatch = await user.matchNric(nric);

    if (!isMatch) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    sendToken(user, 200, res);
  } catch (err) {
    next(err);
  }
})
  
  const sendToken = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();
    res.status(statusCode).json({ sucess: true, token, user: user._id });
  }; 

module.exports = router;
