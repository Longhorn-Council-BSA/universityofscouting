// jshint esversion: 8
/**
 * profile router module
 *
 * This module displays profile data.
 *
 * @module routes/schedule
 */
var express = require("express");
var router = express.Router();
var Schedules = require("../models/schedules");

/**
 * Retrieve all schedules entries from MongoDB for a single user.
 *
 * @private
 * @memberof module:routes/schedule
 * @param {String} memberId the memberID of the user to find records for
 * @returns an object containing schedule entries
 */
async function getUserSchedule(memberID) {
  var schedule = await Schedules.find({
    memberID: memberID,
  });
  response = schedule.map((entry) => {
    var date = entry.date;
    var time = entry.date.toLocaleTimeString();
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();
    date = mm + '/' + dd + '/' + yyyy;
    return {
      _id: entry._id.toString(),
      memberID: entry.memberID.toString(),
      time: time,
      date: date,
      course: entry.course,
      instructor: entry.instructor,
      location: entry.location,
      delivery: entry.delivery,
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
    var schedule = await getUserSchedule(req.user.memberID);
    res.render("Schedule", { 
      schedule: schedule,
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
