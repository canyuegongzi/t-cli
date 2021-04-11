#!/usr/bin/env node
const program = require('commander')
console.log('这是测试1');
var inquirer = require('inquirer')
/*inquirer.prompt([
    {
        type: 'confirm',
        name: 'test',
        message: '请选择工程类型?',
        default: true
    }
]).then((answers) => {
    console.log('结果为:')
    console.log(answers)
})*/


program
    .version(`@t/cli ${require('../../../package').version}`)
    .usage('<command> [options]')
