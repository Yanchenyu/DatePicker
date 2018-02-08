    // 默认是当天
var chosenDate = new Date(),
    year = chosenDate.getFullYear(),
    month = chosenDate.getMonth(),
    date = chosenDate.getDate(),
    lastDateId = '',    // 挂到全局下去
    lastYearId = '',
    lastMonthId = '';

window.onload = function(){

    renderFirstPage(year, month, date);

    

    
    // input框获取焦点时日历显示

    var datePicker = getIdDom('datePicker');

    getIdDom('textInput').onfocus = function(){
        datePicker.className = 'datePicker datePickerShow';
    }


    /* 以上是第一部分页面展示  */

    /* 二级页面 */
    var renderSecondPage = function(firstNum){
        var lastNum = firstNum + 9;     // 二级页面末尾数字
        getIdDom('changeYearFirst').innerHTML = firstNum;
        getIdDom('changeYearLast').innerHTML = lastNum;
    
        var yearTemplate = ``;
        for (var i = firstNum; i < lastNum + 1; i++) {
            if (i == year) {
                // 当前选中年
                yearTemplate += `<span><em id="year-${i}" onclick="chooseYear(this, ${i})" style="background-color: #39f;color: #fff">${i}</em></span>`
            } else {
                yearTemplate += `<span><em id="year-${i}" onclick="chooseYear(this, ${i})">${i}</em></span>`
            }
        }
        getIdDom('secondPage').innerHTML = yearTemplate;
    }

    var yearStr = year.toString();
    var yearLastLetter = yearStr[yearStr.length-1];     // 末尾数
    var firstNum = year - Number(yearLastLetter);   // 二级页面首位数字
    renderSecondPage(firstNum);

    getIdDom("backChangeYearPage").innerHTML = year;     // 三级页面年份

    getIdDom("month-" + ++month).style = "background-color: #39f;color: #fff";

    // click事件集中写

    var clickFn = function(id, fn) {
        getIdDom(id).onclick = fn;
    };  // 封装一下click方法
    
    // 上一年下一年，上一月下一月的点击事件
    clickFn('yearLeft', function(){
        if (getIdDom('changeYearHead').style.display != 'none') {
            // 此时是二级页面，选年份
            firstNum -= 10;
            renderSecondPage(firstNum);
        } else {
            year--;
            renderFirstPage(year, month, date);
            getIdDom("backChangeYearPage").innerHTML = year;
            var yearStr = year.toString();
            var yearLastLetter = yearStr[yearStr.length-1];     // 末尾数
            var firstNum = year - Number(yearLastLetter);   // 二级页面首位数字
            renderSecondPage(firstNum);
        }
    });

    clickFn('monthLeft', function(){
        month--;
        renderFirstPage(year, month, date)
    });

    clickFn('yearRight', function(){
        if (getIdDom('changeYearHead').style.display != 'none') {
            // 此时是二级页面，选年份
            firstNum += 10;
            renderSecondPage(firstNum);
        } else {
            year++;
            renderFirstPage(year, month, date);
            getIdDom("backChangeYearPage").innerHTML = year;
            var yearStr = year.toString();
            var yearLastLetter = yearStr[yearStr.length-1];     // 末尾数
            var firstNum = year - Number(yearLastLetter);   // 二级页面首位数字
            renderSecondPage(firstNum);
        }
    });

    clickFn('monthRight', function(){
        month++;
        renderFirstPage(year, month, date)
    });

    
    clickFn('changeYear', function(){
        var pagesArr = Array.from(document.querySelectorAll('.page'));
        pagesArr.forEach(function(item){
            item.style = 'display: none'
        });
        getIdDom('secondPage').style = "display: block";
        getIdDom('changeYearHead').style = "display: inline-block";
    });     // 点击年份切换至二级页面

    clickFn('changeMonth', function(){
        var pagesArr = Array.from(document.querySelectorAll('.page'));
        pagesArr.forEach(function(item){
            item.style = 'display: none'
        });
        getIdDom('thirdPage').style = "display: block";
        getIdDom('changeMonthHead').style = "display: inline-block";
    })

    clickFn('changeMonthHead', function(){
        // 切回年份选择
        var pagesArr = Array.from(document.querySelectorAll('.page'));
        pagesArr.forEach(function(item){
            item.style = 'display: none'
        });
        getIdDom('secondPage').style = "display: block";
        getIdDom('changeYearHead').style = "display: inline-block";
        var yearStr = year.toString();
        var yearLastLetter = yearStr[yearStr.length-1];     // 末尾数
        var firstNum = year - Number(yearLastLetter);   // 二级页面首位数字
        renderSecondPage(firstNum);
    })

}


function getIdDom(id){
    return document.getElementById(id)
}  // 根据id获取dom节点


function renderFirstPage(year, month, date = 1){
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

function chooseDate(item, index, year, month, date) {
    event.stopPropagation();
    if (lastDateId !== '') {
        // 非第一次点击
        document.getElementById(lastDateId).style = "";
    }
    // 选中项样式改变，并且将input的日期修改
    lastDateId = index;
    item.style = "background-color: #39f;color: #fff";
    document.getElementById("textInput").value = year + '-' + month + '-' + date;
}

function chooseYear(item, thisYear) {
    event.stopPropagation();
    if (lastYearId !== '') {
        // 非第一次点击
        if (document.getElementById(lastYearId)) {
            // 存在已经跨页面了，但是id不存在了
            document.getElementById(lastYearId).style = "";
        }
    } else {
        // 第一次点击
        document.getElementById('year-' + year).style = "";
        
    }
    lastYearId = 'year-' + thisYear;
    year = thisYear;
    item.style = "background-color: #39f;color: #fff";
    var pagesArr = Array.from(document.querySelectorAll('.page'));
    pagesArr.forEach(function(item){
        item.style = 'display: none'
    });
    document.getElementById("changeMonthHead").style.display = "inline-block";
    document.getElementById("backChangeYearPage").innerHTML = year;
    document.getElementById("thirdPage").style.display = "block";
}

function chooseMonth(){
    var target = event.target;
    if (target.nodeName === 'EM') {
        // 表示当前点击的为em节点
        if (lastMonthId !== '') {
            // 非第一次点击
            document.getElementById(lastMonthId).style = "";
        } else {
            // 第一次点击
            document.getElementById('month-' + month).style = "";
        }
        month = parseInt(target.innerHTML);
        lastMonthId = 'month-' + month;
        target.style = "background-color: #39f;color: #fff";

        renderFirstPage(year, month-1, date);

        // 展示首页
        var pagesArr = Array.from(document.querySelectorAll('.page'));
        pagesArr.forEach(function(item){
            item.style = 'display: none'
        });
        document.getElementById('firstPage').style = "display: block";
        document.getElementById('changeDateHead').style = "display: inline-block";
        document.getElementById('monthLeft').style = "display: inline-block";
        document.getElementById('monthRight').style = "display: inline-block";
    }
}
