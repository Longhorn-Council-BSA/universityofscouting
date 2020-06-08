var express = require('express');
var router = express.Router();

/* GET profile page. */
router.get('/', function(req, res, next) {
  res.render('profile', {title: "Profile",user:req.user});
});

module.exports = router;
