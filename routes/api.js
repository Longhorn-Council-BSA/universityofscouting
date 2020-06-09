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
var Registrations = require("../models/registrations");

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
      res.json(await getAllTranscripts());
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}

// register routes and export router
router.get("/transcripts", routeGETApiTranscripts);
module.exports = router;
