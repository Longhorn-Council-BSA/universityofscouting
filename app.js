// pull in environment variables from .env
// DATABASE_URL - mongodb connection string
require("dotenv").config();

// require modules
var mongoose = require("mongoose");
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var logger = require("morgan");
var csv = require("express-csv");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var ensureLogin = require("connect-ensure-login");

// require routes
var indexRouter = require("./routes/index");
var loginRouter = require("./routes/login");
var logoutRouter = require("./routes/logout");
var profileRouter = require("./routes/profile");
var transcriptRouter = require("./routes/transcript");
var apiTranscriptsRouter = require("./routes/apitranscripts");

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

// authentication setup
passport.use(
  new LocalStrategy(function (username, password, done) {
    if (app.get("env") == "development") {
      return done(null, {
        username: username,
      });
    }
    // not implemented
    return done(null, false, { message: "Invalid credentials." });
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.username);
});

passport.deserializeUser(function (id, done) {
  done(null, {
    username: id,
  });
});

// middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(session({ secret: process.envSESSION_SECRET }));
app.use(express.static(path.join(__dirname, "public")));
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use("/", indexRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/profile", ensureLogin.ensureLoggedIn(), profileRouter);
app.use("/transcript", ensureLogin.ensureLoggedIn(), transcriptRouter);
app.use("/api/transcripts", ensureLogin.ensureLoggedIn(), apiTranscriptsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
