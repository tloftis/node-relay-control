'use strict';

angular.module('node').service('nodeService', ['Utility',
    function (Utility) {
        var service = {};

        service.updateNodes = function (){
            return Utility.http.put('node');
        };

        service.getDrivers = function (){
            return Utility.http.get('driver');
        };

        service.addDriver = function (node, driver){
            var id = node, driveId = driver;
            if(node && node.id) id = node.id;
            if(driver && driver.id) driveId = driver.id;

            return Utility.http.post('node/' + id + '/driver', { driverId: driveId });
        };

        service.removeDriver = function (driver){
            var driveId = driver;
            if(driver && driver.id) driveId = driver.id;

            return Utility.http.delete('driver/' + driveId, { driverId: driveId });
        };

        service.uploadDriver = function (){
            return Utility.http.get('driver');
        };

        service.getOutputs = function (){
            return Utility.http.get('output');
        };

        service.getInputs = function (){
            return Utility.http.get('input');
        };

        service.getPipes = function (){
            return Utility.http.get('pipe');
        };

        service.getNodes = function (){
            return Utility.http.get('node');
        };

        service.getNode = function (node){
            var id = node;
            if(node && node.id) id = node.id;

            return Utility.http.get('node/' + id);
        };

        service.getLinks = function (){
            return Utility.http.get('link');
        };

        service.getLink = function (node){
            var id = node;
            if(node && node._id) id = node._id;

            return Utility.http.get('link/' + id);
        };

        service.removeLink = function (node){
            var id = node;
            if(node && node._id) id = node._id;

            return Utility.http.delete('link/' + id);
        };

        service.updateLink = function (node, link){
            var id = node;
            if(node && node._id) id = node._id;

            return Utility.http.put('link/' + id, { link:link });
        };

        service.addLink = function (link){
            return Utility.http.post('link', { link:link });
        };

        service.updateNode = function (node, config){
            var id = node;
            if(node && node.id) id = node.id;

            return Utility.http.put('node/' + id, { node: config });
        };

        service.getOutput = function (node){
            var id = node;
            if(node && node.id) id = node.id;

            return Utility.http.get('output/edit/' + id);
        };

        service.getInput = function (node){
            var id = node;
            if(node && node.id) id = node.id;

            return Utility.http.get('input/edit/' + id);
        };


        service.removeOutput = function (node){
            var id = node;
            if(node && node.id) id = node.id;

            return Utility.http.delete('output/edit/' + id, {});
        };

        service.removeInput = function (node){
            var id = node;
            if(node && node.id) id = node.id;

            return Utility.http.delete('input/edit/' + id, {});
        };

        service.outputSet = function(node, val){
            var id = node,
                value = {};

            if(node && node.id){ id = node.id; }

            if(!_.isUndefined(val)){
                value.value = val;
                value.type = typeof val;
            }

            return Utility.http.post('output/edit/' + id + '/set', value);
        };

        service.outputUpdate = function(node, newNode){
            var id = node;
            if(node && node.id) id = node.id;
            return Utility.http.put('output/edit/' + id, { node: newNode });
        };

        service.inputUpdate = function(node, newNode){
            var id = node;
            if(node && node.id) id = node.id;
            return Utility.http.put('input/edit/' + id, { node: newNode });
        };

        service.outputCreate = function(node, newNode){
            var id = node;
            if(node && node.id) id = node.id;
            return Utility.http.post('node/' + id + '/output', { output: newNode });
        };

        service.inputCreate = function(node, newNode){
            var id = node;
            if(node && node.id) id = node.id;
            return Utility.http.post('node/' + id + '/input', { input: newNode });
        };

        return service;
    }
]);
