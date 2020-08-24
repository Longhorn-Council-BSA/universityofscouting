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
var Schedules = require("../models/registrations");

/**
 * Retrieve a schedule from MongoDB.
 * @private
 * @memberof module:routes/schedulePrint
 * @param {Number}    memberID      filter by member id
 * @returns an object containing schedule entries
 */

async function getUserSchedule(memberID) {
  var registrations;
  if(memberID){
    registrations = await Schedules.find({memberID: memberID});
  }else{
    registrations = await Schedules.find();
  }
  response_promises = registrations.map( async function(registration) {
    return registration.exportObject();
  });
  return Promise.all(response_promises);
}

async function routerGETSchedule(req, res, next) {
  try {
    var registrations = await getUserSchedule(req.user.memberID);
    res.render("schedulePrint", {
      schedule: registrations,
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
