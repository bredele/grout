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

	it('should append DOM element returned by a function', function() {
		var span = document.createElement('span');
		var el = dom('a', function() {
			return span;
		})();
		assert.equal(el.firstChild, span);
	});

	it('should append a string returned by a function', function() {
		var el = dom('a', function() {
			return 'hello world';
		})();
		assert.equal(el.innerHTML, 'hello world');
	});

	it('should append fragment of multiple DOM nodes', function() {
		var ul = dom('ul', [
			dom('li', 'hello'),
			dom('li', 'world')
		])();
		assert.equal(ul.children.length, 2);
		assert.equal(ul.firstChild.innerText, 'hello');
	});

	it('should append a fragment of multiple DOM nodes returned by a function', function() {

	});

	it('should append fragment oof multiple DOM nodes or strings', function() {
		var el = dom('a', [
			'hello',
			dom('span', 'world')
		])();
		assert.equal(el.innerHTML,'hello<span>world</span>');
	});

});
