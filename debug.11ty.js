"use strict";

module.exports = function(data) {
    return JSON.stringify({
        rooms: data.rooms,
        schedule: data.schedule,
        sessions: data.sessions,
        sessionsByRoom: data.sessionsByRoom,
        speakers: data.speakers,
    });
};