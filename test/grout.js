/**
 * Test dependencies.
 */

var assert = require('assert');
var dom = require('..');


describe('basic', function() {

	it('should be a function', function() {
		assert.equal(typeof dom, 'function');
	});

	it('should create an element', function() {
		var el = dom('h1')();
		assert.equal(el.nodeName, 'H1');
	});

	it('should set inner text of an element', function() {
		var el = dom('span', 'hello world')();
		assert.equal(el.innerText, 'hello world');
	});

});
