// jshint esversion: 8
/**
 * transcript popup router module
 *
 * @module routes/popupTranscript
 */
var express = require("express");
var router = express.Router();

/**
 * GET transcript popup page
 *
 * @private
 * @memberof module:routes/popupTranscript
 * @param {Object}   req                request object
 * @param {Object}   req.user           the currently logged in user
 * @param {String}   req.user.memberID  the memberID of the logged in user
 * @param {String}   req.user.councilID the councilID of the logged in user
 * @param {Object}   res                response object
 * @param {Function} next               function call to next middleware
 */
async function routerGETTranscript(req, res, next) {
  try {
    res.render("popupTranscript", {
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
