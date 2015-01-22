
/**
 * Test dependencies.
 */

var assert = require('assert');
var x = require('..');

describe('basic', function() {

	it('should create dom element', function() {
		var dom = x('button');
		assert.equal(dom.nodeName, 'BUTTON');
	});

	describe('attributes', function() {

		it('should set attributes', function() {
			var dom = x('button', {
				class: 'btn'
			});
			assert.equal(dom.className, 'btn');
		});

	});

	describe('child nodes', function() {

		it('should append child nodes', function() {
			var list = x('ul', [
				x('li'),
				x('li')
			]);

		});

	});

});
