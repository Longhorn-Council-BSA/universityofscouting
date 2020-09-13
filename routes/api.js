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

/**
 * GET all members.
 *
 * Return all members in either JSON or CSV format.  JSON is returned by default.  If ?return=csv is provided in the query, a CSV will be provided.
 * @private
 * @memberof module:routes/api
 * @param {Object}   req                request object
 * @param {Object}   req.user           user object to check against 'api' capability
 * @param {String}   req.query.return   when set to "csv", return CSV output
 * @param {Object}   res                response object
 * @param {Function} next               function call to next middleware
 */
async function routeGETApiMembers(req, res, next) {
  if(!cap.check(req.user, 'api')) {
    res.status(401).json({
      message: 'You do not have permission to access this API'
    })
    return;
  }

  try {
    if (req.query.return == "csv") {
      res.csv(await modelhelper.getMember());
    } else {
      res.json(await modelhelper.getMember());
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}

/**
 * GET one member.
 *
 * Return one member by ID
 * @private
 * @memberof module:routes/api
 * @param {Object}   req                request object
 * @param {Object}   req.user           user object to check against 'api' capability
 * @param {String}   req.params.id      the ID of the member to lookup
 * @param {Object}   res                response object
 * @param {Function} next               function call to next middleware
 */
async function routeGETApiMemberByID(req, res, next) {
  if(!cap.check(req.user, 'api')) {
    res.status(401).json({
      message: 'You do not have permission to access this API'
    })
    return;
  }

  try {
    res.json(await modelhelper.getMember({_id: req.params.id}));
  } catch (err) {
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
 * @param {String}   req.query.return     when set to "csv", return CSV output
 * @param {Object}   res                  response object
 * @param {Function} next                 function call to next middleware
 */
async function routeGETApiRegistrations(req, res, next) {
  if(!cap.check(req.user, 'api')) {
    res.status(401).json({
      message: 'You do not have permission to access this API'
    })
    return;
  }

  try {
    if (req.query.return == "csv") {
      res.csv(await modelhelper.getRegistration());
    } else {
      res.json(await modelhelper.getRegistration());
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
router.get("/registrations", routeGETApiRegistrations);
module.exports = router;