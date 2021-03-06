function log(level, content) {
    if (level > 0) {
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hour = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();
        var time = year + '/' + month + '/' + day + ' ' + hour + ':' + minute + ':' + second;
        console.log("[" + time + "] " + level + ": " + content);
    }
}

exports.log = log;