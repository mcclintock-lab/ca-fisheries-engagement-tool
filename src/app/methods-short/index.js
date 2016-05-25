// Grab the markdown templates and process them into strings. These files are
// found by looking them up via their ID embedded in the rankings.csv file.
let rankings = require('../data/rankings.csv');

let ids = rankings.map(function(row) { return row['ID (do not change)'] });
let templates = {};
for (let id of ids) {
  let template = require('html!markdown!../methods-short/' + id + '.md');
  let parts = template.split("</h2>", 2);
  templates[id] = {
    heading: parts[0].split(">")[1],
    text: parts[1],
    id: id,
    selected:false
  }
}
console.log("templates:::::", templates);
module.exports = templates;
