var cheerio = require('cheerio');
var helper = require('./helper');
var api;

api = {
  parse: function(html, options) {
    if (helper.isUndefined(html) || helper.isNull(html)) {
      throw new Error('Cannot parse null or undefined');
    }

    var data = {};
    var $ = cheerio.load(html);

    for (var key in options) {
      if (options.hasOwnProperty(key)) {
        var collection = [];
        var properties;
        var selector;
        var el;

        selector = options[key].selector;
        properties = options[key].properties;
        el = $(selector);

        el.each(function(index, element) {
          var eldata = {};
          var _el = $(this);

          properties.forEach(function(property) {
            var attribute = property.attr || 'text';
            var val;
            if (attribute === 'text') {
              val = _el.text().trim();
            } else {
              val = _el.attr(attribute);
            }

            eldata[property.name] = val;
          });

          collection.push(eldata);
        });

        data[key] = collection;
      }
    }

    return data;
  }
};

module.exports = api;
