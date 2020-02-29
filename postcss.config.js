var yargs = require('yargs');

// 可以在这里实现基于不同的页面文件夹使用不同的 postcss 配置
// var argv = yargs.argv;
// var __page__ = argv.__page__;

module.exports = {
    plugins: {
        // 如果不自己使用 postcss 配置, vue-cli3 默认是开启了 autoprefixer
        // https://github.com/vuejs/vue-cli/blob/1a0b59142aa8797810ca90705290d960a4ee6d1e/packages/%40vue/cli-service/lib/config/css.js#L87
        autoprefixer: {},
        'postcss-hairline': {},
        'postcss-px2rem': {
            remUnit: 75 // 设计稿宽度除以 10, 参考 https://github.com/amfe/article/issues/17
        }
    }
};