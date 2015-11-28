/**
 * Test dependencies.
 */

var assert = require('assert');
var dom = require('..');


describe('basic', function() {

	it('should be a function', function() {
		assert.equal(typeof dom, 'function');
	});

	it('should create a DOM element', function() {
		var el = dom('h1')();
		assert.equal(el.nodeName, 'H1');
	});

	it('should set inner text of a DOM element', function() {
		var el = dom('span', 'hello world')();
		assert.equal(el.innerText, 'hello world');
	});

	it('should append DOM element', function() {
		var span = document.createElement('span');
		var el = dom('a', span)();
		assert.equal(el.firstChild, span);
	});

});
