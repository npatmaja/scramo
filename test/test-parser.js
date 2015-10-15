var libPath = '../lib';

var apiUnderTest = require([libPath, 'parser'].join('/'));
var expect = require('chai').expect;
var fs = require('fs');

var html;
var options;

function prepareSuite1() {
  html = fs.readFileSync('./test/html1.html', 'utf8');
  options = {
    collection1: {
      selector: 'ul li[class="stats"]',
      properties: [
        {
          name: 'postedTime',
          attr: 'data-time'
        },
        {
          name: 'username',
          attr: 'data-user-name'
        },
        {
          name: 'text',
        },
        {
          name: 'html',
          attr: 'html'
        }
      ]
    }
  };
}

function prepareSuite2() {
  html = fs.readFileSync('./test/html2.html', 'utf8');
  options = {
    postedTime: {
      selector: 'span#fbPhotoPageTimestamp a abbr:first-child',
      properties: [
        {
          name: 'utime',
          attr: 'data-utime'
        }
      ]
    },
    totalLikeText: {
      selector: 'div.UFILikeSentenceText:first-child',
      properties: [
        {
          name: 'text'
        }
      ]
    },
    totalSharedText: {
      selector: 'a.UFIShareLink',
      properties: [
        {
          name: 'text'
        }
      ]
    },
    totalCommentText: {
      selector: 'span.fcg.UFIPagerCount:first-child',
      properties: [
        {
          name: 'text'
        }
      ]
    }
  };
}

describe('parser', function() {
  describe('html1', function() {
    before(function(done) {
      prepareSuite1();
      done();
    });

    it('returns a correct formatted object', function(done) {
      var result = apiUnderTest.parse(html, options);

      expect(result).to.have.property('collection1');
      expect(result.collection1).to.have.length(2);
      expect(result).to.have.deep.property('collection1[0].postedTime', '468997666');
      expect(result).to.have.deep.property('collection1[0].username', 'dummy');
      expect(result).to.have.deep.property('collection1[0].text', 'text content of the element');
      expect(result).to.have.deep.property('collection1[1].postedTime', '468997667');
      expect(result).to.have.deep.property('collection1[1].username', 'dummy2');
      expect(result).to.have.deep.property('collection1[1].text', 'text content of the element 2');
      expect(result).to
        .have.deep.property('collection1[0].html', '<span class="dummy-class">text content of the element</span>');
      expect(result).to
        .have.deep.property('collection1[1].html', '<span class="dummy-class">text content of the element 2</span>');
      done();
    });
  });

  describe('html2', function() {
    before(function(done) {
      prepareSuite2();
      done();
    });

    it('does something', function(done) {
      var result = apiUnderTest.parse(html, options);

      expect(result).to.have.property('postedTime');
      expect(result.postedTime).to.have.length(1);
      expect(result).to.have.deep.property('postedTime[0].utime', '1441776367');

      expect(result).to.have.property('totalLikeText');
      expect(result.totalLikeText).to.have.length(1);
      expect(result).to.have.deep.property('totalLikeText[0].text', 'Hilman Firmansyah, Uthera Kalimaya, Yohanes Pekik dan 1.433 lainnya menyukai ini.');

      expect(result).to.have.property('totalSharedText');
      expect(result.totalSharedText).to.have.length(1);
      expect(result).to.have.deep.property('totalSharedText[0].text', '1.645 berbagi');

      expect(result).to.have.property('totalCommentText');
      expect(result.totalCommentText).to.have.length(1);
      expect(result).to.have.deep.property('totalCommentText[0].text', '48 dari 559');

      done();
    });
  });

  describe('when no html to parse', function() {
    before(function(done) {
      html = '';
      options = {
        collection: {
          selector: '.test',
          properties: [
            { name: 'text' }
          ]
        }
      };
      done();
    });

    it('returns empty object', function(done) {
      var result = apiUnderTest.parse(html, options);
      expect(result).to.be.ok;
      expect(result).to.have.property('collection');
      expect(result).to.have.property('collection').to.have.length(0);
      done();
    });
  });

  describe('when the html is null or undefined', function(done) {
    before(function(done) {
      html = null;
      options = {
        collection: {
          selector: '.test',
          properties: [
            { name: 'text' }
          ]
        }
      };
      done();
    });

    it('throws error', function(done) {
      expect(apiUnderTest.parse.bind(apiUnderTest, html, options)).to.throw();
      done();
    });
  });

  describe('when options is null', function(done) {
    before(function(done) {
      prepareSuite1();
      options = null;
      done();
    });

    it('returns empty object', function(done) {
      var result = apiUnderTest.parse(html, options);
      expect(result).to.be.ok;
      expect(result).to.be.empty;
      done();
    });
  });

  describe('when options is an empty object', function(done) {
    before(function(done) {
      prepareSuite1();
      options = {};
      done();
    });

    it('returns empty object', function(done) {
      var result = apiUnderTest.parse(html, options);
      expect(result).to.be.ok;
      expect(result).to.be.empty;
      done();
    });
  });

  describe('when options is undefined', function(done) {
    before(function(done) {
      prepareSuite1();
      options = undefined;
      done();
    });

    it('returns empty object', function(done) {
      var result = apiUnderTest.parse(html, options);
      expect(result).to.be.ok;
      expect(result).to.be.empty;
      done();
    });
  });

  describe('when no no selector is given', function(done) {
    before(function(done) {
      prepareSuite1();
      delete options.collection1.selector;
      done();
    });

    it('returns object empty collection', function(done) {
      var result = apiUnderTest.parse(html, options);
      expect(result).to.have.property('collection1').to.have.length(0);
      done();
    });
  });
});
