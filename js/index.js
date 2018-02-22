    // 默认是当天
var chosenDate = new Date(),
    year = chosenDate.getFullYear(),
    month = chosenDate.getMonth() + 1,
    date = chosenDate.getDate(),
    lastDateId = '',    // 挂到全局下去
    lastYearId = '',
    lastMonthId = '',
    firstNum = 0;

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

    var reRenderSecondPage = function(){
        var yearStr = year.toString();
        var yearLastLetter = yearStr[yearStr.length-1];     // 末尾数
        firstNum = year - Number(yearLastLetter);   // 二级页面首位数字
        renderSecondPage(firstNum);
    }
    reRenderSecondPage();
    

    getIdDom("backChangeYearPage").innerHTML = year;     // 三级页面年份

    // click事件集中写
    
    // 上一年下一年，上一月下一月的点击事件
    clickFn('yearLeft', function(){
        if (getIdDom('changeYearHead').style.display != 'none') {
            // 此时是二级页面，选年份
            if (firstNum - 10 < 1) {
                // 首位年份不能小于1
                return
            }
            firstNum -= 10;
            renderSecondPage(firstNum);
        } else {
            if (year - 1 < 1) {
                // 年份不能小于1
                return
            }
            year--;
            renderFirstPage(year, month, date);
            getIdDom("backChangeYearPage").innerHTML = year;
            reRenderSecondPage();
        }
    });

    clickFn('monthLeft', function(){
        if (month < 2) {
            // 1月
            month = 12;
            year--;
        } else {
            month--;
        }
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
            reRenderSecondPage();
        }
    });

    clickFn('monthRight', function(){
        if (month > 11) {
            // 12月
            month = 1;
            year++;
        } else {
            month++;
        }
        renderFirstPage(year, month, date)
    });

    
    clickFn('changeYear', function(){
        var pagesArr = Array.from(document.querySelectorAll('.page'));
        pagesArr.forEach(function(item){
            item.style = 'display: none'
        });
        reRenderSecondPage();
        changeStyle('secondPage', 'display: block');
        changeStyle('changeYearHead', 'display: inline-block');
    });     // 点击年份切换至二级页面

    clickFn('changeMonth', function(){
        var pagesArr = Array.from(document.querySelectorAll('.page'));
        pagesArr.forEach(function(item){
            item.style = 'display: none'
        });
        if (lastMonthId !== '') {
            // 非第一次点击
            getIdDom(lastMonthId).style = "";
        }
        changeStyle("month-" + month, 'background-color: #39f;color: #fff');
        lastMonthId = 'month-' + month;
        changeStyle('thirdPage', 'display: block');
        changeStyle('changeMonthHead', 'display: inline-block');
    })

    clickFn('changeMonthHead', function(){
        // 切回年份选择
        var pagesArr = Array.from(document.querySelectorAll('.page'));
        pagesArr.forEach(function(item){
            item.style = 'display: none'
        });
        changeStyle('secondPage', 'display: block');
        changeStyle('changeYearHead', 'display: inline-block');
        reRenderSecondPage();
    })

    document.getElementsByTagName('html')[0].onclick = function(e){
        // 这里模拟失去焦点事件
        var name = e.target.nodeName;
        if (name == 'BODY' || name == 'HTML') {
            datePicker.className = 'datePicker datePickerHide';
        }
    }

}


function getIdDom(id){
    return document.getElementById(id)
}  // 根据id获取dom节点

function clickFn(id, fn) {
    getIdDom(id).onclick = fn;
}  // 封装一下click方法

function renderFirstPage(year, month, date = 1){
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
        getIdDom(lastDateId).style = "";
    }
    // 选中项样式改变，并且将input的日期修改
    lastDateId = index;
    item.style = "background-color: #39f;color: #fff";
    getIdDom("textInput").value = year + '-' + month + '-' + date;
}

function chooseYear(item, thisYear) {
    event.stopPropagation();
    if (lastYearId !== '') {
        // 非第一次点击
        if (getIdDom(lastYearId)) {
            // 存在已经跨页面了，但是id不存在了
            getIdDom(lastYearId).style = "";
        }
    } else {
        // 第一次点击
        getIdDom('year-' + year).style = "";
        
    }
    lastYearId = 'year-' + thisYear;
    year = thisYear;
    item.style = "background-color: #39f;color: #fff";
    var pagesArr = Array.from(document.querySelectorAll('.page'));
    pagesArr.forEach(function(item){
        item.style = 'display: none'
    });
    if (lastMonthId !== '') {
        // 非第一次点击
        getIdDom(lastMonthId).style = "";
    }
    changeStyle("month-" + month, 'background-color: #39f;color: #fff');
    lastMonthId = 'month-' + month;
    getIdDom("backChangeYearPage").innerHTML = year;
    changeStyle('changeMonthHead', 'display: inline-block');
    changeStyle('thirdPage', 'display: block');
}

function chooseMonth(){
    var target = event.target;
    if (target.nodeName === 'EM') {
        // 表示当前点击的为em节点
        if (lastMonthId !== '') {
            // 非第一次点击
            getIdDom(lastMonthId).style = "";
        } else {
            // 第一次点击
            getIdDom('month-' + month).style = "";
        }
        month = parseInt(target.innerHTML);
        lastMonthId = 'month-' + month;
        target.style = "background-color: #39f;color: #fff";

        renderFirstPage(year, month, date);

        // 展示首页
        var pagesArr = Array.from(document.querySelectorAll('.page'));
        pagesArr.forEach(function(item){
            item.style = 'display: none'
        });
        changeStyle('firstPage', 'display: block');
        changeStyle(['changeDateHead', 'monthLeft', 'monthRight'], 'display: inline-block');
    }
}

// 判断对象类型
function isType(type){
    return function(obj){
        return toString.call(obj) == '[object ' + type + ']';
    }
}

// 改变display属性
function changeStyle(ids, styles){
    var isString = isType('String'),
        isArray = isType('Array');
    if (isString(ids)) {
        getIdDom(ids).style = styles;
    } else if (isArray(ids)) {
        ids.forEach(function(item){
            getIdDom(item).style = styles;
        })
    }
}
