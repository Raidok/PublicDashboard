/*
 * Serve content over a socket
 */
// DB
var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('msg.db');
db.run("CREATE TABLE IF NOT EXISTS msg (id INTEGER PRIMARY KEY, type TEXT, title TEXT, content TEXT, created INTEGER)");

// error handling
var hasError = function(err) {
    if (err !== null) {
        socket.emit('bc:msgs', {type: 'danger', title: 'ERROR - try to refresh', content: err });
        return true;
    }
    return false;
};

module.exports = function (socket) {

    // send initial data on connect
    db.all("SELECT * FROM msg ORDER BY created ASC", function(err, rows) {
        if (!hasError(err)) {
            console.log('rowcount:'+rows.length);
            socket.emit('bc:msgs', rows);
        }
    });

    socket.on('msg:send', function(data) {
        data.created = new Date().getTime();
        var res = db.run("INSERT INTO msg (type, title, content, created) VALUES (?, ?, ?, ?)",
            data.type,
            data.title,
            data.content,
            data.created,
            function(err) {
                if (!hasError(err)) {
                    console.log("callback:%o",this);
                    data.id = this.lastID;
                    socket.emit('bc:msg', data);
                    socket.broadcast.emit('bc:msg', data);
                }
            });
    });
};
