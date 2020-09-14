/**
 * how to print to pdf router module
 *
 * This module displays profile data.
 *
 * @module routes/howtoprinttopdf
 */
var express = require("express");
var router = express.Router();

/**
 * GET how to print to pdf
 *
 * Display documentation on how to print to pdf on different browsers
 *
 * @private
 * @memberof module:routes/howtoprinttopdf
 */
function routerGETProfile(req, res, next) {
  res.render("howtoprinttopdf", { title: "Print to PDF Guide", user: req.user });
}

// register routes and export router
router.get("/", routerGETProfile);
module.exports = router;
