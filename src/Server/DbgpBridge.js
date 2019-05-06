/*
 * DBGp (Common DeBugGer Protocol) Socket.IO proxy
 * Copyright (c) Dan Phillimore (asmblah)
 * https://github.com/uniter/dbgproxy/
 *
 * Released under the MIT license
 * https://github.com/uniter/dbgproxy/raw/master/MIT-LICENSE.txt
 */

'use strict';

var _ = require('microdash');

function DbgpBridge() {
}

_.extend(DbgpBridge.prototype, {
    bridge: function (clientSocket, dbgpConnection) {
        _.each([
            'line_breakpoint_set',
            'run'
        ], function (eventName) {
            dbgpConnection.on(eventName, function (data) {
                clientSocket.emit(eventName, data);
            });
        });

        // Notify the client that the IDE has been connected to
        clientSocket.emit('ide_connected');
    }
});

module.exports = DbgpBridge;
