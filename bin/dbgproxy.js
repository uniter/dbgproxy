#!/usr/bin/env node

/*
 * DBGp (Common DeBugGer Protocol) Socket.IO proxy
 * Copyright (c) Dan Phillimore (asmblah)
 * https://github.com/uniter/dbgproxy/
 *
 * Released under the MIT license
 * https://github.com/uniter/dbgproxy/raw/master/MIT-LICENSE.txt
 */

var dbgp = require('dbgp'),
    http = require('http'),
    socketIO = require('socket.io'),
    DbgpBridge = require('../src/Server/DbgpBridge'),
    Server = require('../src/Server'),
    ServerFactory = require('../src/ServerFactory'),
    dbgpBridge = new DbgpBridge(),
    serverFactory = new ServerFactory(Server, http, socketIO, dbgp, dbgpBridge),
    server = serverFactory.createServer(),
    port = 1234;

server.listen(port).then(function () {
    console.log('DBGp proxy server listening on port ' + port);
}, function (error) {
    setTimeout(function () {
        throw error;
    }, 1);
});
