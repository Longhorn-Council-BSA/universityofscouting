/**
 * index router module
 *
 * This module displays the index page.
 *
 * @module routes/index
 */
var express = require("express");
var router = express.Router();

/**
 * GET index page.
 *
 * Display the "index" view.
 *
 * @private
 * @memberof module:routes/index
 * @param {Object}   req                request object
 * @param {Object}   req.user           the currently logged in user
 * @param {Object}   res                response object
 * @param {Function} next               function call to next middleware
 */
function routerGETIndex(req, res, next) {
  res.render("index", { title: "Home", user: req.user });
}

// register routes and export router
router.get("/", routerGETIndex);
module.exports = router;
