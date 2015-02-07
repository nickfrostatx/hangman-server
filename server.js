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
      var payload = {command: cmd};
      if (data !== undefined) {
        payload.data = data;
      };
      socket.write(JSON.stringify(payload));
    };

    p.emitter.on('newgame', function(turn) {
      sendCommand('newgame', turn);
    });

    p.emitter.on('move', function(space) {
      sendCommand('move', space);
    });

    p.emitter.on('opponent left', function() {
      sendCommand('opponent left');
    });

    p.emitter.on('win', function(winners) {
      sendCommand('win', winners);
    });

    p.emitter.on('loss', function(winners) {
      sendCommand('loss', winners);
    });

    p.postConnect();
  });

  return server;
};
