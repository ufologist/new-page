<template>
<div class="index">
    <div class="index__demo"></div>
    <h1 class="index__title">常用公共库使用示例</h1>

    <h2 class="index__section"><a href="https://github.com/ufologist/qsman" target="_blank">URL Params</a></h2>
    <div class="index__example">
        <pre>{{ urlParams }}</pre>
    </div>

    <h2 class="index__section"><a href="https://github.com/ufologist/standard-http-client" target="_blank">HTTP</a></h2>
    <div class="index__example">
        <pre>{{ backendData }}</pre>
        <button type="button" @click="sendRequestSuccess">HTTP success</button>
        <button type="button" @click="sendRequestFail">HTTP fail</button>
    </div>

    <h2 class="index__section"><a href="https://github.com/skaterdav85/validatorjs" target="_blank">Validator</a></h2>
    <div class="index__example">
        <input type="text" v-model="input" placeholder="email">
        <div v-if="isValid">isValid: {{ isValid }}</div>
        <div v-if="error" style="color:red">{{ error }}</div>
        <button type="button" @click="validate">validate</button>
    </div>

    <h2 class="index__section"><a href="https://github.com/js-cookie/js-cookie" target="_blank">Cookie</a></h2>
    <div class="index__example">
        <pre>{{ cookie }}</pre>
    </div>

    <h2 class="index__section"><a href="https://github.com/ufologist/in-which-browser" target="_blank">UA os/browser</a></h2>
    <div class="index__example">
        <pre>os: {{ os }}</pre>
        <pre>browser: {{ browser }}</pre>
    </div>

    <h2 class="index__section"><a href="https://lodash.com/docs/" target="_blank">Utils - Lodash - npm package</a></h2>
    <div class="index__example">
        <pre>isPlainObject: {{ isPlainObject }}</pre>
    </div>

    <h2 class="index__section"><a href="https://github.com/iamkun/dayjs" target="_blank">Date Format</a></h2>
    <div class="index__example">
        <pre>{{ dateString }}</pre>
    </div>

    <h2 class="index__section"><a href="https://github.com/Mottie/javascript-number-formatter" target="_blank">Number Format</a></h2>
    <div class="index__example">
        <pre>{{ numberString }}</pre>
    </div>

    <h2 class="index__section"><a href="https://github.com/blueimp/JavaScript-MD5" target="_blank">MD5</a></h2>
    <div class="index__example">
        <pre>{{ md5Hex }}</pre>
    </div>

    <h2 class="index__section"><a href="https://github.com/omichelsen/compare-versions" target="_blank">Compare semver</a></h2>
    <div class="index__example">
        <pre>{{ versionCompareResult }}</pre>
    </div>

    <h2 class="index__section"><a href="https://github.com/cure53/DOMPurify" target="_blank">XSS sanitizer</a></h2>
    <div class="index__example">
        <label style="font-size: 0.3em"><input v-model="enableXssSanitizer" type="checkbox">Prevent XSS attacks</label>
        <textarea v-model="xss" placeholder="XSS" rows="10" style="width: 100%"></textarea>
        <div v-html="html"></div>
        <pre>{{ html }}</pre>
    </div>

    <h2 class="index__section"><a href="https://github.com/nbubna/store" target="_blank">Storage</a></h2>
    <div class="index__example">
        <pre>{{ demoStore }}</pre>
        <button type="button" @click="getStorage">Get Storage</button>
    </div>

    <h2 class="index__section"><a href="https://github.com/madrobby/zepto" target="_blank">DOM</a></h2>
    <div class="index__example">
        <pre ref="dom"></pre>
        <button type="button" @click="updateDom">Update DOM</button>
    </div>

    <h2 class="index__section"><a href="https://github.com/zenorocha/clipboard.js" target="_blank">Clipboard</a></h2>
    <div class="index__example">
        <button type="button" @click="initCopy">Init Copy</button>
        <button class="js-copy-trigger" type="button" data-clipboard-text="Just because you can doesn't mean you should — clipboard.js">Copy</button>
    </div>

    <h2 class="index__section"><a href="https://github.com/juliangarnier/anime/" target="_blank">Animation</a> | <a href="https://daneden.github.io/animate.css/">Animate.css</a></h2>
    <div class="index__example">
        <div ref="animationDom" style="width:28px;height:28px;background-color:#FF8F42"></div>
        <button class="index__animate-shake" type="button" @click="animate">Animate</button>
    </div>

    <h2 class="index__section"><a href="https://github.com/muicss/loadjs" target="_blank">Load JS/CSS</a></h2>
    <div class="index__example">
        <div ref="lottieLoading"></div>
        <div ref="lottieContainer"></div>
        <button type="button" @click="loadJs">Load Js(lottie)</button>
    </div>

    <h2 class="index__section"><a href="https://github.com/blueimp/JavaScript-Load-Image" target="_blank">Load Image</a></h2>
    <div class="index__example">
        <pre>{{ imageMeta }}</pre>
        <div ref="loadedImage"></div>
        <button type="button" @click="loadImage">Load Image</button>
    </div>

    <h2 class="index__section"><a href="https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html" target="_blank">WX-JSSDK</a></h2>
    <div class="index__example">
        <button type="button" @click="wxConfig">wx.config</button>
    </div>

    <h2 class="index__section"><a href="https://github.com/soldair/node-qrcode" target="_blank">QRCode</a></h2>
    <div class="index__example">
        <button type="button" @click="generateQrcode">QRCode</button>
        <img :src="qrcodeUrl">
    </div>

    <h2 class="index__section"><a href="https://github.com/niklasvh/html2canvas" target="_blank">HTML2Canvas</a></h2>
    <div class="index__example">
        <div ref="testContent" style="padding: 10px; background: #f5da55">
            <h4 style="color: #000;">Hello world!</h4>
        </div>
        <button type="button" @click="html2canvas">html2canvas</button>
        <img :src="htmlImgUrl" :width="htmlImgWidth" :height="htmlImgHeight">
    </div>

    <h2 class="index__section"><a href="https://github.com/ufologist/model-adapter" target="_blank">ModelAdapter</a></h2>
    <div class="index__example">
        <pre>source: {{ source }}</pre>
        <pre>model: {{ model }}</pre>
        <button type="button" @click="adapter">adapter</button>
    </div>

    <h2 class="index__section">PAGE_DATA</h2>
    <div class="index__example">
        <pre>{{ pageData }}</pre>
    </div>
