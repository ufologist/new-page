var fs = require('fs');
var childProcess = require('child_process');

var yargs = require('yargs');
var webpack = require('webpack');
var dotenv = require('dotenv');

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

var latestGitLog = getLatestGitLog();
// 环境变量
process.env.VUE_APP_PAGE = __page__;
loadPageEnv(__page__);

var publicPath = './';
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
    chainWebpack: function(webpackConfig) {
        console.log('----DefinePlugin----');
        console.log(resolveClientEnv(publicPath));
        console.log('--------------------');

        // zepto 模块需要导入 window
        webpackConfig.module.rule('zepto')
                            .test(require.resolve('zepto'))
                            .use('imports-loader/zepto')
                            .loader('imports-loader?this=>window');

        webpackConfig.plugin('banner')
                     .use(webpack.BannerPlugin, [`${pkg.name}/${__page__} | ${latestGitLog} | (c) ${pkg.author}`]);
    }
};