const templateList = require('../config/template.json').templateList;
const log = require('../utils/log');
const category = 'category';
/**
 * 列出模板列表
 * @param options
 * @param context
 * @returns {Promise<void>}
 */
async function list (options = {}, context = process.cwd()) {
    let projectCategory = options[category];
    let templateLogList = templateList;
    if (projectCategory){
        templateLogList = templateList.filter(item => item.type === projectCategory);
    }
    for (let i = 0; i < templateLogList.length; i ++) {
        log('success', `${templateLogList[i].name}:${templateLogList[i].description}`);
    }
    if (!templateLogList.length) {
        log('waring', 'no template');
    }
}
module.exports = (...args) => {
    return list(...args).catch(err => {})
}
