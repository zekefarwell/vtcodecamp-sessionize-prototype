
module.exports = buildSchedule()

function buildSchedule()
{
    let sessions = require('./sessions.json');
    let speakers  = require('./speakers.json');
    let rooms = require('./rooms.json');
 
    let scheduleMatrix = buildScheduleMatrix(sessions);

    let scheduleTable = {
        head: {},
        body: {},
    };
    scheduleTable.head[0] = { type: 'heading', title: 'Time' };
    for (let room of Object.values(rooms)) {
        if (room.name == 'Main Hall') {
            continue;
        }
        scheduleTable.head[room.id] = {
            type: 'heading',
            title: room.name,
            room: room,
        }
    }
    for (let [timeslotId, timeslot] of Object.entries(scheduleMatrix)) {
        let tableRow = {};
        let startTime = getTimeString(timeslot.startsAt);
        let endTime = getTimeString(timeslot.endsAt);
        tableRow[0] = {
            type: 'heading',
            title: startTime + " - " + endTime,
            timeslot: { id: timeslotId, startTime: startTime, endTime: endTime }
        }
        for (let [roomId, session] of Object.entries(timeslot.sessionsByRoomId)) {
            session.link = `/sessions/#${session.id}`;
            tableCell = {
                type: 'session',
                session: session,
                room: rooms[roomId],
                speakers: [],
            };
            for (let speakerId of session.speakers) {
                let speaker = speakers[speakerId];
                speaker.link = `/speakers/#${speaker.id}`;
                tableCell.speakers.push(speaker);
            }
            tableRow[roomId] = tableCell;
        }
        scheduleTable.body[timeslotId] = tableRow;
    }
    return scheduleTable;
}

function buildScheduleMatrix(sessions)
{
    let timeslots = {};
    for (let session of Object.values(sessions)) {
        let timeslotId = getTimeSlotId(session.startsAt);
        session.timeslotId = timeslotId;
        if (!timeslots[timeslotId]) {
            timeslots[timeslotId] = {
                startsAt: session.startsAt,
                endsAt: session.endsAt,
                sessionsByRoomId: {},
            };
        }
        let timeslot = timeslots[timeslotId];
        timeslot.sessionsByRoomId[session.roomId] = session;
    }
    return timeslots;
}

function getTimeString(timeString)
{
    let date = new Date(timeString);
    let time = date.toLocaleTimeString('en-US', {
        hour12: true,
        hour: 'numeric',
        minute: 'numeric',
    })
    return time;
}

function getTimeSlotId(timeString)
{
    let date = new Date(timeString);
    let time = date.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
    });
    let id = time.replace(':','');
    return parseInt(id);
}
