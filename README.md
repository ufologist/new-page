# new-page

[![changelog][changelog-image]][changelog-url] [![license][license-image]][license-url]

[license-image]: https://img.shields.io/github/license/ufologist/new-page.svg
[license-url]: https://github.com/ufologist/new-page/blob/master/LICENSE
[changelog-image]: https://img.shields.io/badge/CHANGE-LOG-blue.svg?style=flat-square
[changelog-url]: https://github.com/ufologist/new-page/blob/master/CHANGELOG.md

适用于快速创建独立页面的模版工程

## 适用情况

* 需要开发较多彼此独立的页面(例如活动页面)
* 如果每来一个页面都新建一个(git)项目, 会增加管理成本, 虽然可以通过脚手架来快速初始化新项目解决一些问题, 但还是避免不了需要反复地折腾一些基础设施(例如构建配置等等)

## 用途

* 活动页面/独立页面/示例页面
* "一个页面"对应一个文件夹, 互不影响, 不用重复建项目折腾基础设施
* 沉淀公共组件

## 功能

基于 [vue-cli3](https://cli.vuejs.org/)

### HTML 模版页中的公共逻辑

采取**组合环境变量**的方式, 在页面中插入公共逻辑
* viewport
* 移动端适配
* 骨架屏(默认 loading 效果)
* 异常监控
* 调试助手
* 埋点统计
* 全局数据
* 微信 JS-SDK
* HTTP 接口的 root 地址 

需要重点关注的环境变量
* `process.env.VUE_APP_PAGE`: 当前构建的页面文件夹的名称, 会自动注入
* `process.env.VUE_APP_EXCEPTION_MONITOR_APIKEY`: 接入 `Fundebug` 异常监控的 `apikey`, 需要在页面文件夹的 `.env` 中覆盖, 如果不设置会用默认值
* `process.env.VUE_APP_ANALYTICS_SCRIPT`: 接入统计分析的脚本(例如百度统计), 需要在页面文件夹的 `.env` 中覆盖, 如果不设置会用默认值
* `process.env.VUE_APP_PAGE_DATA_SCRIPT`: 全局数据 `PAGE_DATA` 的值, 需要在页面文件夹的 `.env` 中覆盖
* `process.env.VUE_APP_API_ROOT`: HTTP 接口的 root 地址, 需要在页面文件夹的 `.env` 中覆盖, 如果不设置会用默认值
* `process.env.VUE_APP_COMMON_ERROR_PAGE`: 通用错误页面

### 每个页面拥有自己独立的环境变量

支持在页面文件夹下有一套独立的 `.env` 环境配置, 可以覆盖全局(根目录)的环境配置

### 输出规则

* 构建对应的页面文件夹时输出的目录为: `dist/${页面名称}`
* 获取 Git 最近一次的提交日志(只会包含短 hash 和提交时间), 例如: `abc1234 2020-02-22 17:16:23 +0800`
* 在输出的 JS/CSS 文件中标记注释, 例如: `/*! ${pkg.name}/${页面名称} | abc1234 2020-02-22 17:16:23 +0800 | (c) ${pkg.author} */`

## 开发准备

1. 新建页面: `npm run new-page`

   * "单页面"(不使用路由)
      ```shell
      > npm run new-page
      
      > new-page@1.0.0 new-page /new-page
      > sao ./scaffold/page-template ./src/pages
      
      ? 请输入你要创建的页面名称(英文) demo1
      ? 请输入你要创建的页面标题 页面标题
      ? 是否需要使用路由(你有"多个页面"时才需要使用) No
      info Created src/pages/demo1/index.js
      info Created src/pages/demo1/index.vue
      info Created src/pages/demo1/index.html
      info Created src/pages/demo1/.env
      info Created src/pages/demo1/.env.development
      info Created src/pages/demo1/.env.test
      info Created src/pages/demo1/.env.stage
      info Created src/pages/demo1/.env.production
      info Created src/pages/demo1/res/.gitkeep
      info Created src/pages/demo1/README.md
      success Generated into /new-page/src/pages/demo1
      ```
    * "多页面"(使用路由)
      ```shell
      > npm run new-page
      
      > new-page@1.0.0 new-page /new-page
      > sao ./scaffold/page-template ./src/pages
      
      ? 请输入你要创建的页面名称(英文) demo1
      ? 请输入你要创建的页面标题 页面标题
      ? 是否需要使用路由(你有"多个页面"时才需要使用) Yes
      info Created src/pages/demo1/index.js
      info Created src/pages/demo1/index.vue
      info Created src/pages/demo1/index.html
      info Created src/pages/demo1/.env
      info Created src/pages/demo1/.env.development
      info Created src/pages/demo1/.env.test
      info Created src/pages/demo1/.env.stage
      info Created src/pages/demo1/.env.production
      info Created src/pages/demo1/pages/home/home.vue
      info Created src/pages/demo1/pages/home/res/.gitkeep
      info Created src/pages/demo1/res/.gitkeep
      info Created src/pages/demo1/README.md
      success Generated into /new-page/src/pages/demo1
      ```

2. 该页面的所有文件放置在 `src/pages/${页面名称}` 目录下
3. 开始开发 `npm start -- --__page__=${页面名称}`, 例如: `npm start -- --__page__=demo1`

其他命令
* 启动 HTTPS: `npm start -- --https --__page__=${页面名称}`
* 自定义端口: `npm start -- --port=${端口} --__page__=${页面名称}`

## 示例

* demo 页面
  * [开发页面需要写哪些代码?](./src/pages/demo/README.md)
  * [常用公共库使用示例]()
* [第三方库筛选记录](./src/pages/demo/lib.md)

## 封装的公共逻辑

* src/lib
  * `http-client.js` 封装 HTTP 方法
  * `base-router.js` 基础路由器
  * `validator.js` 简化 validatorjs 用于验证单个值 
  * `wx-js-sdk.js` 封装了微信 JSSDK 的功能

## TODO

* commitizen 规则
* eslint 规则
* prettier 规则