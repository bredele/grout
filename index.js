

module.exports = function(tag) {
  var el = element(tag);
  return function(data) {
    return el;
  };
};

function element(tag) {
  return typeof tag === 'string' ? document.createElement(tag) : tag;
}
