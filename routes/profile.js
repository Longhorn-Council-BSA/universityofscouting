/**
 * profile router module
 *
 * This module displays profile data.
 *
 * @module routes/profile
 */
var express = require("express");
var router = express.Router();

/**
 * GET profile information
 *
 * Display all known profile information.  At this time, that includes the username only.
 *
 * @private
 * @memberof module:routes/profile
 * @param {Object}   req                request object
 * @param {Object}   req.user           the currently logged in user
 * @param {Object}   res                response object
 * @param {Function} next               function call to next middleware
 */
function routerGETProfile(req, res, next) {
  res.render("profile", { title: "Profile Page", user: req.user });
}

// register routes and export router
router.get("/", routerGETProfile);
module.exports = router;
