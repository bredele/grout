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
		var el = dom('span', 'hello')();
		assert.equal(el.innerHTML, 'hello');
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
		assert.equal(ul.innerHTML, '<li>hello</li><li>world</li>');
	});

	it('should append a fragment of multiple DOM nodes returned by a function', function() {
		var ul = dom('ul', function() {
			return [
				dom('li', 'hello'),
				dom('li', 'world')
			]
		})();
		assert.equal(ul.innerHTML, '<li>hello</li><li>world</li>');
	});

	it('should append fragment of multiple DOM nodes or strings', function() {
		var el = dom('a', [
			'hello',
			dom('span', 'world')
		])();
		assert.equal(el.innerHTML,'hello<span>world</span>');
	});

});


describe('attributes', function() {

	it('should set one attribute', function() {
		var el = dom('a', 'google', {
			href: 'http://google.com'
		})();
		assert.equal(el.getAttribute('href'), 'http://google.com');
	});

	it('should set multiple attributes', function() {
		var el = dom('button', null, {
			id: 'btn',
			class: 'purple',
			role : 'button'
		})();
		assert.equal(el.outerHTML, '<button id="btn" class="purple" role="button"></button>');
	});

	it('should render style attribute', function() {
		var el = dom('button', null, {
			style : {
				color: 'red',
				background: 'black'
			}
		})();
		assert.equal(el.outerHTML, '<button style="color:red;background:black;"></button>');
	});

	it('should create event listeners', function(done) {
		var el = dom('button', null, {
			onclick: function() {
				done();
			}
		})();
		var ev = document.createEvent('MouseEvents');
		ev.initEvent('click', true, true);
		el.dispatchEvent(ev, true);
	});

	it('should define functions as attributes', function() {
	  var el = dom('button', null, {
	    class: function() {
	      return 'hello-world';
	    }
	  })();
	  assert.equal(el.className, 'hello-world');
	});
});


describe('interpolation', function() {

	it('should interpolate inner variables with data', function() {
		var el = dom('span', 'hello ${name}')({
			name: 'olivier'
		});
		assert.equal(el.innerHTML, 'hello olivier');
	});

	it('should interpolate attribute value', function() {
		var el = dom('span', null, {
			class: 'hello ${name}'
		})({
			name: 'olivier'
		});
		assert.equal(el.outerHTML, '<span class="hello olivier"></span>');
	});

	it('should interpolate style attribute values', function() {
		var el = dom('span', null, {
			style: {
				color: '${color}',
				background: '${background}'
			}
		})({
			color: 'red',
			background: 'black'
		});
		assert.equal(el.outerHTML, '<span style="color:red;background:black;"></span>');
	});

});

describe('binding', function() {

	it('should bind virtual dom with data', function() {
		var fn = dom('span', 'hello ${name}');
		var el = fn({
			name: 'olivier'
		});
		assert.equal(el.innerHTML, 'hello olivier');

		fn({
			name: 'bruno'
		});
		assert.equal(el.innerHTML, 'hello bruno');
	});


	it('should bind virtual dom attributes with data', function() {
		var fn = dom('span', null, {
			class: '${name}',
			style: {
				color: '${color}',
				background:'black'
			}
		});

		var el = fn({
			name: 'olivier',
			color: 'red'
		});
		assert.equal(el.className, 'olivier');
		assert.equal(el.getAttribute('style'), 'color:red;background:black;')

		fn({
			name: 'bruno',
			color: 'green'
		});

		assert.equal(el.className, 'bruno');
		assert.equal(el.getAttribute('style'), 'color:green;background:black;')
	});


});
