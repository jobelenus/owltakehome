let raw_data = require('fs').readFileSync('./lib/raw_data.txt', 'ascii')

let lines = raw_data.split('\n');
let rates_by_state = lines.reduce((map, line) => {
  if (line.trim().length === 0) {
    return map;  // ignoring blank lines
  } 

  let cols = line.split('\t');
  let state = cols[0];
  if (!Object.keys(map).includes(state)) {
    map[state] = [];
  }

  let rate = cols[2];
  let min = parseInt(cols[3]);
  let max = cols[4] && cols[4].length === 0 ? null : (parseInt(cols[4]) || null);
  map[state].push({rate, min, max});
  return map
}, {})

module.exports = {
  rates_by_state,
  states: Object.keys(rates_by_state)
}