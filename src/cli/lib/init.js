const templateList = require('../config/template.json').templateList;
const categoryList = require('../config/category.json').categoryList;
const log = require('../utils/log');
const inquirer = require('inquirer')
const downloadFile = require("../utils/download");
const template = 'template';
const category = 'category';
/**
 * 初始化工程模板
 * @param pluginToAdd
 * @param options
 * @param context
 * @returns {Promise<void>}
 */
async function init (pluginToAdd, options = {}, context = process.cwd()) {
    let projectCategory = options[category]
    let projectTemplate = options[template]
    let projectName = pluginToAdd;
    if (!options.hasOwnProperty(category)){
        projectCategory = await selectCategory()
    }
    if (!options.hasOwnProperty(template)){
        projectTemplate = await selectTemplate(projectCategory)
    }
    console.log('工程类型', projectCategory);
    console.log('项目模板', projectTemplate);
    console.log('项目名称', projectName);
    const templateInfo = templateList.find((item) => item.type === projectCategory && item.name === projectTemplate);
    if (!templateInfo) {
        return log('waring', 'no template');
    }
    const {url} = templateInfo;
    console.log(url)
    const isSuccess = downloadFile(url, projectName, downloadSuccess )
}

/**
 * 选择工程类型
 * @returns {Promise<void>}
 */
async function selectCategory() {
    return new Promise(resolve => {
        inquirer.prompt([
            { type: 'list', message: '请选择工程类型:', name: category, choices: categoryList }
        ]).then((answers) => {
            resolve(answers[category])
        })
    })
}

/**
 * 选择工程模板名称
 * @returns {Promise<void>}
 */
async function selectTemplate(projectCategory) {
    const list = templateList.filter(item => item.type === projectCategory).map((item) => item.name)
    if (!list.length) {
        return log('waring', 'no template');
    }
    return new Promise(resolve => {
        inquirer.prompt([
            { type: 'list', message: '请选择工程模板:', name: template, choices: list }
        ]).then((answers) => {
            console.log(answers)
            resolve(answers[template])
        })
    })
}

/**
 * 模板下载成功
 * @param dir
 * @param name
 * @returns {Promise<void>}
 */
async function downloadSuccess(dir, name) {
    console.log(dir);
    console.log(name);

}
module.exports = (...args) => {
    return init(...args).catch(err => {})
}
