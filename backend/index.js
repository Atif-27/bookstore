const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const { PORT, mongoDBURL } = process.env;
const Book = require("./models/bookModel");
const booksRoute = require("./routes/booksRoute");
const cors = require("cors");
//! Middleware for parsing request body
app.use(express.json());
// ! Middleware to handle express router
app.use("/books", booksRoute);
// ! Middleware to handle cors policy
// * Option 1: Allow all origins with default of cors(*)
app.use(cors());
// * Option 2: Allow custom origins
// app.use(
//   cors({
//     origin: "https://localhost:5173",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-type"],
//   })
// );
// app.use(
//   cors({
//     origin: "http://localhost:5173", // Update with your React app's origin
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"], // Corrected header name
//   })
// );
app.options("*", cors());
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`Listening to port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
