export const format = (date: Date, formatString: string) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const hour = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();

  return formatString
    .replace("DD", day < 10 ? `0${day}` : day.toString())
    .replace("MM", month < 10 ? `0${month}` : month.toString())
    .replace("YYYY", year.toString())
    .replace("hh", hour < 10 ? `0${hour}` : hour.toString())
    .replace("mm", min < 10 ? `0${min}` : min.toString())
    .replace("ss", sec < 10 ? `0${sec}` : sec.toString());
}
