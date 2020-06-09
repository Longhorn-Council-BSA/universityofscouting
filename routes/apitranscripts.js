// jshint esversion: 8
// async functions
var express = require('express');
var router = express.Router();
var Transcripts = require('../models/transcriptentries');

/**
 * Retrieve all transcript entries from MongoDB.
 */
async function getAllTranscripts() {
    var transcript = await TranscriptEntries.find();
    response = transcript.map( function (entry) {
        return {
            _id: entry._id.toString(),
            memberID: entry.memberID.toString(),
            courseNumber: entry.courseNumber,
            courseName: entry.courseName,
            status: entry.status
        };
    });
    return response;
}

/** 
 * GET all transcript entries. 
 * if ?return=csv, return a CSV of the data instead of JSON
*/
router.get('/', async function(req, res, next) {
    try {
        var transcript = await getAllTranscripts();
        if(req.query['return'] == 'csv') {
            res.csv(transcript);
        } else {
            res.json(await getAllTranscripts());
        }
    } catch(err) {
        res.status(500).json({
            message: err.message
        });
    }
});

module.exports = router;
