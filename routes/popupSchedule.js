// jshint esversion: 8
// async functions
/**
 * schedule popup router module
 *
 * @module routes/popupSchedule
 */
var express = require("express");
var router = express.Router();

/**
 * GET schedule popup page
 *
 * @private
 * @memberof module:routes/popupSchedule
 * @param {Object}   req                request object
 * @param {Object}   req.user           the currently logged in user
 * @param {String}   req.user.memberID  the memberID of the logged in user
 * @param {String}   req.user.councilID the councilID of the logged in user
 * @param {Object}   res                response object
 * @param {Function} next               function call to next middleware
 */
async function routerGETSchedules(req, res, next) {
  try {
    res.render("popupSchedule", {
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
