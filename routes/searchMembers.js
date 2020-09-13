// jshint esversion: 8
/**
 * member search router module
 *
 * This module displays profile data.
 *
 * @module routes/searchMembers
 */
var express = require("express");
var router = express.Router();
var modelhelper = require("../lib/modelhelper");

/**
 * GET member information
 *
 * Display all known registration information.
 *
 * @private
 * @memberof module:routes/searchMembers
 * @param {Object}   req                request object
 * @param {Object}   req.user           the currently logged in user
 * @param {Object}   res                response object
 * @param {Function} next               function call to next middleware
 */
async function routerGETMembers(req, res, next) {
  try {
    res.render("searchMembers", { 
      members: modelhelper.getMember(),
      user: req.user,
      title: "Administration",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}

// register routes and export router
router.get("/", routerGETMembers);
module.exports = router;
