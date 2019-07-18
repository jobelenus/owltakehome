var express = require('express');
var router = express.Router();
const tax_data = require('../lib/tax_data.js')

router.get('/:state/', function(req, res, next) {
  if (!tax_data.states.includes(req.params.state)) {
    res.status(400).send(`${req.params.state} is not a valid state`);
    return;
  }
  if (!req.query.amount) {
    res.status(400).send('`amount` is a required querystring parameter');
    return;
  }
  let int_amt;
  try {
    int_amt = parseInt(req.query.amount);
  } catch (e) {
    res.status(400).send('`amount` needs to be a positive integer');
    return
  }
  let rate = tax_data.rates_by_state[req.params.state].reduce((rate, row) => {
    if(row.min < int_amt && (row.max === null || row.max > int_amt)) {
        return row;
    }
    return rate;
  }, {});
  if (!rate) {  // handles a state with no tax rate
    rate.rate = null;
  }
  rate.state = req.params.state;
  rate.amount = req.query.amount;
  res.status(200).send(rate);
});

module.exports = router;
