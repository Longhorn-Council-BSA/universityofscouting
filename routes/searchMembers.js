// jshint esversion: 8
/**
 * profile router module
 *
 * This module displays profile data.
 *
 * @module routes/searchMembers
 */
var express = require("express");
var router = express.Router();
var Members = require("../models/members");

/**
 * Retrieve all member entries from MongoDB.
 *
 * @private
 * @memberof module:routes/searchMembers
 * @param {String} memberId the memberID of the user to find records for
 * @returns an object containing schedule entries
 */
async function getMembers() {
  var members = await Members.find();
  response = members.map((member) => {
    return member.exportObject();
  });
  return response;
}

/**
 * GET profile information
 *
 * Display all known registration information.
 *
 * @private
 * @memberof module:routes/searchMembers
 * @param {Object}   req                request object
 * @param {Object}   req.user           the currently logged in user
 * @param {Object}   res                response object
 * @param {Function} next               function call to next middleware
 */
async function routerGETMembers(req, res, next) {
  try {
    var members = await getMembers();
    res.render("searchMembers", { 
      members: members,
      user: req.user,
      title: "Administration",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}

// register routes and export router
router.get("/", routerGETMembers);
module.exports = router;
