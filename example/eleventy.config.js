const pugPlugin = require('../eleventy.config.js');

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(pugPlugin, {
    // https://pugjs.org/api/reference.html#options
    pugOptions: {},
    filter(inputContents, inputPath) {
      return true;
    }
  });

  eleventyConfig.addFilter('changeCase', function(content, options) {
    if (options.type === 'lower') {
      return content.toLowerCase();
    } else if (options.type === 'upper') {
      return content.toUpperCase();
    } else {
      return content;
    }
  })

  return {
    dir: {
      input: 'src',
      layouts: '_layouts'
    }
  }
}