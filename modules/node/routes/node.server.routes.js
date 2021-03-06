'use strict';

/**
 * Module dependencies.
 */
const node = require('../controllers/node.server.controller.js'),
    outputs = require('../controllers/node-outputs.server.controller.js'),
    drivers = require('../controllers/node-drivers.server.controller.js'),
    inputs = require('../controllers/node-inputs.server.controller.js');

module.exports = function (app) {
    // Users collection routes
    app.route('/api/node') .
        get(node.list).
        post(node.register).
        put(node.updateNodes);

    app.route('/api/node/:nodeId').
        get(node.get).
        put(node.update).
        post(node.updateNode); //this will have the server call down to the node to make it update

    app.route('/api/node/:nodeId/output').
        post(outputs.add);

    app.route('/api/node/:nodeId/input').
        post(inputs.add);

    app.route('/api/node/:nodeId/driver').
        post(drivers.add);

    app.param('nodeId', node.nodeById);
};
