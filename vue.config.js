var fs = require('fs');
var childProcess = require('child_process');

var yargs = require('yargs');
var webpack = require('webpack');
var dotenv = require('dotenv');
var Est = require('less-plugin-est');

var pkg = require('./package.json');

var argv = yargs.argv;

var __page__ = argv.__page__;

if (!__page__) {
    console.error('请传入 __page__ 参数指定要构建的页面文件夹, 例如: npm start -- --__page__=demo');
    process.exit(1);
    return;
}

/**
 * 获取 Git 最近一次的提交日志
 * 
 * @return {string}
 */
function getLatestGitLog() {
    var log = '';
    try {
        log = childProcess.execSync('git log -1 --pretty=format:"%h %cd" --date=iso').toString();
    } catch (error) {
        console.warn('getLatestGitLog error', error.message);
    }
    return log;
}

/**
 * 加载 dotenv 环境配置
 * 
 * @param {string} filePath 
 */
function loadEnv(filePath) {
    var env = {};

    if (fs.existsSync(filePath)) {
        var result = dotenv.config({
            path: filePath
        });
        if (result.error) {
            console.warn(filePath, result.error);
        } else {
            env = result.parsed || {};
        }
    }

    return env;
}

/**
 * 用页面文件夹下的环境配置覆盖全局的环境配置
 * 
 * @param {string} page
 */
function loadPageEnv(page) {
    var pageBaseEnv = loadEnv(`src/pages/${page}/.env`);
    var pageModeEnv = loadEnv(`src/pages/${page}/.env.${process.env.NODE_ENV}`);
    var pageEnv = Object.assign(pageBaseEnv, pageModeEnv);
    for (var key in pageEnv) {
        process.env[key] = pageEnv[key];
    }
}

// https://github.com/vuejs/vue-cli/blob/01e36f30cfbc82814cf0fea8da1c408667daa052/packages/%40vue/cli-service/lib/util/resolveClientEnv.js
function resolveClientEnv(publicPath, raw) {
  const prefixRE = /^VUE_APP_/

  const env = {}
  Object.keys(process.env).forEach(key => {
    if (prefixRE.test(key) || key === 'NODE_ENV') {
      env[key] = process.env[key]
    }
  })
  env.BASE_URL = publicPath

  if (raw) {
    return env
  }

  for (const key in env) {
    env[key] = JSON.stringify(env[key])
  }
  return {
    'process.env': env
  }
}

var publicPath = './';
var latestGitLog = getLatestGitLog();
var transpileDependencies = Object.keys(pkg.dependencies).filter(function(dependency) {
    // 有些第三方库可以确定不做 transpile 的, 可以在这里排除掉
    var ignoreDependency = [];
    return ignoreDependency.indexOf(dependency) === -1;
});
// 环境变量
process.env.VUE_APP_PAGE = __page__;
loadPageEnv(__page__);

module.exports = {
    publicPath: publicPath,
    outputDir: `dist/${__page__}`,
    pages: {
        index: {
            entry: `src/pages/${__page__}/index.js`,
            template: `src/pages/${__page__}/index.html`
        }
    },
    devServer: {
        open: true,
        disableHostCheck: true
    },
    productionSourceMap: false,
    css: {
        loaderOptions: {
            less: {
                plugins: [
                    new Est()
                ],
                javascriptEnabled: true
            }
        }
    },
    // 默认情况下 babel-loader 会忽略所有 node_modules 中的文件
    // 如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来
    // 这会为该依赖同时开启语法转换和根据使用情况检测 polyfill
    // 这个配置同样不能对第三方依赖的依赖产生作用, 好在这种问题的概率一般很小, 但都是第三方依赖, 谁说得准呢
    // 因此还是建议上线前使用低版本的浏览器(例如 chrome 40 版本)测试一下(主要是语法方面的例如箭头函数)
    // 对于 JS 各版本支持的环境做到心中有数
    // ES5(基本上现代的浏览器都支持, 不用考虑太多兼容性问题)
    // - IE9+, Chrome23+, Firefox21+
    // - iOS6+, Android4.4+
    // - Node8.10+
    // https://caniuse.com/#feat=es5
    // ES2015
    // - Chrome51+, IE11+, Edge12+, Firefox54+
    // - iOS10+, Android5+
    // - Node8.10+
    // https://caniuse.com/#feat=es6
    transpileDependencies: process.env.NODE_ENV === 'production' ? transpileDependencies : [],
    chainWebpack: function(webpackConfig) {
        var isDev = process.env.NODE_ENV === 'development';
        var isProd = process.env.NODE_ENV === 'production';

        console.log('----DefinePlugin----');
        console.log(resolveClientEnv(publicPath));
        console.log('--------------------');

        // zepto 模块需要导入 window
        webpackConfig.module.rule('zepto')
                            .test(require.resolve('zepto'))
                            .use('imports-loader/zepto')
                            .loader('imports-loader?this=>window');

        // 代码的全局注释
        webpackConfig.plugin('banner')
                     .use(webpack.BannerPlugin, [`${pkg.name}/${__page__} | ${latestGitLog} | (c) ${pkg.author}`]);

        if (isProd) {
            // 压缩图片
            var imageLoaderOptions = {
                optipng: {
                    // optipng 压缩很慢, 而且压缩的效果不好, 只使用 pngquant 就好了
                    enabled: false,
                    optimizationLevel: 7
                },
                gifsicle: {
                    interlaced: false
                },
                pngquant: {
                    quality: '75-90',
                    speed: 4
                },
                mozjpeg: {
                    progressive: true,
                    quality: 75
                }
            };
            webpackConfig.module.rule('images')
                                .use('image-loader')
                                .loader('image-webpack-loader-coding-net-vendor').options(imageLoaderOptions);
        }
    }
};