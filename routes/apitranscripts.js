var express = require('express');
var router = express.Router();
const Transcripts = require('../models/transcriptentries')

/* GET all transcript entries. */
router.get('/', async function(req, res, next) {
    try {
        const transcript = await TranscriptEntries.find();
        res.json(transcript);
    } catch(err) {
        res.status(500).json({
            message: err.message
        });
    }
});

module.exports = router;
