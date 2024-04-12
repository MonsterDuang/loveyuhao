$(() => {
  const randomnum = Math.floor(Math.random() * 15);
  $('.content').css('background-image', `url(./bg/${randomnum}.png)`);
  $('.today').text(`- 今天是${formatDate(1)}...`);
  $('.year').text(new Date().getFullYear());
  const perfect = $('#perfect')[0];
  let start = 0,
    speed = 1,
    isRotate = false;
  var timer = null;
  const rotateFn = () => {
    timer = setInterval(() => {
      isRotate = true;
      start = (start + speed) % 360;
      $('.musicicon img').css('transform', `rotate(${start}deg)`);
    }, 10);
  };
  $('.musicicon img').on('click', () => {
    if (isRotate) {
      clearInterval(timer);
      isRotate = false;
      perfect.pause();
    } else {
      rotateFn();
      perfect.play();
    }
  });
  $('.copyright').on('click', () => {
    location.pathname = '/loveyuhao/our-time';
  });
  var gs = 'ymdhms',
    timer = null;
  getTimes(0, gs);
  $('.times').on('click', () => {
    if (gs == 'ymdhms') gs = 'total';
    else gs = 'ymdhms';
    clearInterval(timer);
    getTimes(0, gs);
  });
  function getTimes(jt, gs) {
    $('.togethertimes .times').html(formatDate(jt, gs));
    timer = setTimeout(() => {
      getTimes(jt, gs);
    }, 1000);
  }
});
const formatDate = (jt, gs) => {
  const loveday = new Date('2021-12-05');
  const today = new Date();
  let date = today;
  if (!jt) date = new Date(today.getTime() - loveday.getTime());
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = '';
  let min = '';
  let sec = '';
  if (!jt) {
    if (gs == 'ymdhms') {
      year = date.getFullYear() - 1970;
      month = date.getMonth();
      day = date.getDate() - 1;
      hour = date.getHours();
      min = date.getMinutes();
      sec = date.getSeconds();
    }
    if (gs == 'total') {
      const ts = new Date(date).getTime();
      sec = (ts / 1000).toFixed(0);
      min = Math.ceil(sec / 60);
      hour = Math.ceil(min / 60);
      day = Math.ceil(hour / 24);
      month = (day / 30).toFixed(1);
      year = (month / 12).toFixed(1);
    }
  }
  const formatYear = year.toString().length < 2 ? `0${year}` : year;
  const formatMonth = month.toString().length < 2 ? `0${month}` : month;
  const formatDay = day.toString().length < 2 ? `0${day}` : day;
  const formatHour = hour.toString().length < 2 ? `0${hour}` : hour;
  const formatMin = min.toString().length < 2 ? `0${min}` : min;
  const formatSec = sec.toString().length < 2 ? `0${sec}` : sec;
  if (jt) return `${formatYear}年${formatMonth}月${formatDay}日`;
  return `<b>${formatYear}</b>年
          <b>${formatMonth}</b>月
          <b>${formatDay}</b>天
          <b>${formatHour}</b>小时
          <b>${formatMin}</b>分钟
          <b>${formatSec}</b>秒`;
};
