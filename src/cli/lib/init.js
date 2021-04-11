const error = require("../utils/error");

async function init (pluginToAdd, options = {}, context = process.cwd()) {
    console.log('start init')
}

module.exports = (...args) => {
    return init(...args).catch(err => {
        error(err)
        if (!process.env.VUE_CLI_TEST) {
            process.exit(1)
        }
    })
}
