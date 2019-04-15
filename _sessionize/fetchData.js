
const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');
const slugify = require('slugify');

module.exports = fetchData();

async function fetchData()
{
    fetch('https://sessionize.com/api/v2/bm8zoh0m/view/all')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            writeDataFile('speakers.json', data.speakers);
            writeDataFile('sessions.json', data.sessions);
            writeDataFile('rooms.json', data.rooms);
            for (let category of data.categories) {
                filename = slugify(category.title, {replacement: '-',lower: true });
                writeDataFile(filename + 's.json', category.items);
            }
        });
}


function writeDataFile(filename, array)
{
    let object = {};

    for (let item of array) {
        object[item.id] = item;
    }

    let projectRoot = path.normalize(`${__dirname}/..`);

    let file = `${projectRoot}/_data/${filename}`;
    let content = JSON.stringify(object, null, 4);

    fs.writeFile(file, content, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log(`Sessionize data written to ${filename}`);
    });
}
