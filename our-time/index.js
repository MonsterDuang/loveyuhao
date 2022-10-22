$(() => {
  const bgcolor = ["burlywood", "cornflowerblue", "darkgoldenrod", "deepskyblue", "darkorange", "aquamarine"];
  const randomnum = Math.floor(Math.random() * 6);
  $(".content").css("background-color", bgcolor[randomnum]);
  $(".today").text(`- 今天是${formatDate()}...`);
  const marriage = formatDate('2022-05-30');
  $(".marriage").html(`- 我们结婚<b>${marriage.year&&marriage.year+'年'}${marriage.month&&marriage.month+'月'}${marriage.day&&marriage.day+'天'}</b>了!!!`);
  $(".marr100").html(`- 结婚百日纪念：<b>${formatDate('2022-05-30', 100)}</b>!!!`);
  $(".marr1k").html(`- 结婚千日纪念：<b>${formatDate('2022-05-30', 1000)}</b>!!!`);
  $(".marr1w").html(`- 结婚万日纪念：<b>${formatDate('2022-05-30', 10000)}</b>!!!`);
  const babyborn = formatDate('2022-09-27');
  $(".babyborn").html(`- 我们宝宝出生<b>${babyborn.year&&babyborn.year+'年'}${babyborn.month&&babyborn.month+'月'}${babyborn.day&&babyborn.day+'天'}</b>了!!!`);
  $(".baby100").html(`- 宝宝百日纪念：<b>${formatDate('2022-09-27', 100)}</b>!!!`);
  $(".baby1k").html(`- 宝宝千日纪念：<b>${formatDate('2022-09-27', 1000)}</b>!!!`);
  $(".baby1w").html(`- 宝宝万日纪念：<b>${formatDate('2022-09-27', 10000)}</b>!!!`);
  $(".year").text(new Date().getFullYear());

  $("#calc").on("click", () => {
    const date = $("#date").val();
    const count = $("#count").val();
    if (date && count)
      $("#result").text("结果：" + formatDate(date, count));
  })
});
const formatDate = (dt, count) => {
  let date = new Date();
  if (dt) date = new Date(new Date().getTime() - new Date(dt).getTime());
  if (count) date = new Date(new Date(dt).getTime() + count * 24 * 60 * 60 * 1000);
  const year = (!dt || count) ? date.getFullYear() : date.getFullYear() - 1970;
  const month = (!dt || count) ? date.getMonth() + 1 : date.getMonth();
  const day = (!dt || count) ? date.getDate() : date.getDate() - 1;
  const formatYear = year < 10 ? `0${year}` : year;
  const formatMonth = month < 10 ? `0${month}` : month;
  const formatDay = day < 10 ? `0${day}` : day;
  if (!dt || count) return `${formatYear}年${formatMonth}月${formatDay}日`;
  return {
    year: formatYear == '00' ? '' : formatYear, 
    month: formatMonth == '00' ? '' : formatMonth, 
    day: formatDay == '00' ? '' : formatDay};
}