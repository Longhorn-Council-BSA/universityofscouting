var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'University of Scouting', user: req.user });
});
module.exports = router;
