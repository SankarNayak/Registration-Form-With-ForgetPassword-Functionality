// *-----------
// *Controllers
// *-----------

const User = require("../models/user-model");
const mailer = require("../mailer/mailer");

// *---------------
// *Home Page Logic
// *---------------

const home = async (req, res) => {
  try {
    res.status(200).send("Hello home page from the router side!");
  } catch (err) {
    res.status(400).send({ message: err });
  }
};

// *-------------------
// *Register Page Logic
// *-------------------

const register = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;

    if (!username || !email || !phone || !password) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(400).json({ message: "email already exists" });
    }

    const userCreated = await User.create({ username, email, phone, password });

    res.status(201).json({ message: userCreated });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// *----------------
// *Login Page Logic
// *----------------

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    if (userExist.password !== password) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    res.status(200).json({
      message: "Login successful",
      token: await userExist.generateToken(),
      userId: userExist._id.toString(),
    });
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal sever error");
  }
};

//* ----------
//* User Logic
//* ----------

const user = async (req, res) => {
  try {
    const userData = req.user;
    return res.status(200).json({ userData });
  } catch (error) {
    console.log(` error from user route ${error}`);
  }
};

//* ---------------------
//* Forgot Password Logic
//* ---------------------

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res
        .status(400)
        .json({ message: "No account with that email address exists." });
    }

    const token = await userExist.generateResetPasswordToken();

    const resetPasswordUrl = `http://localhost:5173/reset-password/${token}`;

    const mailOptions = {
      from: "your-gmail",
      to: email,
      subject: "Password Reset Request",
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
              Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n
              ${resetPasswordUrl}\n\n
              If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    mailer.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.status(500).json({ message: "Error sending email" });
      } else {
        res.status(200).json({
          message:
            "An email has been sent to " +
            email +
            " with further instructions.",
        });
      }
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again later." });
  }
};

//* --------------------
//* Reset Password Logic
//* --------------------

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    const decoded = await User.verifyResetPasswordToken(token);

    if (!decoded) {
      return res
        .status(400)
        .json({ message: "Invalid or expired password reset token." });
    }

    const userFound = await User.findById(decoded.userId);

    userFound.password = newPassword;
    userFound.resetPasswordToken = undefined;
    userFound.resetPasswordExpires = undefined;
    await userFound.save();

    res.status(200).json({ message: "Password reset successful." });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again later." });
  }
};

module.exports = { home, register, login, user, forgotPassword, resetPassword };
