# DatePicker
just a datePicker

第一版：纯js实现

通过切换月份和年份，来展示不同的日历页面，实际上是根据当前年月，来进行页面的重绘，所以页面渲染是一个函数，所需参数就是当前选中的年份和月份。

const render = (month, year) => {

};

render();

首先，日历除去首行day有几行？
一共6行，Math.ceil((31 - 1) / 7 + 1) = 6


三块组成：上月剩余，本月，下月开始

1，上月剩余
首先要知道本月1号是周几(x)，然后从周日到x的天数就是上月剩余天数，从几号到几号，需要了解本月是几月，来推算出上月月末是几号，其实也就是上月有多少天。

2，本月
只需知道当月是几月，当月多少天，然后按顺序排。

3，下月开始
只需要知道下月1号是周几，然后42个数字还剩多少，从1排到最后就可以了



