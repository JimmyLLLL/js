Array.prototype.concat = function () {
    var res = [];

    res.push.apply(res, this);

    for (var i = 0; i < arguments.length; i++) {
        if (Object.prototype.toString.call(arguments[i]) == '[object Array]') {
            res.push.apply(res, arguments[i]);
        } else {
            res.push.call(res, arguments[i]);
        }
    }

    return res;
}