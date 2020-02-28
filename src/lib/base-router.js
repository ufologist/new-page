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
}