</div>
</template>

<script>
// 解析 URL 参数
import QsMan from 'qsman';
// Cookie
import Cookies from 'js-cookie';
// UA 浏览器信息
import inWhichBrowser from 'in-which-browser';
// DOM
import $ from 'zepto';
// 常用工具函数都通过安装独立的 lodash 包来解决
import isPlainObject from 'lodash.isplainobject';
// XSS
import DOMPurify from 'dompurify';
// 处理日期
import dayjs from 'dayjs';
// 处理数字
import formatNumber from 'number-format.js';
// MD5
import md5 from 'blueimp-md5';
// 比较版本号
import compareVersions from 'compare-versions';
// 本地存储: localStorage/sessionStorage
import store from 'store2';
// 二维码
import QRCode from 'qrcode';
// 复制 sindresorhus/copy-text-to-clipboard 更小巧
import Clipboard from 'clipboard';
// DOM 生成图片
import html2canvas from 'html2canvas';
// 动画
import anime from 'animejs';
// 动态加载 JS/CSS 文件(可用于优化性能, 加载第三方独立库, 例如微信JSSDK), 推荐将 loadjs 整个 inline 到 HTML 里面
import load from 'loadjs';
// 加载图片
import loadImage from 'blueimp-load-image';
// 增强数据兼容
import ModelAdapter from 'model-adapter';

// 发送 HTTP 请求
import httpClient from '../../lib/http-client.js';
// 验证数据
import validator from '../../lib/validator.js'

var apiRoot = process.env.VUE_APP_API_ROOT;

