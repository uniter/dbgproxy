/*
 * DBGp (Common DeBugGer Protocol) Socket.IO proxy
 * Copyright (c) Dan Phillimore (asmblah)
 * https://github.com/uniter/dbgproxy/
 *
 * Released under the MIT license
 * https://github.com/uniter/dbgproxy/raw/master/MIT-LICENSE.txt
 */

'use strict';

var _ = require('microdash'),
    Promise = require('lie');

function Server(http, socketIO, dbgp, dbgpBridge) {
    this.dbgp = dbgp;
    this.dbgpBridge = dbgpBridge;
    this.http = http;
    this.socketIO = socketIO;
}

_.extend(Server.prototype, {
    listen: function (port) {
        var server = this;

        return new Promise(function (resolve) {
            var io = server.socketIO({
                    serveClient: false,
                }),
                httpServer = server.http.createServer();

            io.attach(httpServer, {
                pingInterval: 10000,
                pingTimeout: 5000,
                cookie: false
            });
            io.origins('*:*'); // Allow cross-origin debugging connections

            io.on('connection', function (clientSocket) {
                console.log('Browser client connected');

                var dbgpConnection = server.dbgp.connect();
                server.dbgpBridge.bridge(clientSocket, dbgpConnection);

                console.log('DBGp connection to IDE open');
            });

            httpServer.listen(port);

            resolve();
        });
    }
});

module.exports = Server;
