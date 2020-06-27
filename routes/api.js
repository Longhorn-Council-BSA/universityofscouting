/**
 * api router module
 *
 * This module allows for programatic download of transcript data.
 *
 * @module routes/api
 */
// jshint esversion: 8
// async functions
var express = require("express");
var router = express.Router();
var Members = require("../models/members");
var Registrations = require("../models/registrations");
var Schedules = require("../models/schedules");

/**
 * Retrieve all members from MongoDB.
 * @private
 * @memberof module:routes/api
 * @returns an object containing all members
 */
async function getAllMembers() {
  var members = await Members.find();
  response = members.map(function (entry) {
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
 * GET all members.
 *
 * Return all members in either JSON or CSV format.  JSON is returned by default.  If ?return=csv is provided in the query, a CSV will be provided.
 * @private
 * @memberof module:routes/api
 * @param {Object}   req                request object
 * @param {String}   req.query.return   when set to "csv", return CSV output
 * @param {Object}   res                response object
 * @param {Function} next               function call to next middleware
 */
async function routeGETApiMembers(req, res, next) {
  try {
    var members = await getAllMembers();
    if (req.query.return == "csv") {
      res.csv(members);
    } else {
      res.json(members);
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
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

/**
 * GET one member.
 *
 * Return one member by ID
 * @private
 * @memberof module:routes/api
 * @param {Object}   req                request object
 * @param {String}   req.params.id      the ID of the member to lookup
 * @param {Object}   res                response object
 * @param {Function} next               function call to next middleware
 */
async function routeGETApiMemberByID(req, res, next) {
  try {
    var member = await getMemberByID(Number(req.params.id));
    res.json(member);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}

/**
 * Retrieve all transcript entries from MongoDB.
 * @private
 * @memberof module:routes/api
 * @returns an object containing all transcript entries
 */
async function getAllTranscripts() {
  var transcript = await Registrations.find();
  response = transcript.map(function (entry) {
    return {
      _id: entry._id.toString(),
      memberID: entry.memberID.toString(),
      title: entry.title,
      credits: entry.credits,
      status: entry.status,
    };
  });
  return response;
}

/**
 * GET all transcript entries.
 *
 * Return all transcript entries in either JSON or CSV format.  JSON is returned by default.  If ?return=csv is provided in the query, a CSV will be provided.
 * @private
 * @memberof module:routes/api
 * @param {Object}   req                request object
 * @param {String}   req.query.return   when set to "csv", return CSV output
 * @param {Object}   res                response object
 * @param {Function} next               function call to next middleware
 */
async function routeGETApiTranscripts(req, res, next) {
  try {
    var transcript = await getAllTranscripts();
    if (req.query.return == "csv") {
      res.csv(transcript);
    } else {
      res.json(transcript);
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}

/**
 * Retrieve all transcript entries from MongoDB.
 * @private
 * @memberof module:routes/api
 * @param {Object}    opt               additional options
 * @param {Boolean}   opt.memberData    include member data in reponse (default: false)
 * @param {Number}    opt.memberID      filter by member id
 * @returns an object containing all transcript entries
 */
async function getSchedule(opt = {}) {
  var memberData = false;
  if(opt.memberData){
    memberData = true;
  }
  var members = {};
  var schedule;
  if(opt.memberID){
      schedule = await Schedules.find({
      memberID: opt.memberID
    });
  }else{
    schedule = await Schedules.find();
  }
  response_promises = schedule.map( async function(entry) {
    if(!members[entry.memberID]){
      members[entry.memberID] = await getMemberByID(Number(entry.memberID));
    }
    var date = entry.date;
    var time = entry.date.toLocaleTimeString();
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();
    date = mm + '/' + dd + '/' + yyyy;
    return {
      _id: entry._id.toString(),
      memberID: entry.memberID.toString(),
      firstName: members[entry.memberID].firstName,
      lastName: members[entry.memberID].lastName,
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
 * GET all schedule entries.
 *
 * Return all schedule entries in either JSON or CSV format.  JSON is returned by default.  If ?return=csv is provided in the query, a CSV will be provided.  If ?memberdata=true then member profile info will be returned as a part of the response.
 * @private
 * @memberof module:routes/api
 * @param {Object}   req                  request object
 * @param {String}   req.query.return     when set to "csv", return CSV output
 * @param {String}   req.query.memberID   filter by this member ID
 * @param {String}   req.query.memberData when set to "true" return memberData in the response
 * @param {Object}   res                  response object
 * @param {Function} next                 function call to next middleware
 */
async function routeGETApiSchedules(req, res, next) {
  var memberData = false;
  if(req.query.memberData == "true"){
    memberData = true;
  }
  try {
    var schedule = await getSchedule({memberData: memberData, memberID: Number(req.query.memberID)});
    if (req.query.return == "csv") {
      res.csv(schedule);
    } else {
      res.json(schedule);
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}

// register routes and export router
router.get("/members", routeGETApiMembers);
router.get("/members/:id", routeGETApiMemberByID);
router.get("/transcripts", routeGETApiTranscripts);
router.get("/schedules", routeGETApiSchedules);
module.exports = router;
