var path = require('path');
var fs = require('fs');

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
        }]
    },
    actions: [{
        type: 'add',
        files: '**'
    }],
    completed: function() {
        this.showProjectTips()
    }
}