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
 * If q.return contains anything other than "model" or "simple", undef will
 * be returned.
 * 
 * If q is passed something other than an object, undef will be returned.
 * 
 * @memberof module:lib/modelhelper
 * @param {Object} q query parameters
 * @param {String} q._id query a single member by _id
 * @param {BigInt} q.memberID query a single member by memberID and councilID
 * @param {Number} q.councilID query a single member by memberID and councilID
 * @param {String} q.return contains either "model" or "simple"(default)
 * @returns {Object} or {Array} see description above
 */
module.exports.getMember = async function(q = {}) {
    // returns undef if q is not an object
    if(q.constructor !== Object) {
        return undefined;
    }

    // returns undef if return contains an unexpected value
    // defaults return to simple
    if('return' in q) {
        if(q.return != 'model' && q.return != 'simple') {
            return undefined;
        }
    } else {
        q.return = 'simple';
    }

    // store query results
    var result;

    try {

        // finds a single member if _id is provided
        if('_id' in q) {

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
        return undefined;
    }

    // we found a single member, which is currently stored in result
    // if there is no result, return undef
    if(q.return == 'simple') {
        return result.exportObject();
    } else if(q.return == 'model') {
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
 * If q._id is not specified, but both q.memberID and q.councilID are specified,
 * an array of registrations will be returned for the member with that
 * memberID and councilID. If no registrations are found is found with that 
 * memberID and councilID, undef will be returned.
 * 
 * If q.earliest is specified, only entries at or after that date will be returned.
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
module.exports.getRegistration = async function(q = {}) {
    // returns undef if q is not an object
    if(q.constructor !== Object) {
        return undefined;
    }

    // returns undef if return contains an unexpected value
    // defaults return to simple
    if('return' in q) {
        if(q.return != 'model' && q.return != 'simple') {
            return undefined;
        }
    } else {
        q.return = 'simple';
    }

    // store query results
    var result;

    try {

        // finds a single registration if _id is provided
        if('_id' in q) {

            result = await Registrations.findById(q._id);

            // we found a single registration, which is currently stored in result
            // if there is no result, return undef
            if(q.return == 'simple') {
                return result.exportObject();
            } else if(q.return == 'model') {
                return result;
            }

        // finds registrations for a member if member_id is provided
        } else if('member_id' in q) {

            // member_id is not actually stored in the registrations collection
            // because it is initially loaded by CSV, keyed off of memberID and 
            // councilID.  So this is an inefficient search, which must first 
            // discover the memberID and councilID of the member referred to
            // by member_id.
            var member = this.getMember({_id: q.member_id});
            
            result = await Registrations.find({
                memberID: member.memberID,
                councilID: member.councilID
            });

        // finds registrations for a member if memberID is provided and 
        // safely converts to BigInt
        } else if('memberID' in q && q.memberID == BigInt(q.memberID)) {
            q.memberID = BigInt(q.memberID);

            // if councilID is provided and safely converts to a number, 
            // include it in the search
            if('councilID' in q && q.councilID == Number(q.councilID)) {

                result = await Registrations.find({
                    memberID: q.memberID,
                    councilID: q.councilID
                });

            // if councilID is not provided, search on memberID only
            } else {

                result = await Registrations.find({
                    memberID: q.memberID
                });
            }

        // finds all registrations in the database
        } else {

            result = await Registrations.find();

        }

    } catch(err) {
        // silence errors and return undef
        return undefined;
    }

    // we registrations, which are currently stored in result
    // if there is no result, return undef
    if(q.return == 'simple') {
        return result.map(function(rec) {
            return rec.exportObject();
        });
    } else if(q.return == 'model') {
        return result;
    }

    // should not reach here
    return undefined;
};