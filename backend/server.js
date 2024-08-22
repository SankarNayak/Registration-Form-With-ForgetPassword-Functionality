//! This line should be at the top of our code
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT;
const authRoute = require("./router/auth-router");
const connectDb = require("./utils/database");
const errorMiddleware = require("./middlewares/error-middleware");

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/auth", authRoute);

app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.status(200).send("Hello home page from the server side!");
});

app.get("/register", (req, res) => {
  res.status(200).send("Hello register page from the server side!");
});

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
  });
});
