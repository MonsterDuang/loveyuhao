$(() => $(".year").text(new Date().getFullYear()));

$("#calc").on("click", () => {
  let curamount = $("#curamount").val();
  const income = $("#income").val();
  const payout = $("#payout").val();
  let deposit = $("#deposit").val();
  const calcmonth = $("#calcmonth").val();
  let data = [], year = new Date().getFullYear(), month = new Date().getMonth() + 2;
  const rate = 0.01;
  for (let i = 0; i < calcmonth; i++) {
    let curyear = year, curmonth = month + i;
    if (i > 0) {
      curamount = data[i - 1].amount;
      deposit = data[i - 1].alldeposit;
      curmonth = data[i - 1].month + 1;
      curyear = data[i - 1].year;
    }
    if (curmonth > 12) {
      curyear += 1;
      curmonth = 1;
    }
    const ca = Number(curamount) + Number(income) + Number(deposit) * rate - Number(payout);
    const caa = Math.floor(ca).toString().split("");
    const curdeposit = caa[1] >= 5 ? (`${caa[0]}5`).padEnd(caa.length, "0") : (caa[0]).padEnd(caa.length, "0");
    const alldeposit = Number(deposit) + Number(curdeposit);
    const nextinterest = alldeposit * rate;
    data.push({
      year: curyear,
      month: curmonth,
      amount: ca - Number(curdeposit),
      curdeposit: Number(curdeposit),
      alldeposit: alldeposit,
      nextinterest: nextinterest,
    });
  }
  console.log(data);
  let html = "";
  for (let i = 0; i < data.length; i++) {
    html += `<div class="note">
        <div>${data[i].year}年${data[i].month >= 10 ? data[i].month : "0" + data[i].month}月</div>
        <div>- 本月余额：<b>￥${(data[i].amount).toFixed(2)}</b></div>
        <div>- 本月存款：<b>￥${(data[i].curdeposit).toFixed(2)}</b></div>
        <div>- 累计存款：<b>￥${(data[i].alldeposit).toFixed(2)}</b></div>
        <div>- 下月利息：<b>￥${(data[i].nextinterest).toFixed(2)}</b></div>
      </div>`;
  }
  $("#result").html(html);
});

$("#reset").on("click", () => {
  $("#curamount").val("");
  $("#income").val("");
  $("#payout").val("");
  $("#deposit").val("");
  $("#calcmonth").val("");
  $("#result").html("");
});

$(".copyright").on("click", () => {
  location.pathname = '/loveyuhao';
});
