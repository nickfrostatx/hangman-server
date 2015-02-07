var socketio = require('socket.io');
var player = require('./player');

module.exports = function(listen) {
  var io = socketio(listen);

  io.on('connection', function(socket) {
    var p = player();

    socket.on('disconnect', function() {
      p.disconnect();
    });

    socket.on('move', function(space) {
      if (!p.move(space)) {
        socket.emit('invalid');
      };
    });

    p.emitter.on('newgame', function(turn) {
      socket.emit('newgame', turn);
    });

    p.emitter.on('move', function(space) {
      socket.emit('move', space);
    });

    p.emitter.on('opponent left', function() {
      socket.emit('opponent left');
    });

    p.postConnect();
  });

  return io;
};
