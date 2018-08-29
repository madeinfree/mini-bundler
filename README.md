# Mini Bundler

這是一個小型 Bundler，支援 commonjs 的 JS 打包，學習 module 系統與自製簡單 module bundler 並且將 Reactjs bundle 完成。

## Installation

```
> git clone this repo
```

## Tools

輔助找檔案用

- @babel/parser
- @babel/traverse

## Uses

```
> node ./MiniBundler/cli.js
```

## 完成目標

- Shallow require
- Deep require
- require vendor module
- Support JSON

## 主要步驟

```
// step 1
// (function() {})();

// step 2
(function(modules) {
  console.log(modules);
})({
  'index.js': function() {
    console.log('Im index');
  }
});

// step 3
將需要 require 的 module 引用進來
透過 babylon -> @babel/parser
與遍歷 traverse -> @babel/traverse
[ './a.js', './b.js' ]

// step 4
透過 traverse 找出來的 require path
開始引入所需要的檔案

// step 5
轉成 template 後，一個一個放入 Require 物件中

// step 6
取用
```

## License

隨意用
