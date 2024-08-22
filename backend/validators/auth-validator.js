const { z } = require("zod");

const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(12, { message: "Email must be at least 12 characters" })
    .max(50, { message: "Email must be at most 50 characters" }),
  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(3, { message: "Password must be at least 3 characters" })
    .max(30, { message: "Password must be at most 30 characters" })
    .regex(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{":;'?/>.<,])(?=.*[a-zA-Z]).{8,}$/,
      {
        message:
          "Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and no spaces",
      }
    ),
});

const signupSchema = loginSchema.extend({
  username: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(7, { message: "Name must be at least 7 characters long" })
    .max(35, { message: "Username must not exceed 20 characters" })
    .regex(/^[A-Za-z ]+$/, {
      message: "Username can only contain letters",
    }),
  phone: z
    .string({ required_error: "Phone is required" })
    .trim()
    .min(10, { message: "Phone must be at least 10 characters" })
    .max(10, { message: "Phone must be at most 10 characters" }),
});

module.exports = { loginSchema, signupSchema };
