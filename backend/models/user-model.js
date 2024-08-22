const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  phone: {
    type: Number,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
});

//* --------------
//* json web token
//* --------------

userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1d"
      }
    );
  } catch (err) {
    console.log("Token error", err);
  }
};

//* -----------------------------
//* Generate reset password token
//* -----------------------------

userSchema.methods.generateResetPasswordToken = async function() {
  const token = jwt.sign(
    {
      userId: this._id.toString(),
      email: this.email,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "1h"
    }
  );

  this.resetPasswordToken = token;
  this.resetPasswordExpires = Date.now() + (60 * 60 * 1000);
  await this.save();

  return token;
};

//* ---------------------------
//* Verify reset password token
//* ---------------------------

userSchema.statics.verifyResetPasswordToken = async function(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    return decoded;
  } catch (err) {
    return null;
  }
};


const User = new mongoose.model("user", userSchema);
module.exports = User;
