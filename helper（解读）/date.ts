const genCustomToString = (date: Date, sep: string = "-") => {
  const year = date.getFullYear();
  let month: number | string = date.getMonth() + 1;
  let day: number | string = date.getDate();
  if (day < 10) {
    day = `0${day}`;
  }
  if (month < 10) {
    month = `0${month}`;
  }
  return year + sep + month + sep + day;
};

function msOfDays(count: number) {
  const dayMillisecond = 1000 * 60 * 60 * 24;
  return count * dayMillisecond;
}

function getDateFromString(str: string) {
  if (typeof str !== "string") return;
  const a: any[] = str.split(/[^0-9]/);
  return new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);
}

export { genCustomToString, msOfDays, getDateFromString };
