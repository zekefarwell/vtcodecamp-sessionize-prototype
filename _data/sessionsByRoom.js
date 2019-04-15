
module.exports = getSessionsByRoom();

function getSessionsByRoom()
{
    let sessionsByRoom = {};
    let sessions = require('./sessions.json');
    for (let session of Object.values(sessions)) {
        if (session.isServiceSession) {
            continue;
        }
        let roomId = session.roomId;
        if (!sessionsByRoom[roomId]) {
            sessionsByRoom[roomId] = [];
        }
        sessionsByRoom[roomId].push(session);
    }
    return sessionsByRoom;
}
