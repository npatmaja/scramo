var api;

api = {
  isUndefined: function(object) {
    return typeof object === 'undefined';
  },

  isNull: function(object) {
    return object === null;
  }
};

module.exports = api;
