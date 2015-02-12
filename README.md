# grout

Grout is a declarative way to create DOM elements and efficiently update them whenever data changes. Also called virtual-dom it is the perfect companion for [brick](http://github.com/brickjs).

```js
var inception = dom('ul', [
  dom('li', 'Hello'),
  dom('li', '${name}')
]);

inception({
  name: 'bredele'
});
```
[see live]()

Both [brick](http://github.com/brickjs) and grout promote clean and maintainable rendering logic. Their speed as well as their combined weight (only 3kb) makes them ideal for desktop and mobile.

## Learn it in 3

### create

Create a DOM element

```js
var btn = dom('button');
btn();
// => <button></button>
```

with a text content

```js
var btn = dom('button', 'Hello world!');
btn();
// => <button>Hello world!</button>
```

and quickly append multiple DOM nodes.

```js
var inception = dom('ul', [
  dom('li', 'first item'),
  dom('li', 'second item')
]);
inception();
```

Grout keeps manual DOM manipulation out of your application code.

### attributes

Create attributes 

```js
var btn = dom('button', {
  id: 'btn',
  class: 'dark'
});
btn();
// => <button id="btn" class="dark"></button>
```

and attach event listeners

```js
var btn = dom('button', {
  id: 'btn',
  onclick: function() {
    // do something
  }
});
btn();
```
it is that easy!

### observable

Bind a DOM element with some data

```js
var btn = dom('button', 'Hello ${name}!');
btn({
  name: 'bredele'
});
// => <button>Hello bredele</button>
```

and update it whenever the data changes

```js
btn({
  name: 'olivier'
});
// => <button>Hello olivier</button>
```

It is blazing fast and works with every DOM nodes

```js
var btn = dom('button', {
  class: '${type}'
}, 'Hello ${name}');

btn({
  name: 'olivier',
  type: 'developer'
});
// => <button class="developer">Hello olivier</button>
```

## Advanced

### Use with [datastore](http://github.com/bredele/datastore)

```js
var store = new Store();

var btn = dom('button', '${name}');
btn(store);

store.set('name', 'bredele');
// => <button>bredele</button>

store.set('name', 'olivier');
// => <button>olivier</button>
```

### Use with [brick](http://github.com/bredele/brickjs)

```js
var list = brick(
  dom('ul', [
    dom('li', 'hello ${name}'),
    dom('li', [
      dom('button', {
        class: 'btn ${repo}'
      }, 'welcome!')
    ])
  ])
);

list.set({
  name: 'olivier',
  repo: 'grout'
});
```

## License

The MIT License (MIT)

Copyright (c) 2014 Olivier Wietrich <olivier.wietrich@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
