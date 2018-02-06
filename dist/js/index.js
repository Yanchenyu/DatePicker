'use strict';

window.onload = function () {

    // 默认是当天
    var chosenDate = new Date();
    var year = chosenDate.getFullYear();
    var month = chosenDate.getMonth();
    var date = chosenDate.getDate();

    var render = function render(year, month) {
        var date = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

        month++;
        var datePage = []; // 最终展示页面的所有日期合集        
        // 第一部分，上月月末几天
        // 首先要知道上月一共多少天
        var getAlldays = function getAlldays(year, month) {
            if (month <= 7) {
                // 1-7月
                if (month % 2 === 0) {
                    // 偶数月
                    if (month === 2) {
                        // 2月特殊
                        if (year % 4 === 0) {
                            // 闰年
                            var alldays = 29;
                        } else {
                            var alldays = 28;
                        }
                    } else {
                        var alldays = 30;
                    }
                } else {
                    // 奇数月
                    var alldays = 31;
                }
            } else {
                // 8-12月
                if (month % 2 === 0) {
                    // 偶数月
                    var alldays = 31;
                } else {
                    var alldays = 30;
                }
            }
            return alldays;
        }; // alldays表示某年某月的总天数
        var lastMonthAllDays = getAlldays(year, month - 1); // 上月天数
        var chosenFirstMonthDay = new Date(year, month - 1, 1).getDay(); // 当月1号周几

        var datePageTemplate = '';
        var num = 0;

        for (var i = lastMonthAllDays - chosenFirstMonthDay + 1; i < lastMonthAllDays + 1; i++) {
            datePageTemplate += '<span>' + i + '</span>';
            num++;
        }

        // 第二部分，当月总天数
        var chosenMonthAllDays = getAlldays(year, month); // 当月天数
        for (var _i = 1; _i < chosenMonthAllDays + 1; _i++) {
            datePageTemplate += '<span class="currentMonth">' + _i + '</span>';
            num++;
        }

        // 第三部分，剩余天数
        for (var _i2 = 1; _i2 < 43 - num; _i2++) {
            datePageTemplate += '<span>' + _i2 + '</span>';
        }

        var templateString = '' + datePageTemplate;

        document.getElementById('dateYear').innerHTML = year;
        document.getElementById('dateMonth').innerHTML = month;
        document.getElementById('dateBody').innerHTML = templateString;
    };

    render(year, month, date);

    document.getElementById('yearLeft').onclick = function () {
        year--;
        render(year, month, date);
    };

    document.getElementById('monthLeft').onclick = function () {
        month--;
        render(year, month, date);
    };

    document.getElementById('yearRight').onclick = function () {
        year++;
        render(year, month, date);
    };

    document.getElementById('monthRight').onclick = function () {
        month++;
        render(year, month, date);
    };
};