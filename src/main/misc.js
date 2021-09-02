const { NodeHtmlMarkdown } = require('node-html-markdown');
const generator = require('generate-password');
const { optimize } = require('svgo');
const imageSizeOf = require('image-size');

module.exports = {
  html2md: (html) => {
    return NodeHtmlMarkdown.translate(html, {}, undefined);
  },
  password: (opts) => {
    const passwords = generator.generateMultiple(1, opts);
    return passwords[0];
  },
  svgo: (value) => {
    return optimize(value, {
      multipass: true,
    });
  },
  imageSize: (path) => {
    const dimensions = imageSizeOf(path);
    return { width: dimensions.width, height: dimensions.height };
  },
};
