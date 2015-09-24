var parser = require('./parser');
var request = require('request');
var Q = require('q');
var api;

Q.longStackSupport = true;

api = {
  scrape: function(url, options, callback) {
    var deferred = Q.defer();

    request.get(url, function(err, response, body) {
      if (err) return deferred.reject(err);
      deferred.resolve(parser.parse(body, options));
    });

    return deferred.promise.nodeify(callback);
  }
};

// Exports the API
module.exports = api;