export default {
    data: function() {
        return {
            cookie: Cookies.get(),
            urlParams: new QsMan(window.location.search).getObject(),
            os: inWhichBrowser.os,
            browser: inWhichBrowser.browser,
            dateString: dayjs().format('YYYY-MM-DD'),
            numberString: formatNumber('#,###.00', 1234567890.0987654321),
            md5Hex: md5('123456'),
            versionCompareResult: compareVersions.compare('10.1.8', '10.0.4', '>'),
            imageMeta: null,
            demoStore: null,
            backendData: null,
            qrcodeUrl: null,
            htmlImgUrl: null,
            htmlImgWidth: null,
            htmlImgHeight: null,
            source: {
                name: null,
                age: 18,
                extData: null
            },
            enableXssSanitizer: true,
            xss: '<img src=x onerror=alert(1)//>',
            model: null,
            input: '',
            isValid: null,
            error: null,
            pageData: window.PAGE_DATA,
            isPlainObject: isPlainObject({})
        };
    },
    computed: {
        html: function() {
            if (this.enableXssSanitizer) {
                return DOMPurify.sanitize(this.xss);
            } else {
                return this.xss;
            }
        }
    },
    methods: {
        updateDom: function() {
            $(this.$refs.dom).text(`updated: ${new Date().getTime()}`);
        },
        generateQrcode: function() {
            QRCode.toDataURL(`https://baidu.com?_=${new Date().getTime()}`, (error, dataUrl) => {
                this.qrcodeUrl = dataUrl;
            });
        },
        wxConfig: function() {
            // 这里仅演示 API 的用法, 实际应该调用后端的接口来获取下面的这些参数
            wx.config({
                debug: process.env.NODE_ENV === 'production' ? false : true,
                appId: '1',
                timestamp: '2',
                nonceStr: '3',
                signature: '4',
                jsApiList: []
            });

            wx.error(function(res) {
                alert('wx.config error: ' + JSON.stringify(res));
            });

            wx.ready(function() {
                alert('wx.ready');
            });

            // 不调用 wx.config 授权也能使用的 API: getNetworkType previewImage closeWindow
            wx.getNetworkType({
                success: function(res) {
                    alert(res.networkType);
                },
                fail: function(res) {
                    alert('wx.getNetworkType fail: ' + JSON.stringify(res));
                }
            });
        },
        getStorage: function() {
            store.set('demo', {
                now: new Date().getTime()
            });
            this.demoStore = store.get('demo');
        },
        initCopy: function() {
            var clipboard = new Clipboard('.js-copy-trigger');
            clipboard.on('success', function(event) {
                event.clearSelection();
                alert('已复制');

                console.info('Action:', event.action);
                console.info('Text:', event.text);
                console.info('Trigger:', event.trigger);
            });
            clipboard.on('error', function(event) {
                console.error('Action:', event.action);
                console.error('Trigger:', event.trigger);
            });
        },
        animate: function() {
            anime({
                targets: this.$refs.animationDom,
                translateX: anime.random(0, 200)
            });
        },
        loadJs: function() {
            this.$refs.lottieLoading.textContent = 'loading...';
            load('//cdn.bootcss.com/bodymovin/5.6.4/lottie.min.js', () => {
                this.$refs.lottieContainer.textContent = '';
                var animation = lottie.loadAnimation({
                    container: this.$refs.lottieContainer,
                    path: 'https://cdn.jsdelivr.net/gh/airbnb/lottie-web@48ceb652451c08c4f0f29a7df7f6442f630d0570/demo/adrock/data.json',
                    renderer: 'svg',
                    loop: true,
                    autoplay: true,
                    name: 'Hello World'
                });
                animation.addEventListener('data_ready', () => {
                    this.$refs.lottieLoading.textContent = '';
                });
            });
        },
        loadImage: function() {
            this.imageMeta = 'loading...';
            loadImage('//vuejs.org/images/logo.png', (imgOrCanvasOrEvent, data) => {
                if (imgOrCanvasOrEvent.type === 'error') {
                    this.imageMeta = 'error';
                    console.error('Error loading image', imgOrCanvasOrEvent);
                } else {
                    this.$refs.loadedImage.innerHTML = '';
                    this.$refs.loadedImage.appendChild(imgOrCanvasOrEvent);
                    this.imageMeta = data;
                }
            });
        },
        html2canvas: function() {
            html2canvas(this.$refs.testContent).then(canvas => {
                this.htmlImgWidth = this.$refs.testContent.clientWidth;
                this.htmlImgHeight = this.$refs.testContent.clientHeight;
                this.htmlImgUrl = canvas.toDataURL();
            });
        },
        sendRequestSuccess: function() {
            httpClient.send({ // axios Request Config
                url: `${apiRoot}/api`
            }).then(([data]) => {
                this.backendData = data;
            });
        },
        sendRequestFail: function() {
            httpClient.send({ // axios Request Config
                url: 'https://localhost/path/to/miss'
            }).then(function([data]) {
                console.log(data);
            });
        },
        adapter: function() {
            this.model = new ModelAdapter(this.source, {
                name: 'Guest',
                extData: {
                    country: {
                        name: 'China'
                    }
                }
            });
        },
        validate: function() {
            if (validator(this.input, 'required|email')) {
                this.isValid = true;
                this.error = null;
            } else {
                this.isValid = false;
                this.error = 'required|email';
            }
        }
    }
};
</script>

<style lang="less" scoped>
.index {
    &__demo {
        padding-top: 26%; /* 等比例占位 = 图片宽度 / 图片高度 */
        background-image: url("./res/demo.png");
        background-repeat: no-repeat;
        background-size: contain;
    }

    &__title {
        font-size: 36px;
    }
    &__section {
        padding-top: 18px;
        padding-bottom: 18px;
        border-bottom: 1px solid #000; /* hairline */
        margin-bottom: 0;
        font-size: 26px;
    }
    &__example {
        padding: 18px;
        background-color: #f0f5ff;
    }

    &__qrcode {
        width: 200px;
        height: 200px;
    }

    &__animate-shake {
        animation-name: shake;
        animation-duration: 1s;
        animation-fill-mode: both;
        animation-iteration-count: infinite;
    }

    @keyframes shake {
        from,
        to {
            -webkit-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
        }

        10%,
        30%,
        50%,
        70%,
        90% {
            -webkit-transform: translate3d(-10px, 0, 0);
            transform: translate3d(-10px, 0, 0);
        }

        20%,
        40%,
        60%,
        80% {
            -webkit-transform: translate3d(10px, 0, 0);
            transform: translate3d(10px, 0, 0);
        }
    }

    pre {
        font-size: 20px;
    }
}
</style>
