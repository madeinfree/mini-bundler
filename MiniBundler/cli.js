// step 1
// (function() {})();

// step 2
/**
 * (function(modules) {
    console.log(modules);
  })({
    'index.js': function() {
      console.log('Im index');
    }
  });
 */

// step 3
/**
 * 將需要 require 的 module 引用進來
 * 透過 babylon -> @babel/parser
 * 與遍歷 traverse -> @babel/traverse
 * [ './a.js', './b.js' ]
 */

const fs = require('fs');
const argv = require('process').argv;
const prettier = require('prettier');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const requireTemplate = require('./requireTemplate');
const moduleTemplate = require('./moduleTemplate');

const entryPoint = argv[2];

console.time('[Mini Bundle]');

/**
 * First
 */
let outer;
outer = requireTemplate + '({';

/**
 * Entrypoint code
 */
const code = fs.readFileSync(entryPoint).toString();
const myModule = moduleTemplate
  .replace('{{path}}', entryPoint)
  .replace('{{code}}', code);
outer = outer + myModule;

/**
 * bable parser and traverse
 */
const ast = parser.parse(code);
const deps = [];
const looper = depCode => {
  traverse(depCode, {
    CallExpression(path) {
      if (path.node.callee.name === 'require') {
        var extensionReg = /(?:\.([^.]+))?$/;
        const value = path.node.arguments[0].value;
        let code = '';
        deps.push(value);
        if (!extensionReg.exec(value)[1]) {
          code = fs.readFileSync(value + '.js').toString();
        } else {
          code = fs.readFileSync(value).toString();
        }
        if (extensionReg.exec(value)[1] === 'js') {
          looper(parser.parse(code));
        } else if (!extensionReg.exec(value)[1]) {
          looper(parser.parse(code));
        }
      }
    }
  });
};
looper(ast);

/**
 * dep loop
 */
const replaceCaches = [];
deps.forEach(dep => {
  var extensionReg = /(?:\.([^.]+))?$/;
  let code = '';
  if (!extensionReg.exec(dep)[1]) {
    code = fs.readFileSync(dep + '.js', { encoding: 'utf8' }).toString();
  } else {
    code = fs.readFileSync(dep, { encoding: 'utf8' }).toString();
  }
  if (extensionReg.exec(dep)[1] === 'json') {
    code = `module.exports = ${code}`;
  }
  const template = moduleTemplate
    .replace(/{{path}}/, () => dep)
    .replace(/{{code}}/, () => code);
  replaceCaches.push(template);
});

replaceCaches.forEach(cache => {
  outer = `${outer},${cache}`;
});

// end the bundle
const end = '})';
outer = outer + end;

// prettier code
const finalCode = prettier.format(outer, { semi: true, parser: 'babylon' });

// write dist bundle file
fs.writeFileSync('./dist/bundle.js', finalCode);

// Finish ;-)
console.log('Bundle Finish.');
console.timeEnd('[Mini Bundle]');
