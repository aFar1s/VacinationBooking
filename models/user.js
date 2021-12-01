const crypto = require("crypto");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UsersSchema = new mongoose.Schema({
    name: {
         type: String,
         required: [true, "Please enter name"],
         },

  nric: {
     type: String,
     require: [true, "Please enter NRIC"],
     unique: true,
     match: [
         /S\d\d\d\d\d\d\d[a-zA-Z]/,
         "Please enter a valid NRIC",
     ],
     select: false
    },
});

UsersSchema.pre("save", async function (next) {
  if (!this.isModified("nric")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.nric = await bcrypt.hash(this.nric, salt);
  next();
});

UsersSchema.methods.matchNric = async function (nric) {
  return await bcrypt.compare(nric, this.password);
};

UsersSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};


const Users = mongoose.model("Users", UsersSchema);

module.exports = Users;
