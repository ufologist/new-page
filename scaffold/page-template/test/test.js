var path = require('path');

var test = require('ava');
var sao = require('sao');

const generator = path.join(__dirname, '..');

test('defaults', async t => {
    const stream = await sao.mock({
        generator: generator
    }, {
        pageName: 'demo1',
        pageTitle: '页面标题1'
    });

    t.snapshot(stream.fileList, 'Generated files');
});