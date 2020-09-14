/**
 * transcript print router module
 *
 * This module displays transcripts for logged in users in a print window
 *
 * @module routes/transcriptPrint
 */
// jshint esversion: 8
// async functions
var express = require("express");
var router = express.Router();
var modelhelper = require("../lib/modelhelper");

/**
 * GET and display all transcript entries for the logged in user.
 *
 * Display all transcript entries for the logged in user using the "transcript" view.
 *
 * @private
 * @memberof module:routes/transcriptPrint
 * @param {Object}   req                request object
 * @param {Object}   req.user           the currently logged in user
 * @param {String}   req.user.memberID  the memberID of the logged in user
 * @param {String}   req.user.councilID the councilID of the logged in user
 * @param {String}   req.query.return   when set to "csv", return CSV output
 * @param {Object}   res                response object
 * @param {Function} next               function call to next middleware
 */
async function routerGETTranscipt(req, res, next) {
  try {
    res.render("transcriptPrint", {
      transcript: await modelhelper.getRegistration({
        memberID: req.user.memberID,
        councilID: req.user.councilID
      }),
      user: req.user,
      title: "Print Transcript",
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
