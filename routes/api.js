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

/**
 * Retrieve all members from MongoDB.
 * @private
 * @memberof module:routes/api
 * @returns an object containing all members
 */
async function getAllMembers() {
  var members = await Members.find();
  response = members.map(function (member) {
    return member.exportObject();
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
  return member.exportObject();
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
 * Retrieve all registration entries from MongoDB.
 * @private
 * @memberof module:routes/api
 * @param {Object}    opt               additional options
 * @param {Number}    opt.memberID      filter by member id
 * @memberof module:routes/api
 * @returns an object containing all transcript entries
 */
async function getAllRegistrations(opt = {}) {
  var registrations;
  if(opt.memberID){
    registrations = await Registrations.find({
      memberID: opt.memberID
    });
  } else { 
    registrations = await Registrations.find();
  }
  response_promises = registrations.map(async function (registration) {
      return registration.exportObject();
    }
  );
  return Promise.all(response_promises);
}

/**
 * GET all registration entries.
 *
 * Return all registration entries in either JSON or CSV format.  JSON is returned by default.  If ?return=csv is provided in the query, a CSV will be provided.
 * @private
 * @memberof module:routes/api
 * @param {Object}   req                  request object
 * @param {String}   req.query.return     when set to "csv", return CSV output
 * @param {String}   req.query.memberID   filter by this member ID
 * @param {Object}   res                  response object
 * @param {Function} next                 function call to next middleware
 */
async function routeGETApiRegistrations(req, res, next) {
  try {
    var registration = await getAllRegistrations({memberID: Number(req.query.memberID)});
    if (req.query.return == "csv") {
      res.csv(registration);
    } else {
      res.json(registration);
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
router.get("/transcripts", routeGETApiRegistrations);
module.exports = router;