// jshint esversion: 8
/**
 * profile router module
 *
 * This module displays profile data.
 *
 * @module routes/searchMembers
 */
var express = require("express");
var router = express.Router();
var members = require("../models/members");

/**
 * Retrieve all schedules entries from MongoDB for a single user.
 *
 * @private
 * @memberof module:routes/searchMembers
 * @param {String} memberId the memberID of the user to find records for
 * @returns an object containing schedule entries
 */
async function getMembers() {
  var member = await members.find();
  response = member.map((entry) => {
    return {
      _id: entry._id.toString(),
      memberID: entry.memberID.toString(),
      firstName: entry.firstName,
      lastName: entry.lastName,
      council: entry.council,
      access: entry.access
    };
  });
  return response;
}

/**
 * GET profile information
 *
 * Display all known profile information.  At this time, that includes the username only.
 *
 * @private
 * @memberof module:routes/searchMembers
 * @param {Object}   req                request object
 * @param {Object}   req.user           the currently logged in user
 * @param {String}   req.user.memberID  the memberID of the logged in user
 * @param {String}   req.query.return   when set to "csv", return CSV output
 * @param {Object}   res                response object
 * @param {Function} next               function call to next middleware
 */
async function routerGETMembers(req, res, next) {
  try {
    var schedule = await getMembers(req.user.memberID);
    res.render("searchMembers", { 
      schedule: schedule,
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
