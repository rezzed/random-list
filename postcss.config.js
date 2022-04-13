const postCssPurge = require('@fullhuman/postcss-purgecss');

// for vue, vite & purgecss see:
// https://github.com/vitejs/vite/issues/331#issuecomment-723438107
// https://purgecss.com/guides/vue.html#usage

module.exports = {
  plugins: [
    postCssPurge({
      content: [`./index.html`, `./src/**/*.vue`],
      defaultExtractor(content) {
        const contentWithoutStyleBlocks = content.replace(/<style[^]+?<\/style>/gi, '');
        return contentWithoutStyleBlocks.match(/[A-Za-z0-9-_/:]*[A-Za-z0-9-_/]+/g) || [];
      },
      safelist: [
        /-(leave|enter|appear)(|-(to|from|active))$/,
        /^(?!(|.*?:)cursor-move).+-move$/,
        /^router-link(|-exact)-active$/,
        /data-v-.*/,
      ],
    }),
  ],
};
