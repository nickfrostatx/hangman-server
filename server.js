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
      var obj = {command: cmd};
      if (data !== undefined) {
        obj.data = data;
      };
      var payload = JSON.stringify(obj);
      var buf = new Buffer(2);
      buf.writeUInt16BE(payload.length);
      socket.write(buf + payload);
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

    p.emitter.on('draw', function() {
      sendCommand('draw');
    });

    p.postConnect();
  });

  return server;
};
