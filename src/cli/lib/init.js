const templateList = require('../config/template.json').templateList;
const categoryList = require('../config/category.json').categoryList;
const inquirer = require('inquirer')
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
    if (!options.hasOwnProperty(category)){
        projectCategory = await selectCategory()
    }
    if (!options.hasOwnProperty(template)){
        projectTemplate = await selectTemplate()
    }
    console.log('工程类型', projectCategory);
    console.log('项目模板', projectTemplate);
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
async function selectTemplate() {
    return new Promise(resolve => {
        inquirer.prompt([
            { type: 'list', message: '请选择工程模板:', name: template, choices: templateList.map((item) => item.name) }
        ]).then((answers) => {
            console.log(answers)
            resolve(answers[template])
        })
    })
}
module.exports = (...args) => {
    return init(...args).catch(err => {})
}
