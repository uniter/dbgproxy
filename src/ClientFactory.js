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

function ClientFactory(Client, IdeConnection, socketIOClient) {
    this.Client = Client;
    this.IdeConnection = IdeConnection;
    this.socketIOClient = socketIOClient;
}

_.extend(ClientFactory.prototype, {
    createClient: function () {
        var factory = this;

        return new factory.Client(factory, factory.socketIOClient);
    },

    createIdeConnection: function (socket) {
        var factory = this;

        return new factory.IdeConnection(socket);
    }
});

module.exports = ClientFactory;
