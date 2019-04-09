
const path = require('path');
const fs = require('fs');

module.exports = fetchData();

function fetchData()
{
    let speakers = {
        josh: 'Josh Lee',
        kyle: 'Kyle Mitofsky',
    }
    console.log(speakers);

    let projectRoot = path.normalize(`${__dirname}/..`);

    let file = `${projectRoot}/_data/speakers.json`;
    let content = JSON.stringify(speakers, null, 4);

    fs.writeFile(file, content, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
}
