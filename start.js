#!/usr/bin/env node

var tcpServer = require('./server')();
tcpServer.listen(process.env.SERVER_LISTEN || 3000);

var socketIOServer = require('./io')(process.env.SOCKETIO_LISTEN || 3001);
