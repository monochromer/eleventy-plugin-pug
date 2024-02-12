const pug = require('pug');

module.exports = function(eleventyConfig, userOptions = {}) {
  const basePugOptions = Object.assign({
    basedir: eleventyConfig.dir.input,
    cache: false,
    filters: eleventyConfig.javascriptFunctions
  }, userOptions.pugOptions);

  eleventyConfig.addTemplateFormats('pug');

  eleventyConfig.addExtension('pug', {
    compileOptions: {
      permalink(inputContent, inputPath) {
        return function(data) {
          return data.permalink
        }
      }
    },

    async compile(inputContent, inputPath) {
      if (typeof userOptions.filter === 'function' && !userOptions.filter(inputContent, inputPath)) {
        return;
      }

      const compileOptions = Object.assign(basePugOptions, { filename: inputPath });
      const renderFunction = pug.compile(inputContent, compileOptions);
      this.addDependencies(inputPath, renderFunction.dependencies);

      return function(data) {
        const functions = {};
        for(const [name, func] of Object.entries(eleventyConfig.javascriptFunctions)) {
          functions[name] = func.bind(data);
        }
        data.functions = functions;

        return renderFunction(data);
      }
    }
  });
}