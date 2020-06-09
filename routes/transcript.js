/**
 * transcript router module
 *
 * This module displays transcripts for logged in users
 *
 * @module routes/transcript
 */
// jshint esversion: 8
// async functions
var express = require("express");
var router = express.Router();
var Registrations = require("../models/registrations");

/**
 * Retrieve all transcript entries from MongoDB for a single user.
 *
 * @private
 * @memberof module:routes/transcript
 * @param {String} memberId the memberID of the user to find records for
 * @returns an object containing transcript entries
 */
async function getUserTranscript(memberID) {
  var transcript = await Registrations.find({
    memberID: memberID,
  });
  response = transcript.map((entry) => {
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
 * GET and display all transcript entries for the logged in user.
 *
 * Display all transcript entries for the logged in user using the "transcript" view.
 *
 * @private
 * @memberof module:routes/transcript
 * @param {Object}   req                request object
 * @param {Object}   req.user           the currently logged in user
 * @param {String}   req.user.username  the username/memberID of the logged in user
 * @param {String}   req.query.return   when set to "csv", return CSV output
 * @param {Object}   res                response object
 * @param {Function} next               function call to next middleware
 */
async function routerGETTranscipt(req, res, next) {
  try {
    var transcript = await getUserTranscript(req.user.username);
    res.render("transcript", {
      transcript: transcript,
      user: req.user,
      title: "Transcript Page",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}

// register routes and export router
router.get("/", routerGETTranscipt);
module.exports = router;
