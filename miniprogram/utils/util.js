
function formatTime(date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()

    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()


    return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function todate(inputstr, showsplit) {
        //Wed Mar 22 13:38:37 CST 2017
        inputstr = inputstr + ""; //末尾加一个空格
        var date = "";
        var month = new Array();
        var week = new Array();
        
        month["Jan"] = 1; month["Feb"] = 2; month["Mar"] = 3; month["Apr"] = 4; month["May"] = 5; month["Jan"] = 6; 
        month["Jul"] = 7; month["Aug"] = 8; month["Sep"] = 9; month["Oct"] = 10; month["Nov"] = 11; month["Dec"] = 12;
        week["Mon"] = "一"; week["Tue"] = "二"; week["Wed"] = "三"; week["Thu"] = "四"; week["Fri"] = "五"; week["Sat"] = "六"; week["Sun"] = "日";
        
        str = inputstr.split(" ");
        
        date = str[5];
        date += showsplit + month[str[1]] + showsplit + str[2];
        if(showweek){
        date += "    " + " 星期" + week[str[0]];
        }
                
        return date;
}

function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}

/**
 * 封封微信的的request
 */
function request(url, data = {}, method = "POST", header = "application/x-www-form-urlencoded") {
    // wx.showLoading({
    //     title: '加载中...',
    // });
    return new Promise(function (resolve, reject) {
        wx.request({
            url: url,
            data: data,
            method: method,
            header: {
                'Content-Type': header,
                'X-Nideshop-Token': wx.getStorageSync('token')
            },
            success: function (res) {
                wx.hideLoading();
                if (res.statusCode == 200) {

                    if (res.data.errno == 401) {
                        wx.navigateTo({
                            url: '/pages/index/index',
                        })
                    } else {
                        resolve(res.data);
                    }
                } else {
                    reject(res.errMsg);
                }

            },
            fail: function (err) {
                reject(err)
            }
        })
    });
}

/**
 * 检查微信会话是否过期
 */
function checkSession() {
    return new Promise(function (resolve, reject) {
        wx.checkSession({
            success: function () {
                resolve(true);
            },
            fail: function () {
                reject(false);
            }
        })
    });
}

/**
 * 调用微信登录
 */
function login() {
    return new Promise(function (resolve, reject) {
        wx.login({
            success: function (res) {
                if (res.code) {
                    resolve(res);
                } else {
                    reject(res);
                }
            },
            fail: function (err) {
                reject(err);
            }
        });
    });
}

function redirect(url) {

    //判断页面是否需要登录
    if (false) {
        wx.redirectTo({
            url: '/pages/login/login'
        });
        return false;
    } else {
        wx.redirectTo({
            url: url
        });
    }
}

function showErrorToast(msg) {
    wx.showToast({
        title: msg,
        image: '/static/images/icon_error.png'
    })
}

function showSuccessToast(msg) {
    wx.showToast({
        title: msg,
    })
}

module.exports = {
    formatTime,
    request,
    redirect,
    showErrorToast,
    showSuccessToast,
    checkSession,
    login,
}


