/**
 * static security capabilities module
 *
 * This module defines the security capabilities and matching access levels
 *
 * @module data/capabilities
 */
module.exports = {
    //banned user: 0

    login: 1,
    //default
    //the following capabilities are included in 'login':
    //view own registration & schedule
    //view own profile
    //print own registration & schedule

    api: 1,
    //administration
    //the following capabilities are included in 'api':
    //use /api routes
    
    viewOther: 10,
    //faculty
    //the following capabilities are included in 'viewOther':
    //view admin page
    //view all registrations & schedules
    //print all registrations & schedules

    takeAttendance: 10,
    //faculty
    //must be assigned to 'viewOther' or higher
    //the following capabilities are included in 'viewOther':
    //change any registration record status

    editOther: 100,
    //administration
    //must be assigned to 'viewOther' or higher
    //the following capabilities are included in 'editOther':
    //edit all registration fields

    add: 100,
    //administration
    //must be assigned to 'viewOther' or higher
    //create new member
    //create new registration record

    delete: 100,
    //administration
    //must be assigned to 'viewOther' or higher
    //delete member
    //delete registration record

    //developer: 1000
    //placeholder
};
