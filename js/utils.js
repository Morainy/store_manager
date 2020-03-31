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

const KEY_LIST = 'store_print_list'

function getPrintData () {
    if (!window.localStorage) return null;
        
    return window.localStorage.getItem(KEY_LIST)
}

function setPrintData (list) {
    window.localStorage && window.localStorage.setItem(KEY_LIST, JSON.stringify(list))
}


/**
 *对Date的扩展，将 Date 转化为指定格式的String
 *月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
 *年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 *例子：
 *(new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
 *(new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
 */
Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}