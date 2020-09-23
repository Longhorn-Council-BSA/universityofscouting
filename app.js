/**
 * app module
 *
 * The University of Scouting application allows users to view their transcript data.  See README.md for more details.
 *
 * @module app
 */

// pull in environment variables from .env
// DATABASE_URL - mongodb connection string
require("dotenv").config();

// require modules
var mongoose = require("mongoose");
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var ensureLogin = require("connect-ensure-login");
var csv = require("express-csv");
var bodyParser = require('body-parser');

// initialize app
var app = express();

// database setup
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
var db = mongoose.connection;
db.on("error", function (error) {
  console.error(error);
});
db.once("open", function () {
  console.log("connected to database");
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");



// logging middleware
app.use(require("morgan")("dev"));

// static files middleware
app.use(express.static(path.join(__dirname, "public")));

// encoding and session middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require("express-session")({ secret: process.env.SESSION_SECRET }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// passport authentication session setup
passport.serializeUser(require("./lib/serializeuser"));
passport.deserializeUser(require("./lib/deserializeuser"));
passport.use(new LocalStrategy(require('./lib/localauthentication')));
app.use(passport.initialize());
app.use(passport.session());

// flass message middleware
app.use(require("connect-flash")());

// routes registered as middleware
// each module provides sub-routes beneath the path specified
app.use("/", require("./routes/index"));
app.use("/login", require("./routes/login"));
app.use("/logout", require("./routes/logout"));
app.use("/profile", ensureLogin.ensureLoggedIn(), require("./routes/profile"));
app.use("/schedule", ensureLogin.ensureLoggedIn(), require("./routes/schedule"));
app.use("/transcript", ensureLogin.ensureLoggedIn(), require("./routes/transcript"));
app.use("/searchMembers", ensureLogin.ensureLoggedIn(), require("./routes/searchMembers"));
app.use("/api", ensureLogin.ensureLoggedIn(), require("./routes/api"));
// Secondary pages
app.use("/howtoprinttopdf", ensureLogin.ensureLoggedIn(), require("./routes/howtoprinttopdf"));
app.use("/transcriptPrint", ensureLogin.ensureLoggedIn(), require("./routes/transcriptPrint"));
app.use("/popupSchedule", ensureLogin.ensureLoggedIn(), require("./routes/popupSchedule"));
app.use("/popupTranscript", ensureLogin.ensureLoggedIn(), require("./routes/popupTranscript"));
app.use("/schedulePrint", ensureLogin.ensureLoggedIn(), require("./routes/schedulePrint"));

/**
 * catch and generate 404 errors.
 *
 * Catch any yet unhandled routes and generate a 404 error to be handled by the errorHandler function.
 *
 * @private
 * @memberof module:app
 * @param {Object}   req                request object
 * @param {Object}   res                response object
 * @param {Function} next               function call to next middleware
 */
function notFoundHandler(req, res, next) {
  next(createError(404));
}
app.use(notFoundHandler);

/**
 * handle final errors.
 *
 * Display errors using the "error" view.
 *
 * @private
 * @memberof module:app
 * @param {Object}   err                error object
 * @param {Object}   req                request object
 * @param {Object}   res                response object
 * @param {Function} next               function call to next middleware
 */
function errorHandler(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
}
app.use(errorHandler);

module.exports = app;
