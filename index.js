

module.exports = function(tag, content) {
  var el = document.createElement(tag);
  return function(data) {
    if(typeof content === 'string') el.innerText = content;
    else if(content) el.appendChild(content);
    return el;
  };
};

