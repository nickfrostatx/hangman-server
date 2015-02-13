var net = require('net');
var player = require('./player');

module.exports = function() {
  var server = net.createServer(function(socket) {
    var p = player();

    socket.on('data', function(data) {
      space = parseInt(data);
      if (!p.move(space)) {
        socket.emit('invalid');
      };
    });

    socket.on('end', function() {
      p.disconnect();
    });

    var sendCommand = function(cmd, data) {
      var payload = cmd;
      if (data !== undefined) {
        cmd += ' ' + data;
      };
      socket.write(payload + '\n');
    };

    p.emitter.on('newgame', function(turn) {
      sendCommand('newgame', turn);
    });

    p.emitter.on('move', function(space) {
      sendCommand('move', space);
    });

    p.emitter.on('opponent left', function() {
      sendCommand('left');
    });

    p.emitter.on('win', function(winners) {
      sendCommand('win', winners);
    });

    p.emitter.on('loss', function(winners) {
      sendCommand('loss', winners);
    });

    p.emitter.on('draw', function() {
      sendCommand('draw');
    });

    p.postConnect();
  });

  return server;
};
