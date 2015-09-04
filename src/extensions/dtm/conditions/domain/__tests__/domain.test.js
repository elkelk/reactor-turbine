'use strict';

var mockDocument = {
  location: {
    hostname: 'foo.adobe.com'
  }
};

var conditionDelegateInjector = require('inject!../domain');
var conditionDelegate = conditionDelegateInjector({
  document: mockDocument
});

function getConfig(domains) {
  return {
    conditionConfig: {
      domains: domains
    }
  };
}

describe('domain condition delegate', function() {
  it('returns true when the domain matches', function() {
    var config = getConfig([/example\.com$/i, /adobe\.com$/i]);
    expect(conditionDelegate(config)).toBe(true);
  });

  it('returns false when the domain does not match', function() {
    var config = getConfig([/example\.com$/i, /yahoo\.com$/i]);
    expect(conditionDelegate(config)).toBe(false);
  });
});
