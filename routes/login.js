/**
 * login router module
 *
 * This module logs in a user.
 *
 * @module routes/login
 */
var express = require("express");
var router = express.Router();
var passport = require("passport");

/**
 * GET login page.
 *
 * Display the login page with the "login" view.  If a user is currently logged in, redirect to "/".
 *
 * @private
 * @memberof module:routes/login
 * @param {Object}   req                request object
 * @param {Object}   req.user           the currently logged in user
 * @param {Object}   res                response object
 * @param {Function} next               function call to next middleware
 */
function routerGETLogin(req, res, next) {
  if (req.user) {
    res.redirect("/");
  }
  res.render("login", { title: "Login", user: req.user });
}

// register routes and export router
router.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);
router.get("/", routerGETLogin);
module.exports = router;
