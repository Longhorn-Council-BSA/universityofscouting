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

/**
 * authenticate users with a username and password.
 *
 * Accept any username and password combination presented, as long as it is nor empty or false.  This is a shim to allow continued development while an authentication strategy is being determined.
 *
 * When authentication is sucessful, a user object is passed to the done function, which represents the logged in user.
 *
 * @private
 * @memberof module:app
 * @param {String}   username   username to compare
 * @param {String}   password   password to compare
 * @param {Function} done       the function to call upon completion
 */
function localAuthentication(username, password, done) {
  // reject empty or false usernames and passwords
  if (!username || !password) {
    return done(null, false, { message: "Invalid credentials." });
  }

  // while developing, accept any username
  if (app.get("env") == "development") {
    return done(null, {
      username: username,
    });
  }

  // not implemented

  return done(null, false, { message: "Invalid credentials." });
}
passport.use(new LocalStrategy(localAuthentication));

/**
 * serialize a logged in user for storage in the session.
 *
 * Extract the username from a user object, and pass that value to the done function.  This value will be the piece of data stored in the session.
 *
 * @private
 * @memberof module:app
 * @param {Object}   user            user object
 * @param {String}   user.username   unique username of the user
 * @param {Function} done            the function to call upon completion
 */
function serializeUser(user, done) {
  done(null, user.username);
}
passport.serializeUser(serializeUser);

/**
 * deserialize a logged in user from session storage and reconstruct a user object.
 *
 * Take a user id (which is the same as a username), and use that information to reconstruct a user object.  Since a user object ONLY contains a username, this results in an object with one property... username.  This function could become more complex, requiring database lookups if user objects begin to store more information.
 *
 * @private
 * @memberof module:app
 * @param {String}   id              a username
 * @param {Function} done            the function to call upon completion
 */
function deserializeUser(id, done) {
  done(null, {
    username: id,
  });
}
passport.deserializeUser(deserializeUser);

// middleware
app.use(require("morgan")("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(require("express-session")({ secret: process.env.SESSION_SECRET }));
app.use(express.static(path.join(__dirname, "public")));
app.use(passport.initialize());
app.use(passport.session());

// routes registered as middleware
// each module provides sub-routes beneath the path specified
app.use("/", require("./routes/index"));
app.use("/login", require("./routes/login"));
app.use("/logout", require("./routes/logout"));
app.use("/profile", ensureLogin.ensureLoggedIn(), require("./routes/profile"));
app.use(
  "/transcript",
  ensureLogin.ensureLoggedIn(),
  require("./routes/transcript")
);
app.use("/api", ensureLogin.ensureLoggedIn(), require("./routes/api"));

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
