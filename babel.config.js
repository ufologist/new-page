module.exports = {
    presets: [
        ["@vue/cli-plugin-babel/preset", {
            // 第三方依赖可能使用了 ES6+ 特性且没有显式地列出需要的 polyfill
            // 使用 `entry` 会根据 browserslist 目标导入所有 polyfill
            // 这样你就不用再担心依赖的 polyfill 问题了
            // 但是因为包含了一些没有用到的 polyfill 所以最终的包大小可能会增加
            // 对比下大小, 使用 entry 时, 即使是一个空应用
            // 只 `import 'core-js/stable'; import 'regenerator-runtime/runtime';`
            // chunk-vendors 也有 125KB(压缩过后)
            //
            // 这样看来还是使用 usage 更好一些, 会根据你源代码中用到了哪些特性, 就自动导入哪些 polyfill,
            // 绝不铺张浪费, 这确保了最终包里 polyfill 数量的最小化
            // 但这也意味着如果第三方依赖需要其他的 polyfill, 默认情况下 Babel 是无法将其检测出来的
            // 我们可以将所有的 dependencies 全部自动加入到 vue.config.js 的 `transpileDependencies` 配置中
            // 但这个配置没有办法处理第三方依赖的依赖(平行放置在 node_modules 目录下)
            // 因此安全起见, 还是需要使用 entry 方式, 因为第三方依赖完全不受控, 很有可能使用了新特性, 你还一无所知
            // https://cli.vuejs.org/zh/guide/browser-compatibility.html#usebuiltins-usage
            useBuiltIns: 'entry'
        }]
    ]
};