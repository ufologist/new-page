import Vue from 'vue';
import VueRouter from 'vue-router';
import QsMan from 'qsman';

Vue.use(VueRouter);

var queryParam = new QsMan(window.location.search).getObject();

/**
 * 基础路由器
 * 
 * 目前提供的扩展
 * - 404 机制(当未匹配到路由规则时的处理机制)
 * - 自动更新页面标题(在路由切换时自动更新标题 `meta.title`)
 * - 自动上报 PV(在路由切换时自动上报, 需自定义实现 `meta.xxx`)
 * - 从 URL 参数中指定路由并统一输入参数(用于解决 hash 路由模式时, 参数夹杂在 URL querystring 和 hash 里面引起的疑惑和风险)
 */
export default class BaseRouter extends VueRouter {
    /**
     * 
     * 未匹配到路由规则时的 redirect 机制(404机制)
     * - 什么都不设置时, 跳转到默认页面
     * - 当 `extOptions.redirect404Page` 设置为非空字符串时, 跳转到 `redirect404Page` 指定的页面
     * - 当 `extOptions.redirect404Page` 设置为 `falsy` 时, 重定向到默认的 path: `/`
     * - 当 `extOptions.redirect404Page` 设置为 `falsy` 并同时设置 `extOptions.redirect404Path` 时, 重定向到 `redirect404Path` 指定的 path
     * 
     * @param {*} options 与 VueRouter 一样
     * @param {object} [extOptions] 扩展选项
     * @param {string} [extOptions.redirect404Page] 未匹配到路由规则时跳转到的页面
     * @param {string} [extOptions.redirect404Path] 未匹配到路由规则时重定向到的 path
     */
    constructor(options, extOptions = {}) {
        var redirect404Page = typeof extOptions.redirect404Page !== 'undefined' ? extOptions.redirect404Page : `${process.env.VUE_APP_COMMON_ERROR_PAGE}?message=${encodeURIComponent('抱歉，你访问的页面不存在')}&errorCode=404`;
        var redirect404Path = extOptions.redirect404Path || '/';

        options.routes.push({
            path: '*',
            redirect: function(to) {
                if (redirect404Page) { // 跳转到某个页面
                    window.location.replace(redirect404Page);
                } else { // 重定向到某个 path
                    return {
                        path: redirect404Path,
                        query: to.query
                    };
                }
            }
        });

        super(options);
        this.routeByQueryString();
        this.updateDocumentTitle();
        this.reportPv();
    }

    /**
     * 从 URL 参数中指定路由
     */
    routeByQueryString() {
        this.beforeEach(function(to, from, next) {
            var queryStringRoutePath = queryParam._path;

            if (queryStringRoutePath && queryStringRoutePath !== '/' && to.path === '/') {
                delete queryParam._path;
                next({
                    replace: true,
                    path: queryStringRoutePath,
                    query: queryParam
                });
            } else {
                next();
            }
        });
    }

    /**
     * 通过 `meta.title` 更新页面标题
     * 
     * 另外的实现方案有: vue-meta
     */
    updateDocumentTitle() {
        this.beforeEach(function(to, from, next) {
            var meta = to.meta || {};
            if (meta.title) {
                // 原来老版本微信需要通过 iframe 的 hack 方式才能动态修改页面标题
                // https://github.com/deboyblog/vue-wechat-title
                // 现在测试了一下 iOS 和 Android, 发现不需要再使用 hack 技巧了
                // 微信 iOS 6.5.6 终于支持单页应用使用 document.title 来设置标题 | 2017-3-28
                // https://zhuanlan.zhihu.com/p/26050578
                document.title = meta.title;
            }
            next();
        });
    }

    /**
     * 获取 `meta.xxx` 中的参数上报 PV
     * 
     * @abstract
     */
    reportPv() {
        this.beforeEach(function(to, from, next) {
            var meta = to.meta || {};
            // TODO 在这里实现获取上报参数
            var todo = meta.todo || {};
            try {
                // TODO 在这里实现上报 PV
            } catch (error) {
                console.warn('reportPv', error);
            }
            next();
        });
    }
}