$(() => {
  const randomnum = Math.floor(Math.random() * 15);
  $(".content").css("background-image", `url(/bg/${randomnum}.png)`);
  $(".today").text(`- 今天是${formatDate(1)}...`);
  $(".year").text(new Date().getFullYear());
  const perfect = $("#perfect")[0];
  let start = 0, speed = 1, isRotate = false;
  var timer = null;
  const rotateFn = () => {
    timer = setInterval(() => {
      isRotate = true;
      start = (start + speed) % 360;
      $(".musicicon img").css("transform", `rotate(${start}deg)`);
    }, 10);
  };
  $(".musicicon img").on("click", () => {
    if (isRotate) {
      clearInterval(timer);
      isRotate = false;
      perfect.pause();
    } else {
      rotateFn();
      perfect.play();
    }
  });
  setInterval(() => {
    $(".togethertimes .times").html(formatDate());
  }, 1000);
  $(".copyright").on("click", () => {
    location.pathname = '/loveyuhao/our-time';
  });
});
const formatDate = (yh) => {
  const loveday = new Date('2021-12-05');
  const today = new Date();
  let date = new Date(today.getTime() - loveday.getTime());
  if (yh) date = today;
  let year = date.getFullYear() - 1970;
  let month = date.getMonth();
  let day = date.getDate() - 1;
  if (yh) {
    year = date.getFullYear();
    month = date.getMonth() + 1;
    day = date.getDate();
  }
  const hour = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();
  const formatYear = year < 10 ? `0${year}` : year;
  const formatMonth = month < 10 ? `0${month}` : month;
  const formatDay = day < 10 ? `0${day}` : day;
  const formatHour = hour < 10 ? `0${hour}` : hour;
  const formatMin = min < 10 ? `0${min}` : min;
  const formatSec = sec < 10 ? `0${sec}` : sec;
  if (yh) return `${formatYear}年${formatMonth}月${formatDay}日`;
  return `<b>${formatYear}</b>年
          <b>${formatMonth}</b>月
          <b>${formatDay}</b>天
          <b>${formatHour}</b>小时
          <b>${formatMin}</b>分钟
          <b>${formatSec}</b>秒`
}
