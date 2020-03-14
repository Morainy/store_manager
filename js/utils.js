/**
 * @description 获取 URL 指定参数的值
 * @param {String} name 要获取的参数名称
 * @param {String} [queryString] 要查询的字符串，默认是 location.href
 * @returns {String} 返回 name 参数的值，没有则为空字符串
 */
function getUrlParamVal(name, queryString) {
    let _result,
        _regExp = new RegExp("(\\?|#|&)+" + name + "=([^&#]*)(&|$|#)");
    queryString = queryString || location.href;
    _result = queryString.match(_regExp);
    (!_result || _result == "") && (_result = location.href.match(_regExp));
    return (!_result ? "" : _result[2]);
}

function openUrl(url) {
    window.location.href = url
}