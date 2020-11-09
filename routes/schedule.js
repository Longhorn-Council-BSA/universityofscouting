// jshint esversion: 8
/**
 * schedule router module
 *
 * This module displays profile data.
 *
 * @module routes/schedule
 */
var express = require("express");
var router = express.Router();
var modelhelper = require("../lib/modelhelper");
var config = require("../config/settings");

/**
 * GET schedule page
 *
 * @private
 * @memberof module:routes/schedule
 * @param {Object}   req                request object
 * @param {Object}   req.user           the currently logged in user
 * @param {String}   req.user.memberID  the memberID of the logged in user
 * @param {String}   req.user.councilID the councilID of the logged in user
 * @param {Object}   res                response object
 * @param {Function} next               function call to next middleware
 */
async function routerGETSchedules(req, res, next) {
  try {
    res.render("schedule", { 
      earliest: config.earliest,
      user: req.user,
      title: "Schedule",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}

// register routes and export router
router.get("/", routerGETSchedules);
module.exports = router;
