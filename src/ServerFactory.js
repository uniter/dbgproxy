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

function ServerFactory(Server, http, socketIO, dbgp, dbgpBridge) {
    this.dbgp = dbgp;
    this.dbgpBridge = dbgpBridge;
    this.http = http;
    this.Server = Server;
    this.socketIO = socketIO;
}

_.extend(ServerFactory.prototype, {
    createServer: function () {
        var factory = this;

        return new factory.Server(factory.http, factory.socketIO, factory.dbgp, factory.dbgpBridge);
    }
});

module.exports = ServerFactory;
