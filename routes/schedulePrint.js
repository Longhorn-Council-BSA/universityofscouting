/**
 * schedule router module
 *
 * This module displays schedules for logged in users in a print window
 *
 * @module routes/schedulePrint
 */
// jshint esversion: 8
// async functions
var express = require("express");
var router = express.Router();
var modelhelper = require("../lib/modelhelper");

/**
 * GET schedule print page
 *
 * @private
 * @memberof module:routes/schedulePrint
 * @param {Object}   req                request object
 * @param {Object}   req.user           the currently logged in user
 * @param {String}   req.user.memberID  the memberID of the logged in user
 * @param {String}   req.user.councilID the councilID of the logged in user
 * @param {Object}   res                response object
 * @param {Function} next               function call to next middleware
 */
async function routerGETSchedule(req, res, next) {
  try {
    res.render("schedulePrint", {
      schedule: await modelhelper.getRegistration({
        memberID: req.user.memberID,
        councilID: req.user.councilID
      }),
      user: req.user,
      title: "Print Schedule",
    });
  } catch (err) {
    res.status(500).json({message: err.message});
  }
}

// register routes and export router
router.get("/", routerGETSchedule);
module.exports = router;
