const express = require("express");
const app = express();

// Packages
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const httpStatusCodes = require("http-status-codes");

// Error Handler
const errorHandler = require("./utils/errorHandler");
const { check, validationResult } = require("express-validator");
const logError = errorHandler.logError;

// Third-Party Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// APIs
app.post(
  "/user",
  [
    // firstName must not be empty with minimum 3 char long
    check("firstName").isLength({ min: 3 }),
    // lastName must not be empty with minimum 3 char long
    check("lastName").isLength({ min: 3 }),
  ],
  (req, res, next) => {
    const { firstName, lastName } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(httpStatusCodes.UNPROCESSABLE_ENTITY)
        .json({ errors: errors.array() });
    }

    return res
      .status(httpStatusCodes.OK)
      .json({ data: `Hello ${firstName} ${lastName}!` });
  }
);

app.get("/error", function (req, res, next) {
  try {
    res.status(httpStatusCodes.OK).json({ data: data });
  } catch (err) {
    next(err);
  }
});

// Fallback
app.get("*", function (req, res, next) {
  res
    .status(httpStatusCodes.NOT_FOUND)
    .json({ data: "The request route is not available." });
});

// Error Handling Middleware
app.use(function (err, req, res, next) {
  logError(err.message, err.stack, req);
  res
    .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
    .json({ data: "Something went wrong! Please Contect System Admin." });
});

// Start The Server
const port = process.env.PORT || 3002;
let server = app.listen(port, function (err) {
  if (err) return console.error(err);
  console.log("*****************************");
  console.log("APP IS RUNNING ON PORT : " + port);
  console.log("*****************************");
});
module.exports = server;
