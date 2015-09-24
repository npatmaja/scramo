var cheerio = require('cheerio');
var helper = require('./helper');
var api;

api = {
  parse: function(html, options) {
    if (helper.isUndefined(html) || helper.isNull(html)) {
      throw new Error('Cannot parse null or undefined');
    }

    var $ = cheerio.load(html);
    var collection;
    var properties;
    var data = {};
    var selector;
    var el;

    for (var key in options) {
      if (!options.hasOwnProperty(key)) continue;

      collection = [];
      selector = options[key].selector;
      properties = options[key].properties;
      el = $(selector);

      el.each(processElement($, properties, collection));

      data[key] = collection;
    }

    return data;
  }
};

function processElement($, properties, collection) {
  return function(index, element) {
    var eldata = {};
    properties.forEach(processProperty(eldata, $(this)));
    collection.push(eldata);
  };
}

function processProperty(eldata, el) {
  return function(property) {
    var attribute = property.attr || 'text';
    var val;

    if (attribute === 'text') {
      val = el.text().trim();
    } else {
      val = el.attr(attribute);
    }

    eldata[property.name] = val;
  };
}

module.exports = api;
