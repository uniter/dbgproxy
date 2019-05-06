/*
 * DBGp (Common DeBugGer Protocol) Socket.IO proxy
 * Copyright (c) Dan Phillimore (asmblah)
 * https://github.com/uniter/dbgproxy/
 *
 * Released under the MIT license
 * https://github.com/uniter/dbgproxy/raw/master/MIT-LICENSE.txt
 */

'use strict';

/*
 * Proxy client - connects to the server from inside the browser
 */

var socketIOClient = require('socket.io-client'),
    Client = require('./src/Client'),
    ClientFactory = require('./src/ClientFactory'),
    IdeConnection = require('./src/Client/IdeConnection');

module.exports = new ClientFactory(Client, IdeConnection, socketIOClient);
