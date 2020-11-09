/**
 * model helper module
 *
 * This module contains helper functions for interacting with models
 *
 * @module lib/modelhelper
 */
// jshint.unstable bigint: true
// jshint esversion: 8
var moment = require("moment-timezone");
var settings = require("../config/settings");
var Members = require("../models/members");
var Registrations = require("../models/registrations");
var log = require("../lib/log");

/**
 * export one or more members
 *
 * When none of _id, memberID, or councilID are specified,
 * this function will return an ARRAY of all members in the database.  If
 * there are no members in the database, an empty array will be returned.
 * This feature should be used sparingly, it is very inefficient and can
 * crash the server once more users are loaded.
 *
 * When q._id contains a value, a SINGLE member will be returned matching that _id.
 * If no member is found with that _id, undef will be returned.
 *
 * If q._id is not specified, but both q.memberID and q.councilID are specified,
 * a SINGLE member will be returned matching both that memberID and councilID.
 * If no member is found with that memberID and councilID, undef will be returned.
 *
 * DEPRECATED BEHAVIOR: If q.memberID is specified and q.councilID is not specified,
 * a SINGLE member will be returned matching that memberID.  It is possible for
 * two members in different councils to have the same memberID.  If this happens
 * and more than one member is found, the first record found will be returned.
 * If no member is found with that memberID, undef will be returned.
 *
 * By default (or when q.return="simple"), a simplified JavaScript object will
 * be returned where BigInt and Date values are converted to strings.  This
 * loses all of the usual capabilities of a model but is easier to pass into
 * a template.  To return a fully-capable model instead, specify q.return="model".
 * 
 * When q.return="strict", the result is the same as "simple" with the extra
 * caveat that only fields that actually exist in the database will be returned.
 *
 * If q.return contains anything other than "model" or "simple" or "strict", undef will
 * be returned.
 *
 * If q is passed something other than an object, undef will be returned.
 *
 * @memberof module:lib/modelhelper
 * @param {Object} q query parameters
 * @param {String} q._id query a single member by _id
 * @param {BigInt} q.memberID query a single member by memberID and councilID
 * @param {Number} q.councilID query a single member by memberID and councilID
 * @param {String} q.return contains either "model" or "simple"(default) or "strict"
 * @returns {Object} or {Array} see description above
 */
module.exports.getMember = async function (q = {}) {
  log("getMember()");
  // returns undef if q is not an object
  if (q.constructor !== Object) {
    log("getMember: unknown q type");
    return undefined;
  }

  // returns undef if return contains an unexpected value
  // defaults return to simple
  if ("return" in q) {
    if (q.return != "model" && q.return != "simple" && q.return != "strict") {
      log("getMember: unknown return value");
      return undefined;
    }
  } else {
    q.return = "simple";
  }

  // store query results
  var result;

  try {
    // finds a single member if _id is provided
    if ("_id" in q) {
      log("getMember: _id: " + q._id);

      result = await Members.findById(q._id);

      // finds a single member if memberID is provided and safely converts to BigInt
    } else if ("memberID" in q && q.memberID == BigInt(q.memberID)) {
      log("getMember: memberID: " + q.memberID);
      q.memberID = BigInt(q.memberID);

      // if councilID is provided and safely converts to a number,
      // include it in the search
      if ("councilID" in q && q.councilID == Number(q.councilID)) {
        log("getMember: councilID: " + q.councilID);

        result = await Members.findOne({
          memberID: q.memberID,
          councilID: q.councilID,
        });

        // if councilID is not provided, search on memberID only
      } else {
        result = await Members.findOne({
          memberID: q.memberID,
        });
      }

      // finds all members in the database
    } else {
      log("getMember: find all");
      result = await Members.find();

      if (q.return == "simple" || q.return == "strict") {
        log("getMember: return array simple or strict");
        return result.map(function (rec) {
          return rec.exportObject(q.return);
        });
      } else if (q.return == "model") {
        log("getMember: return array model");
        return result;
      }
    }
  } catch (err) {
    log("getMember: error");
    // silence errors and return undef
    return undefined;
  }

  // we found a single member, which is currently stored in result
  // if there is no result, return undef
  if (q.return == "simple" || q.return == "strict") {
    log("getMember: return single simple");
    return result.exportObject(q.return);
  } else if (q.return == "model") {
    log("getMember: return single model");
    return result;
  }

  // should not reach here
  return undefined;
};

