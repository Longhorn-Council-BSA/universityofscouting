/**
 * schedule router module
 *
 * This module displays schedules for logged in users
 *
 * @module routes/schedulePrint
 */
// jshint esversion: 8
// async functions
var express = require("express");
var router = express.Router();
var Schedules = require("../models/schedules");

/**
 * Retrieve a schedule from MongoDB.
 * @private
 * @memberof module:routes/api
 * @param {Number}    memberID      filter by member id
 * @returns an object containing schedule entries
 */

async function getUserSchedule(memberID) {
  var members = {};
  var schedule;
  if(memberID){
      schedule = await Schedules.find({memberID: memberID});
  }else{
    schedule = await Schedules.find();
  }
  response_promises = schedule.map( async function(entry) {
    if(!members[entry.memberID]){
      members[entry.memberID] = await getMemberByID(Number(entry.memberID));
    }
    var date = entry.date;
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();
    date = dd+'/'+mm+'/'+yyyy;
    var time = entry.date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    return {
      _id: entry._id.toString(),
      memberID: entry.memberID.toString(),
      firstName: members[entry.memberID].firstName,
      lastName: members[entry.memberID].lastName,
      timestamp: entry.date,
      time: time,
      date: date,
      course: entry.course,
      instructor: entry.instructor,
      location: entry.location,
      delivery: entry.delivery,
    };
  });
  return Promise.all(response_promises);
}

/**
 * Retrieve single member by ID from MongoDB.
 * @private
 * @memberof module:routes/api
 * @param {Number}   id                 the ID of the member to lookup
 * @returns an object containing one member
 */
async function getMemberByID(id) {
  var member = await Members.findOne({
    memberID: id
  });
  return {
    _id: member._id.toString(),
    memberID: member.memberID.toString(),
    firstName: member.firstName,
    lastName: member.lastName,
    council: member.council,
    access: member.access
  };
}

async function routerGETSchedule(req, res, next) {
  try {
    var schedule = await getUserSchedule(req.user.memberID);
    res.render("schedulePrint", {
      schedule: schedule,
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
