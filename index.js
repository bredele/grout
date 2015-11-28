/**
 * Module dependencies.
 */

var mouth = require('mouth');
var Store = require('datastore');


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
  var store;
  return function(data) {
    if(store) store.reset(data);
    else {
      store = new Store(data);
      var node = render(content, store);
      if(node) el.appendChild(node);
      if(attrs) attributes(el, attrs, store);
      return el;
    }
  };
};


/**
 * Render virtual dom content.
 *
 * @param {String|Array|Element} content
 * @param {DataStore?} store
 * @return {Element}
 * @api private
 */

function render(content, store) {
  var type = typeof content;
  var node = content;
  if(type === 'function') node = render(content(), store);
  else if(type === 'string') {
    node = document.createTextNode('');
    bind(content, function(data) {
      node.nodeValue = data;
    }, store);
  } 
  else if(content instanceof Array) node = fragment(content, store);
  return node;
}


/**
 * Bind virtual dom with data store.
 *
 * @param {String} text
 * @param {Function} fn
 * @param {DataStore} store
 * @api private
 */

function bind(text, fn, store) {
  var data = store.data;
  var tmpl = mouth(text, store.data);
  var cb = tmpl[0];
  var keys = tmpl[1];
  fn(cb(store.data));
  for(var l = keys.length; l--;) {
    store.on('change ' + keys[l], function() {
      fn(cb(store.data));
    });
  }
}


/**
 * Render fragment of virtual dom.
 *
 * @param {Array} arr
 * @param {DataStore} store
 * @return {DocumentFragment}
 * @api private
 */

function fragment(arr, store) {
  var el = document.createDocumentFragment();
  for(var i = 0, l = arr.length; i < l; i++) {
    el.appendChild(render(arr[i], store));
  }
  return el;
}


/**
 * Render virtual dom attributes.
 *
 * @param {Element} el
 * @param {Object} attrs
 * @param {DataStore} store
 * @api private
 */

function attributes(el, attrs, store) {
  for(var key in attrs) {
    var value = attrs[key];
    if(typeof value === 'object') value = styles(value);
    else if(typeof value === 'function') {
      var bool = key.substring(0, 2) === 'on';
      if(bool) el.addEventListener(key.slice(2), value);
      // @not we should compute the function if it's not an event
      break;
    }

    bind(value, function(data) {
       // @note should refactor with render (too bad attribute can't append text node anymore)
       el.setAttribute(this, data);
    }.bind(key), store);
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