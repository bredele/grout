/**
 * Module dependencies.
 */

var mouth = require('mouth');
var Store = require('datastore');


/**
 * Create tree of dom nodes.
 *
 * @param {String} tag
 * @param {String | Object} attrs (optional)
 * @param {String | Object} nodes (optional)
 * @return {Function} factory
 * @api public
 */

module.exports = function(tag, attrs, nodes) {
  var dom = document.createElement(tag);
  var bool = !(attrs instanceof Array) && typeof attrs === 'object';
  return function(data) {
    var store = new Store(data);
    if(bool) {
      attributes(dom, attrs, store);
      attrs = nodes;
    }
    if(attrs) children(dom, attrs, store);
    return dom;
  };
};


/**
 * Set attributes.
 * 
 * @param  {Element} dom
 * @param  {Object} obj
 * @param  {Object} data
 * @api private
 */

function attributes(dom, obj, store) {
  for(var key in obj) {
    var value = obj[key];
    var attr = document.createAttribute(key);
    if(typeof value === 'function') {
        if(key.substring(0,2) === 'on') {
          dom[key] = value;
          break;
        }
        // todo: we don't want to parse for identifiers it function
        // text handler should have a static option
        value = value.call(store.data);
    }
    if(key === 'style' && typeof value === 'object') {
      value = styles(value);
    }
    text(attr, value, store);
    dom.attributes.setNamedItem(attr);
  }
}


/**
 * Create style attribute from
 * object.
 *
 * Examples:
 *
 *   styles({
 *     background: 'red',
 *     width: '100px'
 *   });
 *   // => 'background:red;width:100px'
 * 
 * @param  {Object} obj
 * @return {String}
 * @api privte
 */

function styles(obj) {
  var result = '';
  for(var style in obj) {
    result += style + ':' + obj[style] + ';';
  }
  return result;
}


/**
 * Create and append text node.
 * 
 * @param  {Element} dom 
 * @param  {String} str
 * @api private
 */

function text(dom, str, store) {
  // todo: we should cache function and props
  var tmpl = mouth(str);
  var props = tmpl.props;
  var render = tmpl.text;
  var node = document.createTextNode(render(store.data));
  dom.appendChild(node);
  // todo: we should have option static
  for(var l = props.length; l--;) {
    store.on('change ' + props[l], function() {
      node.nodeValue = render(store.data);
    });
  }
}


/**
 * Set node children elements.
 * 
 * @param  {Element} dom
 * @param  {Array} nodes
 * @api private
 */

function children(dom, nodes, data) {
  if(typeof nodes === 'string') text(dom, nodes, data);
  else for(var i = 0, l = nodes.length; i < l; i++) {
    var node = nodes[i];
    if(typeof node === 'string') text(dom, node, data);
    else dom.appendChild(node());
  }
}

