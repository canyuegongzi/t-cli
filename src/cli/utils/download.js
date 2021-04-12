const download = require("download-git-repo");
const path = require("path");
const rimraf = require("rimraf");
const log = require('./log');
/**
 * 下载文件到目录
 * @param url
 * @param name
 * @param callback
 * @param target
 * @returns {Promise<void>}
 */
async function downloadFile(url, name, callback, target = process.cwd()) {
    return new Promise((resolve, reject) => {
        const dir = path.join(process.cwd(), name);
        rimraf.sync(dir, {});
        const downLoadCallback = (err) => {
            if (err) {
                resolve(false);
                log('ERROR', err);
            }
            callback(dir, name);
            resolve(true);
        }
        download(url, dir, {clone: true}, downLoadCallback);
    })

}
module.exports = downloadFile;
