/*
 * Serve content over a socket
 */

module.exports = function (socket) {
  socket.on('msg:send', function(data) {
    console.log(data);
    socket.emit('bc:msg', data);
    socket.broadcast.emit('bc:msg', data);
  });
};
