/**
 * 下载文件到目录
 * @param url
 * @param target
 * @returns {Promise<void>}
 */
async function downloadFile(url, target = process.cwd()) {
    console.log('下载地址');
    console.log(url);
}
module.exports = downloadFile;
