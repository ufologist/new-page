var path = require('path');
var fs = require('fs');

var clipboardy = require('clipboardy');

module.exports = {
    prompts: function() {
        return [{
            name: 'pageName',
            message: '请输入你要创建的页面名称(英文)',
            validate: (input) => {
                var isValid = false;

                if (input) {
                    if (/^[a-z0-9\-]+$/.test(input)) {
                        var pageOutDir = path.resolve(this.outDir, input);
                        if (fs.existsSync(pageOutDir)) {
                            console.info(this.chalk.red('\n这个页面已经存在了, 请另外想一个名字'));
                        } else {
                            // 覆盖原来的属性 this.outDir 和 this.outFolder
                            Object.defineProperty(this, 'outDir', {
                                value: pageOutDir
                            });
                            Object.defineProperty(this, 'outFolder', {
                                value: input
                            });
                            isValid = true;
                        }
                    } else {
                        console.info(this.chalk.red('\n页面名称只允许小写的英文字母和数字'));
                    }
                }

                return isValid;
            }
        }, {
            name: 'pageTitle',
            message: '请输入你要创建的页面标题',
            default: '页面标题'
        }, {
            name: 'router',
            message: '是否需要使用路由(你有"多个页面"时才需要使用)',
            type: 'confirm',
            default: false
        }]
    },
    actions: [{
        type: 'add',
        files: '**',
        filters: {
            'pages/home/**': 'router',
            'pages/home/res/.gitkeep': 'router'
        }
    }],
    completed: function() {
        this.showProjectTips();

        // copy to system clipboard
        var cmd = `npm start -- --__page__=${this.answers.pageName}`;
        clipboardy.writeSync(cmd);

        console.info('\n----请执行下面的命令开始开发(已为你复制好了)----');
        console.info(this.chalk.blue(cmd));
        console.info('------------------------------------------------');
    }
}