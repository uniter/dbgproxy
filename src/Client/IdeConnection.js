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

function IdeConnection(socket) {
    this.socket = socket;
}

_.extend(IdeConnection.prototype, {
    onLineBreakpointSet: function (listener) {
        this.socket.on('line_breakpoint_set', function (data) {
            listener(data.path, data.line);
        });
    },

    onRun: function (listener) {
        this.socket.on('run', function (data) {
            listener();
        });
    }
});

module.exports = IdeConnection;
