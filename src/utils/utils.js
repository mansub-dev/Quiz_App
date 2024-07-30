export function formatSeconds(seconds) {
  const minutes = Math.floor(seconds / 60);
  seconds %= 60;

  return `${make2Digits(minutes)}:${make2Digits(seconds)}`;
}

export function make2Digits(time) {
  return time < 10 ? `0${time}` : time;
}
