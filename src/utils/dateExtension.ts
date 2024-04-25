export default function getCurrentDate() {
  const date = new Date();

  const yy = date.getFullYear();
  const MM = date.getMonth().toString().padStart(2, "0");
  const dd = date.getDay().toString().padStart(2, "0");
  const hh = date.getHours().toString().padStart(2, "0");
  const mm = date.getMinutes().toString().padStart(2, "0");
  const ss = date.getSeconds().toString().padStart(2, "0");

  return `${yy}${MM}${dd}-${hh}${mm}${ss}`;
}
