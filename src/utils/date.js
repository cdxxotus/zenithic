export const format = (date, formatString) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const hour = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();

  return formatString
    .replace("DD", day < 10 ? `0${day}` : day)
    .replace("MM", month < 10 ? `0${month}` : month)
    .replace("YYYY", year)
    .replace("hh", hour < 10 ? `0${hour}` : hour)
    .replace("mm", min < 10 ? `0${min}` : min)
    .replace("ss", sec < 10 ? `0${sec}` : sec);
}
