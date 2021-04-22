#!/usr/bin/env node
const program = require('commander')

program
    .version(`@canyuegongzi/t-cli ${require('../../../package').version}`)
    .usage('<command> [options]')

program
    .command('init <app-name>')
    .description('初始化一个工程')
    .option('-c, --category <category>', '工程类型,[web | server]')
    .option('-t, --template <template>', '模板名称')
    .action((name, options) => {
        require('../lib/init')(name, options)
    })

program
    .command('list')
    .description('列出项目模板')
    .option('-c, --category <category>', '工程类型,[web | server]')
    .option('-q, --query <query>', '查询字符串')
    .action((options) => {
        require('../lib/list')(options)
    })

program
    .command('update')
    .description('更新配置')
    .option('-t, --type <type>', '更新类型,[config]')
    .action((options) => {
        require('../lib/update')(options)
    })

program.on('command:*', function () {
    console.log('Invalid command: %s\nSee --help for a list of available commands.', program.args.join(' '));
    process.exit(1);
})

program.parse(process.argv);
