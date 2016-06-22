'use strict';

/**
 * Module dependencies.
 */
var acl = require('acl'); //This is a base for building up roles, it can store to a database but exists mainly in memory

// Using the memory backend, this means it will only exist in active memory
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Admin Permissions
 */
exports.invokeRolesPolicies = function (){
    acl.allow([{
        roles: ['admin'],
        allows: [{
            resources: '/api/output',
            permissions: '*'
        }, {
            resources: '/api/output/:outputId',
            permissions: '*'
        }]
    },{
        roles: ['user'],
        allows: [{
            resources: '/api/output',
            permissions: ['get']
        },{
            resources: '/api/output/:outputId',
            permissions: ['get', 'post']
        }]
    }]);
};

exports.isAllowed = function (req, res, next){
    var roles = (req.user) ? req.user.roles : ['guest'];
    var enabled = roles.indexOf('guest') === -1 ? (req.user || {}).enabled : true;

    //Confirm user is enabled
    if(enabled === false){
        req.logout();
        return res.status(401).send('User Account Is Disabled!');
    }else if(typeof enabled === 'undefined'){
        req.logout();
        return res.status(401).send('User Information Is Incorrect!');
    }

    // Check for user roles
    acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed){
        if (err){
            // An authorization error occurred.
            return res.status(500).send('Unexpected authorization error');
        } else {
            if (isAllowed) {
                // Access granted! Invoke next middleware
                return next();
            } else {
                return res.status(403).json({
                    message: 'User is not authorized'
                });
            }
        }
    });
};
