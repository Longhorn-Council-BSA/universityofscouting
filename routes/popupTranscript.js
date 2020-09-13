// jshint esversion: 8
/**
 * profile router module
 *
 * This module displays profile data.
 *
 * @module routes/popupTranscript
 */
var express = require("express");
var router = express.Router();
var modelhelper = require("../lib/modelhelper");

/**
 * GET profile information
 *
 * Display all known profile information.  At this time, that includes the username only.
 *
 * @private
 * @memberof module:routes/popupTranscript
 * @param {Object}   req                request object
 * @param {Object}   req.user           the currently logged in user
 * @param {String}   req.user.memberID  the memberID of the logged in user
 * @param {String}   req.user.councilID the councilID of the logged in user
 * @param {String}   req.query.return   when set to "csv", return CSV output
 * @param {Object}   res                response object
 * @param {Function} next               function call to next middleware
 */
async function routerGETTranscript(req, res, next) {
  try {
    res.render("popupTranscript", { 
      transcript: await modelhelper.getRegistration({
        memberID: req.user.memberID,
        councilID: req.user.councilID
      }),
      user: req.user,
      title: "Member Popup Transcript",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}

// register routes and export router
router.get("/", routerGETTranscript);
module.exports = router;
