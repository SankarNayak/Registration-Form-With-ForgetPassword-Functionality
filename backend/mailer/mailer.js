const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.YOUR_MAIL,
    pass: process.env.PASS_KEY,
  },
});

module.exports = transporter;
