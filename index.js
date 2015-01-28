
/**
 * Expose 'x'
 */

module.exports = x;


/**
 * x constructor.
 * @api public
 */

function x(tag, attrs) {
	var dom = document.createElement(tag);
  return function() {
  	return dom;
  };
}

	// var dom = document.createElement(tag);
	// for(var key in attrs) {
	// 	dom.setAttribute(key, attrs[key]);
	// }
 //  return dom;