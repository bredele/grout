/**
 * Module dependencies.
 */

var tmpl = require('mouth');


/**
 * Virtual dom.
 *
 * Examples:
 *
 *   var fn = dom('button', 'hello ${name}', {
 *     class: 'button ${type}'  
 *   });
 *
 *   fn({name:'olivier', type: 'ctq'});
 *   // => <button class="button cta">hello olivier</button>
 *
 *
 * @param {String} tag
 * @param {String|Array|Element?} content
 * @param {Object?} attrs
 * @return {Function}
 * @api public
 */

module.exports = function(tag, content, attrs) {
  var el = document.createElement(tag);
  return function(data) {
    var node = render(content, data);
    if(node) el.appendChild(node);
    if(attrs) attributes(el, attrs, data);
    return el;
  };
};


/**
 * Render virtual dom content.
 *
 * @param {String|Array|Element} content
 * @param {Object?} content
 * @return {Element}
 * @api private
 */

function render(content, data) {
  var type = typeof content;
  var node = content;
  if(type === 'function')node = render(content());
  else if(type === 'string') {
    var cb = tmpl(content, data)[0];
    node = document.createTextNode(cb(data));
  } 
  else if(content instanceof Array) node = fragment(content);
  return node;
}


/**
 * Render fragment of virtual dom.
 *
 * @param {Array} arr
 * @return {DocumentFragment}
 * @api private
 */

function fragment(arr) {
  var el = document.createDocumentFragment();
  for(var i = 0, l = arr.length; i < l; i++) {
    el.appendChild(render(arr[i]));
  }
  return el;
}


/**
 * Render virtual dom attributes.
 *
 * @param {Element} ell
 * @param {Object} attrs
 * @param {Object} dat
 * @api private
 */

function attributes(el, attrs, data) {
  for(var key in attrs) {
    var value = attrs[key];
    if(typeof value === 'object') value = styles(value);
    else if(typeof value === 'function') {
      var bool = key.substring(0, 2) === 'on';
      if(bool) el.addEventListener(key.slice(2), value);
      // @not we should compute the function if it's not an event
      break;
    }
    // @note should refactor with render (too bad attribute can't append text node anymore)
    el.setAttribute(key,  tmpl(value, data)[0](data));
  }
}


/**
 * Render virtual dom styles.
 *
 * @param {Object} obj
 * @return {String}
 * @api private
 */

function styles(obj) {
  var str = '';
  for(var key in obj) {
    str += key + ':' + obj[key] + ';';
  }
  return str;
}