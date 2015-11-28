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
    var value = attrs[key];
    if(typeof value === 'object') value = styles(value);
    else if(typeof value === 'function') {
      var bool = key.substring(0, 2) === 'on';
      if(bool) el.addEventListener(key.slice(2), value);
      break;
    }
    // @note should refactor with render (too bad attribute can't append text node anymore)
    el.setAttribute(key,  tmpl(value, data)[0](data));
  }
}

function styles(obj) {
  var str = '';
  for(var key in obj) {
    str += key + ':' + obj[key] + ';';
  }
  return str;
}