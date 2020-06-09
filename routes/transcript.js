// jshint esversion: 8
// async functions
var express = require("express");
var router = express.Router();
var Transcripts = require("../models/transcriptentries");

/**
 * Retrieve all transcript entries from MongoDB.
 */
async function getUserTranscript(memberID) {
  var transcript = await TranscriptEntries.find({
    memberID: memberID,
  });
  response = transcript.map((entry) => {
    return {
      _id: entry._id.toString(),
      memberID: entry.memberID.toString(),
      courseNumber: entry.courseNumber,
      courseName: entry.courseName,
      status: entry.status,
    };
  });
  return response;
}

/**
 * GET and display all transcript entries for this user.
 */
router.get("/", async function (req, res, next) {
  try {
    var transcript = await getUserTranscript(req.user.username);
    res.render("transcript", { transcript: transcript, user: req.user ,title: "Transcript Page"});
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;
