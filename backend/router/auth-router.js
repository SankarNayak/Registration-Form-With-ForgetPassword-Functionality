const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth-controller");
const validate = require("../middlewares/validate-middleware");
const { loginSchema, signupSchema } = require("../validators/auth-validator");

router.route("/").get(authControllers.home);
router.route("/register").post(validate(signupSchema), authControllers.register);
router.route("/login").post(validate(loginSchema), authControllers.login);
router.route("/forgot-password").post(authControllers.forgotPassword);
router.route("/reset-password/:token").post(authControllers.resetPassword);

module.exports = router;