/**
 * export one or more registrations
 *
 * When none of _id, memberID, or councilID are specified,
 * this function will return an ARRAY of all registrations in the database.  If
 * there are no registrations in the database, an empty array will be returned.
 * This feature should be used sparingly, it is very inefficient and can
 * crash the server once more registrations are loaded.
 *
 * When q._id contains a value, a SINGLE registration will be returned matching that _id.
 * If no registration is found with that _id, undef will be returned.  This is NOT a
 * search of registrations matching that member._id!  This is the unique ID of the
 * registration itself.
 *
 * When q._id is not specified, but q.member_id is specified, an array of registrations
 * will be returned for the member with that _id. If no registrations are found is found
 * with that _id, undef will be returned.  (This performs a lookup on the backend and
 * internally translates the request to one that specifies a user by memberID and
 * councilID, which is an inefficient way to perform this lookup - but matches the
 * data schema.)
 *
 * If q._id and member_id are not specified, but both q.memberID and q.councilID
 * are specified, an array of registrations will be returned for the member with that
 * memberID and councilID. If no registrations are found is found with that
 * memberID and councilID, undef will be returned.
 *
 * If not looking up by _id and q.earliest is specified, only entries at or after that
 * date will be returned.
 *
 * By default (or when q.return="simple"), a simplified JavaScript object will
 * be returned where BigInt and Date values are converted to strings.  This
 * loses all of the usual capabilities of a model but is easier to pass into
 * a template.  To return a fully-capable model instead, specify q.return="model".
 *
 * If q.return contains anything other than "model" or "simple", undef will
 * be returned.
 *
 * If q is passed something other than an object, undef will be returned.
 *
 * @memberof module:lib/modelhelper
 * @param {Object} q query parameters
 * @param {String} q._id query a single registration by _id
 * @param {String} q.member_id query registrations by a member's _id
 * @param {BigInt} q.memberID query registrations by memberID and councilID
 * @param {Number} q.councilID query registrations by memberID and councilID
 * @param {Date}   q.earliest only include registrations at or after this date
 * @param {String} q.return contains either "model" or "simple"(default)
 * @returns {Object} or {Array} see description above
 */
module.exports.getRegistration = async function (q = {}) {
  log("getRegistration()");
  // returns undef if q is not an object
  if (q.constructor !== Object) {
    log("getRegistration: unknown q type");
    return undefined;
  }

  // returns undef if return contains an unexpected value
  // defaults return to simple
  if ("return" in q) {
    if (q.return != "model" && q.return != "simple" && q.return != "strict") {
      log("getRegistration: unknown return value");
      return undefined;
    }
  } else {
    q.return = "simple";
  }

  // store query results
  var result;

  try {
    // finds a single registration if _id is provided
    if ("_id" in q) {
      log("getRegistration: _id: " + q._id);
      result = await Registrations.findById(q._id);

      // we found a single registration, which is currently stored in result
      // if there is no result, return undef
      if (q.return == "simple" || q.return == "strict") {
        log("getRegistration: return array simple or strict");
        return result.exportObject(q.return);
      } else if (q.return == "model") {
        log("getRegistration: return single model");
        return result;
      }
    }

    // member_id is not actually stored in the registrations collection
    // because it is initially loaded by CSV, keyed off of memberID and
    // councilID.  So this is an inefficient search, which must first
    // discover the memberID and councilID of the member referred to
    // by member_id.

    // fills in memberID and councilID if member_id is provided
    if ("member_id" in q) {
      log("getRegistration: member_id: " + q.member_id);

      var member = await this.getMember({ _id: q.member_id });

      log("getRegistration: lookup memberID: " + member.memberID);
      log("getRegistration: lookup councilID: " + member.councilID);

      q.memberID = member.memberID;
      q.councilID = member.councilID;
    }

    // finds registrations for a member if memberID is provided and
    // safely converts to BigInt
    var query = {};
    if ("memberID" in q && q.memberID == BigInt(q.memberID)) {
      log("getRegistration: memberID: " + q.memberID);
      query.memberID = q.memberID.toString();

      // if councilID is provided and safely converts to a number,
      // include it in the search
      if ("councilID" in q && q.councilID == Number(q.councilID)) {
        log("getRegistration: councilID: " + q.councilID);
        query.councilID = q.councilID.toString();
      }

      // if earliest is provided,
      // include it in the search
      if ("earliest" in q) {
        log("getRegistration: earliest: " + q.earliest);
        query.date = {
          '$gte': moment.tz(q.earliest, settings.timezone).format(),
        };
      }
    }
    log("getRegistration: find: "+JSON.stringify(query));
    result = await Registrations.find(query);
  } catch (err) {
      log('getRegistration: error: '+err);
    // silence errors and return undef
    return undefined;
  }

  // we registrations, which are currently stored in result
  // if there is no result, return undef
  if (q.return == "simple" || q.return == "strict") {
    log("getRegistration: return array simple");
    return result.map(function (rec) {
      return rec.exportObject(q.return);
    });
  } else if (q.return == "model") {
    log("getRegistration: return array simple");
    return result;
  }

  // should not reach here
  return undefined;
};
