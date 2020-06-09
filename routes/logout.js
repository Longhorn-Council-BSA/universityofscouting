/**
 * logout router module
 *
 * This module logs out a user.
 *
 * @module routes/logout
 */
var express = require("express");
var router = express.Router();

/**
 * GET logout page.
 *
 * Destroys the user object by calling req.logout().  This logs the user out.  Then redirect to "/".
 *
 * @private
 * @memberof module:routes/logout
 * @param {Object}   req                request object
 * @param {Object}   res                response object
 * @param {Function} next               function call to next middleware
 */
function routerGETLogout(req, res, next) {
  req.logout();
  res.redirect("/");
}

// register routes and export router
router.get("/", routerGETLogout);
module.exports = router;
