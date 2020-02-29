import Vue from 'vue';
import VueRouter from 'vue-router';
import QsMan from 'qsman';

Vue.use(VueRouter);

var queryParam = new QsMan(window.location.search).getObject();

/**
 * 基础路由器
 * 
 * 目前提供的扩展
 * - 404 机制
 * - 从 URL 参数中指定路由
 * - 上报 PV
 * - 更新页面标题
 */
export default class BaseRouter extends VueRouter {
    /**
     * 
     * @param {*} options 与 VueRouter 一样
     * @param {object} [extOptions] 扩展选项
     * @param {boolean} [extOptions.enable404] 启用默认的未匹配路由规则
     * @param {string} [extOptions.page404Url] 404 页面的 URL
     */
    constructor(options, extOptions = {}) {
        var enable404 = typeof extOptions.enable404 !== 'undefined' ? extOptions.enable404 : true;
        var page404Url = extOptions.page404Url || `${process.env.VUE_APP_COMMON_ERROR_PAGE}?message=${encodeURIComponent('抱歉，你访问的页面不存在')}&errorCode=404`;

        options.routes.push({
            path: '*',
            redirect: function(to) {
                if (enable404) {
                    window.location.replace(page404Url);
                } else { // 返回首页
                    return {
                        path: '/',
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
     * 获取 `meta` 中的参数上报 PV
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