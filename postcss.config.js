var yargs = require('yargs');

// 可以在这里实现基于不同的页面文件夹使用不同的 postcss 配置
// var argv = yargs.argv;
// var __page__ = argv.__page__;

module.exports = {
    plugins: [
        require('postcss-hairline'),
        require('postcss-px2rem')({
            remUnit: 75 // 设计稿宽度除以 10, 参考 https://github.com/amfe/article/issues/17
        })
    ]
};