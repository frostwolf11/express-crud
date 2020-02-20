var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/list', function (req, res) {
  // var post = JSON.stringify(req.body);
  res.redirect('https://staginghr.excellencetechnologies.in/#/page_login');
});

module.exports = router;
