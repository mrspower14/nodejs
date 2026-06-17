const dayjs = require("dayjs");
require("dayjs/locale/ko");                     //KOREA 
const utc = require("dayjs/plugin/utc");        //UTC
const relativeTimePlugin = require("dayjs/plugin/relativeTime");    //.fromNow()가 작동

dayjs.locale("ko");
dayjs.extend(utc);
dayjs.extend(relativeTimePlugin);
// const dd = dayjs().fromNow();
// console.log(dd);

const nowDayjs = dayjs();
//console.log(nowDayjs);
console.log(nowDayjs.format("YYYY-MM-DD HH:mm:ss"));
console.log(nowDayjs.format("YYYY년 MM월 DD일  HH시 mm분 ss초"));
console.log(nowDayjs.format("YYYY년 M월 D일  HH시 mm분 ss초"));

const dateDayjs = dayjs("2026-08-07");
//console.log(dateDayjs);
console.log(dateDayjs.format("YYYY-MM-DD HH:mm:ss"));
console.log(dayjs("2026-12-30").format("YYYY년 M월 D일  HH시 mm분 ss초"));

console.log("");
console.log("시간 더하기 빼기:", nowDayjs.format("YYYY년 MM월 DD일  HH시 mm분 ss초"));
const nextWeekDayjs = dayjs().add(7, 'day');
console.log(nextWeekDayjs.format("YYYY년 MM월 DD일  HH시 mm분 ss초"));
const nextWeekjs = dayjs().add(7, 'week');
console.log(nextWeekjs.format("YYYY년 MM월 DD일  HH시 mm분 ss초"));
const nextMonthjs = dayjs().add(7, 'month');
console.log(nextMonthjs.format("YYYY년 MM월 DD일  HH시 mm분 ss초"));
const nextYearjs = dayjs().add(7, 'year');
console.log(nextYearjs.format("YYYY년 MM월 DD일  HH시 mm분 ss초"));

console.log("");
console.log("특정 날짜까지 남은 일수 계산");
const startDt = dayjs("2026-04-01");
const endDt = dayjs("2026-10-23");
const diffDt = endDt.diff(startDt, 'day');
console.log(`날짜차이: ${endDt.format("YYYY년 MM월 DD일  HH시 mm분 ss초")} 에서 ${startDt.format("YYYY년 MM월 DD일  HH시 mm분 ss초")} 차이는 ${diffDt} 일 이다.`);
const diffWeek = endDt.diff(startDt, 'week');
console.log(`Week차이: ${endDt.format("YYYY년 MM월 DD일  HH시 mm분 ss초")} 에서 ${startDt.format("YYYY년 MM월 DD일  HH시 mm분 ss초")} 차이는 ${diffWeek} 주 이다.`);
const diffMon = endDt.diff(startDt, 'month');
console.log(`Month차이: ${endDt.format("YYYY년 MM월 DD일  HH시 mm분 ss초")} 에서 ${startDt.format("YYYY년 MM월 DD일  HH시 mm분 ss초")} 차이는 ${diffMon} 개월 이다.`);


//요일 확인
console.log("");
console.log(`오늘은 ${dayjs().format("d")} 요일 입니다.`);      //5
console.log(`오늘은 ${dayjs().format("dd")} 요일 입니다.`);     //fr
console.log(`오늘은 ${dayjs().format("ddd")} 요일 입니다.`);    //fri
console.log(`오늘은 ${dayjs().format("dddd")} 요일 입니다.`);   //frid

const start = dayjs("2024-01-01");
const end = dayjs("2024-12-31");
const range = [];
for ( let date = start ; 
        date.isBefore(end) || date.isSame(end, 'day') ; 
        date = date.add(1, 'day')) 
{
    range.push(date.format('YYYY년 MM월 DD일'));
}

console.log(range.length);
//console.log(range);
console.log(range.filter((r) => r.includes("02월")));
