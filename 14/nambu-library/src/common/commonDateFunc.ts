  //현재 날짜(string)
  export function getToday() {
    const date: Date = new Date();
    return getStringFormat(date);
  }

  //날짜 더하기 (string)
  export function getAddDay(curDate, addDay){
    const newDt = getDateFormat(curDate);
    newDt.setDate(newDt.getDate() + addDay);
    return getStringFormat(newDt);
  }

  //반납시 날짜 차이 구하기 
  export function getDateDiff(curDate, retDate) {
    const curDt = getDateFormat(curDate);
    const retDt = getDateFormat(retDate);
    const diffMS = retDt.getTime() - curDt.getTime();
    const diffDays = Math.ceil(diffMS / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  //string -> date
  export function getDateFormat(curDate) {
    const year = curDate.substring(0, 4);
    const month = parseInt(curDate.substring(4, 6), 10) - 1; // 0~11로 변환
    const day = curDate.substring(6, 8);

    // 2. Date 객체 생성
    return new Date(year, month, day);
  }

  //date -> string
  export function getStringFormat(curDate: Date) {
    const year = curDate.getFullYear();
    const month = String(curDate.getMonth() + 1).padStart(2, "0");
    const day = String(curDate.getDate()).padStart(2, "0");

    return year + month + day;
  }