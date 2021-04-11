/**
 * 日志打印
 * @param type
 * @param str
 */
function log(type, str) {
    console.log(str);
}

module.exports = (...args) => {
    return log(...args).catch(err => {})
}
