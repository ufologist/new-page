# 第三方库筛选记录

## 验证库

需求: 纯JS/同步/异步/schema/使用方便/扩展方便
* https://github.com/skaterdav85/validatorjs 借鉴自 Laravel

备选
* https://github.com/ansman/validate.js
* https://github.com/yiminghe/async-validator 只能异步验证
* https://github.com/ianstormtaylor/superstruct
* https://github.com/kaelzhang/skema 同步/异步都可以, 类似 joi
* https://github.com/validatorjs/validator.js 只直接验证字符串
* https://github.com/dleitee/valid.js 直接验证值的那种, 内置了一些规则
* https://github.com/imbrn/v8n 基于 Proxy, 需要注意兼容性
* https://github.com/hapijs/joi 社区很好, 功能强大, 就是 size 也有点大
* https://github.com/jquense/yup 与 joi 类似
* https://github.com/icebob/fastest-validator
* https://github.com/eivindfjeldstad/validate
* https://github.com/psvet/obey
* https://github.com/tgriesser/checkit
* https://github.com/guillaumepotier/validator.js
* https://github.com/flatiron/revalidator 年久失修
* https://github.com/CharlGottschalk/approvejs 年久失修
* https://github.com/axetroy/struct 和 superstruct 类似, 但年久失修了
* https://github.com/oussamahamdaoui/forgJs 使用的人很少

## 动画库

需求: CSS/SVG/DOM/Object 都能动
* https://github.com/juliangarnier/anime 文档浅显易懂, 每个 demo 都很到位, 功能强大又简单实用

备选
* https://popmotion.io/pure 需要学一些新概念(Action/Pointer等等), 支持 Physics and velocity
* http://github.com/thednp/kute.js 文档没有 anime 清晰, 动画主要针对于 CSS 和 SVG, 通过插件机制扩展(SVG/CSS/Text/Attribute), 和 anime 类似
* https://github.com/tweenjs/tween.js 基础底层的 tween 方法
* https://github.com/jeremyckahn/shifty 基础底层的 tween 方法, 相比 tween.js 的功能更多一些
* https://github.com/mojs/mojs SVG 的概念居多, 用起来不是很直观
* https://github.com/julianshapiro/velocity 停滞了
* https://github.com/michaelvillar/dynamics.js 停滞了
* https://popmotion.io/popcorn Lodash of animation.
* https://greensock.com 收费
* https://github.com/airbnb/lottie-web 如果设计师在 AE 做了一个动画让你用代码实现
* https://github.com/sergey-pimenov/awesome-web-animation

## 加密算法

需求: 依赖少/适用于 Web 和 Node
* https://github.com/blueimp/JavaScript-MD5

备选
* https://github.com/brix/crypto-js
* https://github.com/h2non/jshashes
* https://github.com/emn178/js-md5

## 本地存储

需求: key/value 存储
* https://github.com/nbubna/store

备选
* https://github.com/ZaDarkSide/simpleStorage
* https://github.com/marcuswestin/store.js
* https://github.com/localForage/localForage

## 比较版本

需求: 比较 semver 版本号
* https://github.com/omichelsen/compare-versions

备选
* https://github.com/alanclarke/semverbs
* https://github.com/npm/node-semver The semver parser for node (the one npm uses)

## Loader

需求: 动态加载 JS/CSS 文件
* https://github.com/muicss/loadjs

备选
* https://github.com/ded/script.js 只能加载 JS 文件
* https://github.com/youzan/tiny-loader.js 自动判断文件类型(不能指定)
* https://github.com/getify/LABjs
* https://github.com/SlexAxton/yepnope.js/
* https://github.com/CapMousse/include.js 支持 CSS
* https://github.com/filamentgroup/loadCSS 只能加载 CSS 文件

## 格式化数字

需求: 格式化数字
* https://github.com/Mottie/javascript-number-formatter 比较像 Java 的 [DecimalFormat](https://docs.oracle.com/javase/9/docs/api/java/text/DecimalFormat.html)

备选
* https://github.com/scurker/currency.js 可以正确的处理浮点精度问题: `2.51 + 0.01 => 2.5199999999999996` `currency(2.51).add(0.01) => 2.52`
* https://github.com/nashdot/accounting-js
* https://github.com/BenjaminVanRyseghem/numbro
* https://github.com/componitable/format-number
* https://github.com/adamwdraper/Numeral-js 没怎么更新维护了
* https://github.com/ericelliott/moneysafe safe money calculations in JS
* https://github.com/sarahdayan/dinero.js
* https://github.com/AndreasPizsa/parse-decimal-number
* https://github.com/papandreou/node-cldr extracting data from CLDR (the Unicode Common Locale Data Repository)