
/**
 * Test dependencies.
 */

var assert = require('assert');
var x = require('..');

describe('basic', function() {

	it('should return a function', function() {
		var dom = x('button');
		assert.equal(typeof dom, 'function');
	});

	it('should create dom element with a specified tag', function() {
		var el = x('button')();
		assert.equal(el.nodeName, 'BUTTON');
	});

	it('should set the inner value of the returned element', function() {
		var el = x('button', 'hello')();
		assert.equal(el.innerHTML, 'hello');
	});

	describe("inception", function() {
		
		it('should append child element', function() {
			var dom = x('ul', [
				x('li', 'hello')
			])();

			var li = dom.firstChild;
			assert.equal(li.nodeName, 'LI');
			assert.equal(li.innerHTML, 'hello');

		});

	});
	


	// describe('attributes', function() {

	// 	it('should set attributes', function() {
	// 		var dom = x('button', {
	// 			class: 'btn'
	// 		});
	// 		assert.equal(dom.className, 'btn');
	// 	});

	// });

	// describe('child nodes', function() {

	// 	it('should append child nodes', function() {
	// 		var list = x('ul', [
	// 			x('li'),
	// 			x('li')
	// 		]);

	// 	});

	// });

});
