
/**
 * Expose 'x'
 */

module.exports = x;


/**
 * x constructor.
 * @api public
 */

function x(tag, label) {
  var dom = document.createElement(tag);
  return function() {
    if(label instanceof Array) {
      for(var i = 0, l = label.length; i < l; i++) {
        dom.appendChild(label[i]());
      }
    } else {
      dom.innerHTML = label;
    }
    return dom;
  };
}



  // var dom = document.createElement(tag);
  // for(var key in attrs) {
  //  dom.setAttribute(key, attrs[key]);
  // }
 //  return dom;