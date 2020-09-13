// jshint esversion: 8
// async functions
/**
 * profile router module
 *
 * This module displays profile data.
 *
 * @module routes/popupSchedule
 */
var express = require("express");
var router = express.Router();
var modelhelper = require("../lib/modelhelper");

/**
 * GET profile information
 *
 * Display all known profile information.  At this time, that includes the username only.
 *
 * @private
 * @memberof module:routes/schedule
 * @param {Object}   req                request object
 * @param {Object}   req.user           the currently logged in user
 * @param {String}   req.user.memberID  the memberID of the logged in user
 * @param {String}   req.query.return   when set to "csv", return CSV output
 * @param {Object}   res                response object
 * @param {Function} next               function call to next middleware
 */
async function routerGETSchedules(req, res, next) {
  try {
    res.render("popupSchedule", { 
      schedule: await modelhelper.getRegistration({
        memberID: req.user.memberID,
        councilID: req.user.councilID
      }),
      user: req.user,
      title: "Member Popup Schedule",
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
