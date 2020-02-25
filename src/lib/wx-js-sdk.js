import httpClient from './http-client.js';

// 是否已经执行过 wx.config
var isConfig = false;

/**
 * 注入权限验证配置
 * 
 * @param {Array<string>} [jsApiList=DEFAULT_JS_API_LIST] 
 * 
 * @see https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html#4
 */
function wxConfig(jsApiList = DEFAULT_JS_API_LIST) {
    if (isConfig) {
        return;
    }

    httpClient.send({
        url: '/wx-config', // 仅作示例
        _data: {
            // 参与 wx.config 签名的, 必须是当前网页的URL(不包含#及其后面部分)
            url: window.location.href.split('#')[0]
        }
    }).then(function([data]) {
        wx.config({
            debug: process.env.NODE_ENV === 'production' ? false : true,
            appId: data.appId,
            timestamp: data.timeStamp,
            nonceStr: data.nonceStr,
            signature: data.signature,
            jsApiList: jsApiList
        });

        wx.error(function(res) {
            alert('wx.config error: ' + JSON.stringify(res));
        });
    }, function() {
        isConfig = false;
    });
    // 乐观估计肯定会执行到 wx.config
    // 但也考虑了在 reject 时重置 isConfig 为 false, 这样就可以再次执行 wxConfig 方法了
    isConfig = true;
}

export const DEFAULT_JS_API_LIST = [
    'updateAppMessageShareData', // 1.4.0
    'updateTimelineShareData',   // 1.4.0
    'onMenuShareAppMessage',     // 即将废弃
    'onMenuShareQQ',             // 即将废弃
    'onMenuShareTimeline',       // 即将废弃
    'onMenuShareQZone'           // 即将废弃
];

/**
 * 自定义“分享给朋友”及“分享到QQ”按钮的分享内容
 * 
 * @param {string} title 
 * @param {string} desc 
 * @param {string} imgUrl 分享图标, 必须是完整的 URL
 * @param {string} [link=window.location.href] 分享链接, 该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
 * 
 * @see https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html#111
 */
export function updateAppMessageShareData(title, desc, imgUrl, link = window.location.href) {
    wxConfig();

    var params = {
        title: title,
        desc: desc,
        link: link,
        imgUrl: imgUrl
    };

    wx.ready(function() {
        wx.updateAppMessageShareData(params);
        // 兼容老接口
        wx.onMenuShareAppMessage(params);
        wx.onMenuShareQQ(params);
    });
}

/**
 * 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容
 * 
 * @param {string} title 
 * @param {string} imgUrl 分享图标, 必须是完整的 URL
 * @param {string} [link=window.location.href] 分享链接, 该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
 * 
 * @see https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html#112
 */
export function updateTimelineShareData(title, imgUrl, link = window.location.href) {
    wxConfig();

    var params = {
        title: title,
        link: link,
        imgUrl: imgUrl
    };

    wx.ready(function() {
        wx.updateTimelineShareData(params);
        // 兼容老接口
        wx.onMenuShareTimeline(params);
        wx.onMenuShareQZone(params);
    });
}