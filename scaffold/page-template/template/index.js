// 第三方模块
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import Vue from 'vue';
import * as fundebug from 'fundebug-javascript';
import fundebugVue from 'fundebug-vue';

// 业务通用模块
<% if (router) { %>import BaseRouter from '../../lib/base-router.js';<% } %>

// 业务模块
import Index from './index.vue';
<% if (router) { %>import Home from './pages/home/home.vue';<% } %>

// 异常监控
if (process.env.NODE_ENV === 'production') {
    fundebug.apikey = process.env.VUE_APP_EXCEPTION_MONITOR_APIKEY;
    fundebugVue(fundebug, Vue);
}

<% if (router) { %>
Vue.use(BaseRouter);
var router = new BaseRouter({
    routes: [{
        path: '/',
        component: Home,
        meta: {
            title: 'Home'
        }
    }]
});
<% } %>

new Vue({
    <% if (router) { %>router: router,<% } %>
    render: function(h) {
        return h(Index);
    }
}).$mount('.js-app');

// 移除骨架屏
try {
    document.body.removeChild(document.querySelector('.skeleton'));
} catch (error) {
    console.error('remove skeleton error', error);
}