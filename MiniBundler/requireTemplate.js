module.exports = `
  (function(modules) {
    caches = []
    const getCache = function(moduleName) {
      if(!caches[moduleName]) {
        caches[moduleName] = modules[moduleName]
        caches[moduleName].exports = {}
        caches[moduleName].call(caches[moduleName].exports, getCache, caches[moduleName], caches[moduleName].exports)
      }
      return caches[moduleName].exports
    }
    modules['index.js'].call(null, getCache)
  })
`;
