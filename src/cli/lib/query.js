const templateList = require('../config/template.json').templateList;
const log = require('../utils/log');
const category = 'category';
/**
 * 模板查询
 * @param options
 * @param context
 * @returns {Promise<void>}
 */
async function query (options = {}, context = process.cwd()) {
}
module.exports = (...args) => {
    return query(...args).catch(err => {})
}
