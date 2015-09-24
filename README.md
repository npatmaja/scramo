# Scramo
[![Build Status](https://travis-ci.org/npatmaja/scramo.svg)](https://travis-ci.org/npatmaja/scramo) [![Coverage Status](https://coveralls.io/repos/npatmaja/scramo/badge.svg?branch=master&service=github)](https://coveralls.io/github/npatmaja/scramo?branch=master)

Scramo is a config driven simple scraper module for Node.js.

# Install

```bash
npm install scramo
```

# Usage

```js
var config = {
  collection1: {
    selector: 'selector to scrape',
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

scramo
  .scrape(url, config)
  .then(function(result) {
    // do something with the result
  })
  .fail(function(err) {
    console.error(err);
  });
```
