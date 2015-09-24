# Scramo
[![npm](https://img.shields.io/npm/v/scramo.svg?style=flat-square)](https://www.npmjs.com/package/scramo) [![Travis](https://img.shields.io/travis/npatmaja/scramo.svg?style=flat-square)](https://github.com/npatmaja/scramo) [![Coveralls](https://img.shields.io/coveralls/npatmaja/scramo.svg?style=flat-square)](https://github.com/npatmaja/scramo)   [![David](https://img.shields.io/david/npatmaja/scramo.svg?style=flat-square)](https://github.com/npatmaja/scramo)  [![David](https://img.shields.io/david/dev/npatmaja/scramo.svg?style=flat-square)](https://github.com/npatmaja/scramo)

Scramo is a simple config-driven web scraper module for Node.js. Being config-driven, one must provide a configuration of what element and which data should be scraped from a given URL. Scramo returns a [promise](https://github.com/kriskowal/q) to deal with the asynchronous execution. However, callback is also supported.

# Install

```bash
npm install scramo
```

# Usage

```js
var config = {
  collection1: {
    selector: '.class-to-scrape',
    properties: [
      {
        name: 'utime',
        attr: 'data-utime'
      },
      {
        name: 'longText'
      }
    ]
  }
};

// using promise
scramo
  .scrape(url, config)
  .then(function(result) {
    // the resulting data should be
    // {
    //  collection1: [
    //    {
    //      utime: 'somevalue',
    //      longText: 'some long text'
    //    }
    //  ]
    // }
  })
  .fail(function(err) {
    console.error(err);
  });

// using callback
scramo.scrape(url, config, function(err, result) {
  // do something
})
```

## `config`
The config should consist of the following:
- **CollectionName**: a name where the result will be collected to. In the example above is `collection1`
- **selector**: the selector to select which element to scrape
- **properties**: a list of property to tell Scramo what property of
- the selected element to be scraped:
  - **name**: the name that is used as the key of the scraped value in the result
  - **attr**: the element's attribute that will be scraped. When nothing is specified, then the element's text will be returned

# License
MIT
