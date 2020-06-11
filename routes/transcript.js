/**
 * transcript router module
 *
 * This module displays transcripts for logged in users
 *
 * @module routes/transcript
 */
// jshint esversion: 8
// async functions
var express = require("express");
var router = express.Router();
var Registrations = require("../models/registrations");

/**
 * Retrieve all transcript entries from MongoDB for a single user.
 *
 * @private
 * @memberof module:routes/transcript
 * @param {String} memberId the memberID of the user to find records for
 * @returns an object containing transcript entries
 */
async function getUserTranscript(memberID) {
  var transcript = await Registrations.find({
    memberID: memberID,
  });
  response = transcript.map((entry) => {
    var date = entry.date;
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();
    date = mm + '/' + dd + '/' + yyyy;
    return {
      _id: entry._id.toString(),
      memberID: entry.memberID.toString(),
      title: entry.title,
      date: date,
      credits: entry.credits,
      status: entry.status,
    };
  });
  return response;
}

/**
 * GET and display all transcript entries for the logged in user.
 *
 * Display all transcript entries for the logged in user using the "transcript" view.
 *
 * @private
 * @memberof module:routes/transcript
 * @param {Object}   req                request object
 * @param {Object}   req.user           the currently logged in user
 * @param {String}   req.user.memberID  the memberID of the logged in user
 * @param {String}   req.query.return   when set to "csv", return CSV output
 * @param {Object}   res                response object
 * @param {Function} next               function call to next middleware
 */
async function routerGETTranscipt(req, res, next) {
  try {
    var transcript = await getUserTranscript(req.user.memberID);
    res.render("transcript", {
      transcript: transcript,
      user: req.user,
      title: "Transcript Page",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}

// register routes and export router
router.get("/", routerGETTranscipt);
module.exports = router;


var pdf = require('html-pdf');
pdf.create(html).toStream(function(err, stream){
  stream.pipe(fs.createWriteStream('./foo.pdf'));
});

// pdf.create(html).toFile([filepath]function(err, res){
//   console.log(res.filename);
// });
 
// pdf.create(html).toBuffer(function(err, buffer){
//   console.log('This is a buffer:', Buffer.isBuffer(buffer));
// });
 
 
// for backwards compatibility
// alias to pdf.create(html[, options]).toBuffer(callback)
// pdf.create(html [, options], function(err, buffer){});

config = {
 
  // Export options
  "directory": "/tmp",       // The directory the file gets written into if not using .toFile(filename, callback). default: '/tmp'
 
  // Papersize Options: http://phantomjs.org/api/webpage/property/paper-size.html
  "height": "10.5in",        // allowed units: mm, cm, in, px
  "width": "8in",            // allowed units: mm, cm, in, px
  // - or -
  // "format": "Letter",        // allowed units: A3, A4, A5, Legal, Letter, Tabloid
  // "orientation": "portrait", // portrait or landscape
 
  // Page options
  "border": "0",             // default is 0, units: mm, cm, in, px
  // - or -
  // "border": {
  //   "top": "2in",            // default is 0, units: mm, cm, in, px
  //   "right": "1in",
  //   "bottom": "2in",
  //   "left": "1.5in"
  // },
 
  paginationOffset: 1,       // Override the initial pagination number
  "header": {
    "height": "45mm",
    "contents": '<div style="text-align: center;">Author: Marc Bachmann</div>'
  },
  "footer": {
    "height": "28mm",
    "contents": {
      first: 'Cover page',
      2: 'Second page', // Any page number is working. 1-based index
      default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
      last: 'Last Page'
    }
  },
 
 
  // Rendering options
  "base": "file:////www/", // Base path that's used to load files (images, css, js) when they aren't referenced using a host
 
  // Zooming option, can be used to scale images if `options.type` is not pdf
  "zoomFactor": "1", // default is 1
 
  // File options
  "type": "pdf",             // allowed file types: png, jpeg, pdf
  "quality": "75",           // only used for types png & jpeg
 
  // Script options
  "phantomPath": "./node_modules/phantomjs/bin/phantomjs", // PhantomJS binary which should get downloaded automatically
  "phantomArgs": [], // array of strings used as phantomjs args e.g. ["--ignore-ssl-errors=yes"]
  "script": '/url',           // Absolute path to a custom phantomjs script, use the file in lib/scripts as example
  "timeout": 30000,           // Timeout that will cancel phantomjs, in milliseconds
 
  // Time we should wait after window load
  // accepted values are 'manual', some delay in milliseconds or undefined to wait for a render event
  "renderDelay": 1000,
 
  // HTTP Headers that are used for requests
  "httpHeaders": {
    // e.g.
    "Authorization": "Bearer ACEFAD8C-4B4D-4042-AB30-6C735F5BAC8B"
  },
 
  // To run Node application as Windows service
  "childProcessOptions": {
    "detached": true
  }
 
  // HTTP Cookies that are used for requests
  "httpCookies": [
    // e.g.
    {
      "name": "temp-pdf", // required
      "value": "100", // required
      "domain": "localhost",
      "path": "/foo", // required
      "httponly": true,
      "secure": false,
      "expires": (new Date()).getTime() + (1000 * 60 * 60) // e.g. expires in 1 hour
    }
  ]
 
}