/**
 * Module dependencies.
 */

var tmpl = require('mouth');


module.exports = function(tag, content, attrs) {
  var el = document.createElement(tag);
  return function(data) {
    var node = render(content, data);
    if(node) el.appendChild(node);
    if(attrs) attributes(el, attrs, data);
    return el;
  };
};


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


function fragment(arr) {
  var el = document.createDocumentFragment();
  for(var i = 0, l = arr.length; i < l; i++) {
    el.appendChild(render(arr[i]));
  }
  return el;
}


function attributes(el, attrs, data) {
  for(var key in attrs) {
    var cb = tmpl(attrs[key], data)[0];
    el.setAttribute(key, cb(data));
  }
}