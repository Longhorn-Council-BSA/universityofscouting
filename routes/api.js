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
var modelhelper = require("../lib/modelhelper");
var cap = require("../lib/capabilities");
var log = require("../lib/log");

/**
 * GET all members.
 *
 * Return all members in either JSON or CSV format.  JSON is returned by default.
 * If ?return=csv is provided in the query, a CSV will be provided.
 *
 * If the calling route provides req._id, then limit responses to just that
 * member, by _id.
 *
 * @private
 * @memberof module:routes/api
 * @param {Object}   req                request object
 * @param {Object}   req.user           user object to check against 'api' capability
 * @param {String}   req.params.id      limit to responses to a single member by _id
 * @param {String}   req.query.return   when set to "csv", return CSV output
 * @param {Object}   res                response object
 * @param {Function} next               function call to next middleware
 */
async function routeGETApiMembers(req, res, next) {
  log("routeGETApiMembers()");
  if (!cap.check(req.user, "api")) {
    log("routeGETApiMembers: denied: " + req.user.access);
    res.status(401).json({
      message: "You do not have permission to access this API",
    });
    return;
  }

  // query by _id if provided
  var q = {};
  if ("id" in req.params) {
    log("routeGETApiMembers: id: " + req.params.id);
    q._id = req.params.id;
  }

  //if no id filtering queries were provided and
  //if apiList access is not allowed, deny
  if(!('_id' in q) && !cap.check(req.user, "apiList")) {
    log("routeGETApiMembers: list denied: " + req.user.access);
    res.status(401).json({
      message: "You do not have permission to access this API",
    });
    return;
  }

  try {
    if (req.query.return == "csv") {
      log("routeGETApiMembers: return csv");
      res.csv(await modelhelper.getMember(q));
    } else {
      log("routeGETApiMembers: return");
      res.json(await modelhelper.getMember(q));
    }
  } catch (err) {
    log("routeGETApiMembers: error");
    res.status(500).json({
      message: err.message,
    });
  }
}

/**
 * GET all registration entries.
 *
 * Return all registration entries in either JSON or CSV format.  JSON is returned by default.
 * If ?return=csv is provided in the query, a CSV will be provided.
 * @private
 * @memberof module:routes/api
 * @param {Object}   req                  request object
 * @param {Object}   req.user             user object to check against 'api' capability
 * @param {Date}     req.query.earliest   filters so that no objects are returned older than this time
 * @param {String}   req.query.return     when set to "csv", return CSV output
 * @param {Object}   res                  response object
 * @param {Function} next                 function call to next middleware
 */
async function routeGETApiRegistrations(req, res, next) {
  log("routeGETApiRegistrations()");
  //if api access is not allowed, deny
  if (!cap.check(req.user, "api")) {
    log("routeGETApiRegistrations: denied: " + req.user.access);
    res.status(401).json({
      message: "You do not have permission to access this API",
    });
    return;
  }

  // query by _id if provided
  var q = {};
  if ("id" in req.params) {
    log("routeGETApiRegistrations: id: " + req.params.id);
    q._id = req.params.id;

    // query by member_id if provided
  } else if ("memberid" in req.params) {
    log("routeGETApiRegistrations: memberid: " + req.params.memberid);
    q.member_id = req.params.memberid;
  }

  // query by earliest if provided
  if ("earliest" in req.query) {
    log("routeGETApiRegistrations: earliest: " + req.query.earliest);
    q.earliest = req.query.earliest;
  }

  //if no member or id filtering queries were provided and
  //if apiList access is not allowed, deny
  if(!('_id' in q || 'member_id' in q) && !cap.check(req.user, "apiList")) {
    log("routeGETApiRegistrations: list denied: " + req.user.access);
    res.status(401).json({
      message: "You do not have permission to access this API",
    });
    return;
  }

  try {
    if (req.query.return == "csv") {
      log("routeGETApiRegistrations: return csv");
      res.csv(await modelhelper.getRegistration(q));
    } else {
      log("routeGETApiRegistrations: return");
      res.json(await modelhelper.getRegistration(q));
    }
  } catch (err) {
    log("routeGETApiRegistrations: error");
    res.status(500).json({
      message: err.message,
    });
  }
}

// register routes and export router
router.get("/members", routeGETApiMembers);
router.get("/members/:memberid/registrations", routeGETApiRegistrations);
router.get("/members/:id", routeGETApiMembers);
router.get("/registrations", routeGETApiRegistrations);
router.get("/registrations/:id", routeGETApiRegistrations);
module.exports = router;
