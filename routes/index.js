var express = require('express');
var router = express.Router();
const tax_data = require('../lib/tax_data.js');

router.get('/', function(req, res, next) {
  res.render('index', {states: tax_data.states});
});

module.exports = router;
