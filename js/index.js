window.onload = function(){

    // 默认是当天
    let chosenDate = new Date();
    let year = chosenDate.getFullYear();
    let month = chosenDate.getMonth();
    let date = chosenDate.getDate();

    const render = (year, month, date = 1) => {
        month++;
        const datePage = [];    // 最终展示页面的所有日期合集        
        // 第一部分，上月月末几天
        // 首先要知道上月一共多少天
        const getAlldays = (year, month) => {
            if (month <= 7) {
                // 1-7月
                if (month % 2 === 0) {
                    // 偶数月
                    if (month === 2) {
                        // 2月特殊
                        if (year % 4 === 0) {
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
        let lastMonthAllDays = getAlldays(year, month - 1);    // 上月天数
        let chosenFirstMonthDay = new Date(year, month - 1, 1).getDay();    // 当月1号周几

        var datePageTemplate = ``;
        var num = 0;

        for (let i = lastMonthAllDays - chosenFirstMonthDay + 1; i < lastMonthAllDays + 1; i++ ) {
            datePageTemplate += `<span>${i}</span>`;
            num++;
        }

        // 第二部分，当月总天数
        let chosenMonthAllDays = getAlldays(year, month);  // 当月天数
        for(let i = 1; i < chosenMonthAllDays + 1; i++) {
            datePageTemplate += `<span class="currentMonth">${i}</span>`;
            num++;
        }

        // 第三部分，剩余天数
        for (let i = 1; i < 43 - num; i++) {
            datePageTemplate += `<span>${i}</span>`;
        }


        let templateString = `${datePageTemplate}`;

        document.getElementById('dateYear').innerHTML = year;
        document.getElementById('dateMonth').innerHTML = month;
        document.getElementById('dateBody').innerHTML = templateString;
    
    }

    render(year, month, date);

    document.getElementById('yearLeft').onclick = () => {
        year--;
        render(year, month, date)
    }

    document.getElementById('monthLeft').onclick = () => {
        month--;
        render(year, month, date)
    }

    document.getElementById('yearRight').onclick = () => {
        year++;
        render(year, month, date)
    }

    document.getElementById('monthRight').onclick = () => {
        month++;
        render(year, month, date)
    }

}