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

function Client(clientFactory, socketIOClient) {
    this.clientFactory = clientFactory;
    this.socketIOClient = socketIOClient;
}

_.extend(Client.prototype, {
    connect: function (serverAddress) {
        var client = this,
            socket = client.socketIOClient(serverAddress);

        return new Promise(function (resolve, reject) {
            socket.on('ide_connected', function () {
                resolve(client.clientFactory.createIdeConnection(socket));
            });

            socket.on('connect_error', function (error) {
                reject(error);
            });
        });
    }
});

module.exports = Client;
