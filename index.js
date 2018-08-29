const myA = require('./a.js');
const data = require('./data.json');
const React = require('./react.js');
const ReactDOM = require('./react-dom.js');
const App = React.createElement('div', null, 'Hello');
console.log(App);
ReactDOM.render(App, document.getElementById('view'));
myA();
console.log(data);
