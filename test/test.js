require('../');

var expect = require('chai').expect;

describe('require-self-ref', function() {
    it('should allow a self-referencing require', function() {
        var foo = require('./my-package/src/some/deeply/nested/path/foo/index.js');
        expect(foo.bar).to.equal(require('./my-package/src/util/bar.js'));
    })
});