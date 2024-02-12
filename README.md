# Eleventy plugin for Pug template engine

## Installation

```shell
npm install @web-alchemy/eleventy-plugin-pug
```

## Usage

```javascript
// eleventy.config.js
const pugPlugin = require('../eleventy.config.js');

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(pugPlugin, {
    // https://pugjs.org/api/reference.html#options
    pugOptions: {},
    
    // optional `filter` function to check, which templates should render and which not
    filter(inputContents, inputPath) {
      return true;
    }
  });
}
```

See usage example in repo.