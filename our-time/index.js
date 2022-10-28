$(() => {
  const randomnum = Math.floor(Math.random() * 15);
  $(".content").css("background-image", `url(../bg/${randomnum}.png)`);
  $(".today").html(`- 今天是<b>${formatDate()}</b>...`);
  const today = new Date(formatDate(0, 0, 1));
  const todaytime = today.getTime();
  const curYear = today.getFullYear();
  const curMonth = today.getMonth() + 1;
  const curDay = today.getDate();
  const marrstr = curMonth == 5 && curDay == 30 ? `- 今天是我们结婚<b>${toChinesNum(curYear - 2022)}周年</b>纪念!!!` : '';
  $(".surprisemarr").html(marrstr);
  const birthstr = curMonth == 9 && curDay == 27 ? `- 今天是我们朗朗<b>${toChinesNum(curYear - 2022)}周岁</b>生日!!!` : curMonth == 2 && curDay == 17 ? `- 今天是亲爱的老婆<b>${toChinesNum(curYear - 1998)}周岁</b>生日!!!` : curMonth == 11 && curDay == 19 ? `- 今天是Monster<b>${toChinesNum(curYear - 1996)}周岁</b>生日!!!` : '';
  $(".surprisebirth").html(birthstr);
  const lovedaytime = new Date("2022-05-30").getTime();
  const lovediff = Math.floor(calc(todaytime - lovedaytime));
  const loveOpt = [520, 1024, 1314, 2048, 5200, 10000];
  const lovestr = loveOpt.includes(lovediff) ? `- 今天我们结婚<b>${lovediff}</b>天啦!!!` : '';
  $(".surpriselove").html(lovestr);
  const babyborntime = new Date("2022-09-27").getTime();
  const babydiff = Math.floor(calc(todaytime - babyborntime));
  const babystr = (babydiff == 30 || babydiff % 100 == 0) ? `- 今天我们宝宝<b>${babydiff == 30 ? '满月' : babydiff + '天'}</b>啦!!!` : '';
  $(".surprisebaby").html(babystr);
  if (marrstr || lovestr || babystr || birthstr) $("head").append("<link rel='stylesheet' href='./fireworks.css'>");
  const marriage = formatDate('2022-05-30');
  $(".marriage").html(`- 我们结婚<b>${marriage.year&&marriage.year+'年'}${marriage.month&&marriage.month+'个月'}${marriage.day&&marriage.day+'天'}</b>啦!!!`);
  $(".marr100").html(`- 结婚百日纪念：<b>${formatDate('2022-05-30', 100)}</b>!!!`);
  $(".marr1k").html(`- 结婚千日纪念：<b>${formatDate('2022-05-30', 1000)}</b>!!!`);
  $(".marr1w").html(`- 结婚万日纪念：<b>${formatDate('2022-05-30', 10000)}</b>!!!`);
  const babyborn = formatDate('2022-09-27');
  $(".babyborn").html(`- 我们宝宝出生<b>${babyborn.year&&babyborn.year+'岁'}${babyborn.month&&babyborn.month+'个月'}${babyborn.day&&babyborn.day+'天'}</b>啦!!!`);
  $(".baby30").html(`- 宝宝满月纪念：<b>${formatDate('2022-09-27', 30)}</b>!!!`);
  $(".baby100").html(`- 宝宝百日纪念：<b>${formatDate('2022-09-27', 100)}</b>!!!`);
  $(".baby1k").html(`- 宝宝千日纪念：<b>${formatDate('2022-09-27', 1000)}</b>!!!`);
  $(".baby1w").html(`- 宝宝万日纪念：<b>${formatDate('2022-09-27', 10000)}</b>!!!`);
  $(".year").text(new Date().getFullYear());

  $("#calc").on("click", () => {
    const date = $("#date").val();
    const count = $("#count").val();
    if (!date) return alert("请选择日期！");
    if (!count) return alert("请输入天数！");
    $("#result").text("结果：" + formatDate(date, count));
  });
  $("#reset").on("click", () => {
    $("#date").val("");
    $("#count").val("");
    $("#result").text("");
  });
  $("#calc2").on("click", () => {
    const satrtDate = $("#startDate").val();
    const endDate = $("#endDate").val();
    if (!satrtDate) return alert("请选择开始日期！");
    if (!endDate) return alert("请选择结束日期！");
    const start = new Date(satrtDate).getTime();
    const end = new Date(endDate).getTime();
    if (start > end) return alert("开始时间不能大于结束时间！");
    const diff = end - start;
    const count = calc(diff);
    $("#result2").text(`相差天数：${count}天`);
  });
  $("#reset2").on("click", () => {
    $("#startDate").val("");
    $("#endDate").val("");
    $("#result2").text("");
  });
  $(".copyright").on("click", () => {
    location.pathname = '/loveyuhao';
  });
});
const calc = (diff) => {
  return diff / 1000 / 60 / 60 / 24;
}
const formatDate = (dt, count, isLocal) => {
  let date = new Date();
  if (dt) date = new Date(new Date().getTime() - new Date(dt).getTime());
  if (count) date = new Date(new Date(dt).getTime() + count * 24 * 60 * 60 * 1000);
  const year = (!dt || count) ? date.getFullYear() : date.getFullYear() - 1970;
  const month = (!dt || count) ? date.getMonth() + 1 : date.getMonth();
  const day = (!dt || count) ? date.getDate() : date.getDate() - 1;
  const formatYear = year < 10 ? `0${year}` : year;
  const formatMonth = month < 10 ? `0${month}` : month;
  const formatDay = day < 10 ? `0${day}` : day;
  if ((!dt || count) && !isLocal) return `${formatYear}年${formatMonth}月${formatDay}日`;
  if (isLocal) return `${formatYear}-${formatMonth}-${formatDay}`;
  return {
    year: formatYear == '00' ? '' : formatYear, 
    month: formatMonth == '00' ? '' : formatMonth, 
    day: formatDay == '00' ? '' : formatDay
  };
}
/* *
 * 数字转成汉字
 * @params num === 要转换的数字
 * @return 汉字
 * */
const toChinesNum = (num) =>  {
  const changeNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
  const unit = ['', '十', '百', '千', '万']
  num = parseInt(num)
  const getWan = (temp) => {
    const strArr = temp.toString().split('').reverse()
    let newNum = ''
    let newArr = []
    strArr.forEach((item, index) => {
      newArr.unshift(item === '0' ? changeNum[item] : changeNum[item] + unit[index])
    })
    let numArr = []
    newArr.forEach((m, n) => {
      if (m !== '零') numArr.push(n)
    })
    if (newArr.length > 1) {
      newArr.forEach((m, n) => {
        if (newArr[newArr.length - 1] === '零') {
          if (n <= numArr[numArr.length - 1]) {
            newNum += m
          }
        } else {
          newNum += m
        }
      })
    } else {
      newNum = newArr[0]
    }

    return newNum
  }
  let overWan = Math.floor(num / 10000)
  let noWan = num % 10000
  if (noWan.toString().length < 4) {
    noWan = '0' + noWan
  }
  return overWan ? getWan(overWan) + '万' + getWan(noWan) : getWan(num)
}
