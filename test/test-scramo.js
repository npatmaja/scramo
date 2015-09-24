var expect = require('chai').expect;
var mockery = require('mockery');
var sinon = require('sinon');
var apiUnderTest;

describe('scramo', function() {
  var requestStub = {
    get: sinon.stub()
  };
  var parserStub = {
    parse: sinon.stub()
  };

  before(function(done) {
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false,
      useCleanCache: true
    });
    mockery.registerMock('request', requestStub);
    mockery.registerMock('./parser', parserStub);

    apiUnderTest = require('../lib/scramo');
    done();
  });

  describe('when success', function() {
    describe('using promise', function(done) {
      it('returns a promise', function(done) {
        var result;

        requestStub.get.yields(null, {}, {});
        parserStub.parse.returns({});

        result = apiUnderTest.scrape('http://example.com/example', {});

        expect(result).to.be.ok;
        expect(result).to.have.property('then');
        expect(result).to.have.property('fail');
        expect(result).to.have.property('done');
        expect(result).to.have.property('finally');

        done();
      });
    });

    describe('using callback', function() {
      it('executes the callback', function(done) {
        requestStub.get.yields(null, {}, {});
        parserStub.parse.returns({});

        apiUnderTest.scrape('http://example.com/example', {}, function(err, data) {
          expect(err).to.be.not.ok;
          expect(data).to.be.ok;
          done();
        });
      });
    });
  });

  describe('when error while calling request', function() {
    describe('when using promise', function() {
      it('fails', function(done) {
        var result;
        requestStub.get.yields('Something wrong');
        result = apiUnderTest.scrape('http://example.com/example', {});
        result
          .catch(function(err) {
            expect(err).to.be.ok;
            done();
          });
      });
    });

    describe('when using callback', function() {
      it('returns not null error', function(done) {
        requestStub.get.yields('Something wrong');
        apiUnderTest.scrape('http://example.com/example', {}, function(err) {
          expect(err).to.be.ok;
          done();
        });
      });
    });
  });
});
