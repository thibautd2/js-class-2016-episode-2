'use strict';

var _ = require('lodash');

module.exports = {

  // Get local IPs for display at start, ease debug with my VM
  // http://stackoverflow.com/questions/3653065/get-local-ip-address-in-node-js
  // http://nodejs.org/api/os.html#os_os_networkinterfaces
  getLocalIps: function getLocalIps() {
    return _.chain(require('os').networkInterfaces()).values().flatten().filter(function (val) {
      return val.internal === false;
    }).map('address').value();
  }

};