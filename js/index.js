window.onload = function(){

    // 默认是当天
    var chosenDate = new Date(),
        year = chosenDate.getFullYear(),
        month = chosenDate.getMonth(),
        date = chosenDate.getDate();

    var getIdDom = function(id){
        return document.getElementById(id)
    };  // 根据id获取dom节点

    var render = (year, month, date = 1) => {
        month++;
        var datePage = [];    // 最终展示页面的所有日期合集        
        // 第一部分，上月月末几天
        // 首先要知道上月一共多少天
        var getAlldays = (year, month) => {
            if (month <= 7) {
                // 1-7月
                if (month % 2 === 0) {
                    // 偶数月
                    if (month === 2) {
                        // 2月特殊
                        if ((year % 400 == 0) || ( year % 4 == 0 && year % 100 != 0)) {
                            // 闰年
                            var alldays = 29
                        } else {
                            var alldays = 28
                        }
                    } else {
                        var alldays = 30
                    }
                } else {
                    // 奇数月
                    var alldays = 31
                }
            } else {
                // 8-12月
                if (month % 2 === 0) {
                    // 偶数月
                    var alldays = 31
                } else {
                    var alldays = 30
                }
            }
            return alldays
        };      // alldays表示某年某月的总天数
        var lastMonthAllDays = getAlldays(year, month - 1);    // 上月天数
        var chosenFirstMonthDay = new Date(year, month - 1, 1).getDay();    // 当月1号周几

        var datePageTemplate = ``;
        var num = 0;

        for (var i = lastMonthAllDays - chosenFirstMonthDay + 1; i < lastMonthAllDays + 1; i++ ) {
            datePageTemplate += `<span id="lastMonth"><em id="last-${i}" onclick="chooseDate(this, 'last-${i}', ${year}, ${month}, ${i})">${i}</em></span>`;
            num++;
        }

        // 第二部分，当月总天数
        var chosenMonthAllDays = getAlldays(year, month);  // 当月天数
        var time = new Date();
        var a = time.getFullYear(),
            b = time.getMonth() + 1,
            c = time.getDate(); // 用来记录当天时间
        for(var i = 1; i < chosenMonthAllDays + 1; i++) {
            var chosenDateObj = {
                year: year,
                month: month,
                date: i
            };
            if (i === c && year === a && month === b) {
                // 今天日期高亮
                datePageTemplate += `<span id="today" class="currentMonth"><em id="today-${i}" onclick="chooseDate(this, 'today-${i}', ${year}, ${month}, ${i})" class="today">${i}</em></span>`;
            } else {
                datePageTemplate += `<span id="currentMonth" class="currentMonth"><em id="cur-${i}" onclick="chooseDate(this, 'cur-${i}', ${year}, ${month}, ${i})">${i}</em></span>`;
            }
            
            num++;
        }

        // 第三部分，剩余天数
        for (var i = 1; i < 43 - num; i++) {
            var chosenDateObj = {
                year: year,
                month: month,
                date: i
            };
            datePageTemplate += `<span id="nextMonth"><em id="nex-${i}" onclick="chooseDate(this, 'nex-${i}', ${year}, ${month}, ${i})">${i}</em></span>`;
        }


        var templateString = `${datePageTemplate}`;

        var innerFn = function(id, content) {
            getIdDom(id).innerHTML = content
        };
        innerFn('dateYear', year);
        innerFn('dateMonth', month);
        innerFn('dateBody', templateString);
    
    }

    render(year, month, date);

    var clickFn = function(id, fn) {
        getIdDom(id).onclick = fn;
    };  // 封装一下click方法

    // 上一年下一年，上一月下一月的点击事件
    clickFn('yearLeft', function(){
        year--;
        render(year, month, date);
    });

    clickFn('monthLeft', function(){
        month--;
        render(year, month, date)
    });

    clickFn('yearRight', function(){
        year++;
        render(year, month, date)
    });

    clickFn('monthRight', function(){
        month++;
        render(year, month, date)
    });

    // input框获取焦点时日历显示

    var datePicker = getIdDom('datePicker');

    getIdDom('textInput').onfocus = function(){
        datePicker.className = 'datePicker datePickerShow';
    }
    

}

var lastId = '';    // 挂到全局下去

function chooseDate(item, index, year, month, date) {
    event.stopPropagation();
    if (lastId !== '') {
        // 非第一次点击
        document.getElementById(lastId).style = "";
    }
    // 选中项样式改变，并且将input的日期修改
    lastId = index;
    item.style = "background-color: #39f;color: #fff";
    document.getElementById("textInput").value = year + '-' + month + '-' + date;
}
