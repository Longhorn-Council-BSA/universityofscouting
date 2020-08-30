/**
 * model helper module
 *
 * This module contains helper functions for interacting with models
 *
 * @module lib/modelhelper
 */
// jshint.unstable bigint: true
var Members = require("../models/members");
var Registrations = require("../models/registrations");

/**
 * export one or more members as a 
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
 * If q.return contains anything other than "model" or "simple", undef will
 * be returned.
 * 
 * If q is passed something other than an object, undef will be returned.
 * 
 * @memberof module:lib/modelhelper
 * @param {Object} q query parameters
 * @param {BigInt} q._id query a single member by _id
 * @param {BigInt} q.memberID query a single member by memberID and councilID
 * @param {Number} q.councilID query a single member by memberID and councilID
 * @param {String} q.return contains either "model" or "simple"(default)
 * @returns {Object} or {Array} see description above
 */
module.exports.getMember = async function(q = {}) {
    // returns undef if q is not an object
    if(q.constructor !== Object) {
        return undef;
    }

    // returns undef if return contains an unexpected value
    // defauls return to simple
    if('return' in q) {
        if(q.return != 'model' && q.return != 'simple') {
            return undef;
        }
    } else {
        q.return = 'simple';
    }

    // store query results
    var result;

    try {

        // finds a single member if _id is provided and safely converts to BigInt
        if('_id' in q && q._id == BigInt(q._id)) {
            q._id = BigInt(q._id);

            result = await Members.findById(q._id);

        // finds a single member if memberID is provided and safely converts to BigInt
        } else if('memberID' in q && q.memberID == BigInt(q.memberID)) {
            q.memberID = BigInt(q.memberID);

            // if councilID is provided and safely converts to a number, 
            // include it in the search
            if('councilID' in q && q.councilID == Number(q.councilID)) {

                result = await Members.findOne({
                    memberID: q.memberID,
                    councilID: q.councilID
                });

            // if councilID is not provided, search on memberID only
            } else {

                result = await Members.findOne({
                    memberID: q.memberID
                });
            }

        // finds all members in the database
        } else {

            result = await Members.find();

            if(q.return == 'simple') {
                return result.map(function(rec) {
                    return rec.exportObject();
                });
            } else if(q.return == 'model') {
                return result;
            }
        }

    } catch(err) {
        // silence errors and return undef
        return undef;
    }

    // we found a single member, which is currently stored in result
    // if there is no result, return undef
    if(q.return == 'simple') {
        return result.exportObject();
    } else if(q.return == 'model') {
        return result;
    }

    // should not reach here
    return undef;
};