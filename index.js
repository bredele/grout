
/**
 * Expose 'x'
 */

module.exports = x;


/**
 * x constructor.
 * @api public
 */

function x(tag, nodes) {
  var dom = document.createElement(tag);
  return function() {
    if(nodes instanceof Array) {
      for(var i = 0, l = nodes.length; i < l; i++) {
        var node = nodes[i];
        if(typeof node === 'string') {
          var text = document.createTextNode(node);
          dom.appendChild(text);
        } else {
          dom.appendChild(node());
        }
      }
    } else if(typeof nodes === 'object') {
      for(var key in nodes) {
        dom.setAttribute(key, nodes[key]);
      }
    } else {
      dom.innerHTML = nodes;
    }
    return dom;
  };
}



  // var dom = document.createElement(tag);
  // for(var key in attrs) {
  //  dom.setAttribute(key, attrs[key]);
  // }
 //  return dom;