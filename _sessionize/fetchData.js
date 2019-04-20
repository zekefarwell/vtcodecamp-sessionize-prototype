
const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');
const slugify = require('slugify');

module.exports = fetchData();

var speakers = {};
var sessions = {};
var rooms = {};
var levels = {};
var formats = {};



async function fetchData()
{
    fetch('https://sessionize.com/api/v2/bm8zoh0m/view/all')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            parseCategories(data.categories);
            buildSpeakers(data.speakers);
            buildSessions(data.sessions);
            writeDataFile('rooms.json', data.rooms);
        });
}


function parseCategories(categories)
{
    for (let category of categories) {
        if (category.title == 'Level') {
            for (level of category.items) {
                levels[level.id] = level;
            }
        } else if (category.title == 'Session format') {
            for (format of category.items) {
                formats[format.id] = format;
            }
        }
    }
}

function buildSpeakers(speakersData)
{
    for (let speaker of speakersData) {
        for (let link of speaker.links) {
            link.name = link.title;
            switch (link.linkType) {
                case 'Twitter':
                    link.name = '@' + link.url.replace(/https*:\/\/(www\.)*twitter.com\//gi, '').replace(/\/?(\?.*)?$/, '');
                    break;
                case 'Blog':
                case 'Company_Website':
                    link.name = link.url.replace(/https*:\/\/(www\.)*/gi, '')
                                    .replace(/\/?(\?.*)?$/, '')
                                    .replace(/\/.*/, '');
                    break;       
            }
        }
    }
    speakers = speakersData;
    writeDataFile('speakers.json', speakers);
}


function buildSessions(sessionsData)
{
    for (let session of sessionsData) {
        for (let categoryId of session.categoryItems) {
            if (categoryId in levels) {
                session.level = levels[categoryId].name;
            } else if (categoryId in formats) {
                session.format = formats[categoryId].name;
            }
        }
    }
    sessions = sessionsData;
    writeDataFile('sessions.json', sessions);
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
