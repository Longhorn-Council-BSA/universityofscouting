/**
 * local authentication module
 *
 * This module performs authentication of users against mongodb
 *
 * @module lib/localauthentication
 */
// jshint esversion: 8
// async functions
var Members = require("../models/members");

/**
 * authenticate users with a username and password.
 *
 * Accept a memberID as a username, and case-sensitive lastName as a
 * password.
 *
 * When authentication is sucessful, a user object is passed to the done
 * function, which represents the logged in user.  The object contains
 * all known properties.
 *
 * @private
 * @memberof module:lib/localauthentication
 * @param {String}   username   username to compare
 * @param {String}   password   password to compare
 * @param {Function} done       the function to call upon completion
 */
async function localAuthentication(username, password, done) {
  // reject empty or false usernames and passwords
  if (!username || !password) {
    return done(null, false, { message: "Invalid credentials." });
  }

  try {
    // match against memberID and last name, case sensitive
    var member = await Members.findOne({
      memberID: username,
      lastName: password,
    });

    if (member) {
      return done(null, {
        _id: member._id.toString(),
        memberID: member.memberID.toString(),
        councilID: member.councilID.toString(),
        firstName: member.firstName,
        lastName: member.lastName,
        access: member.access,
        fullNameFL: member.fullNameFL,
        fullNameLF: member.fullNameLF,
        councilName: member.councilName,
      });
    }
  } catch (err) {
    console.log(err);
  }

  // fail authenticaion if no matches are found
  return done(null, false, { message: "Invalid credentials." });
}

module.exports = localAuthentication;
