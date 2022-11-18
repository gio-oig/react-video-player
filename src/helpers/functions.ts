// function formatTime(timeInSeconds: number) {
//   const result = new Date(timeInSeconds * 1000).toISOString().substr(11, 8);
//   const minutes = result.substr(3, 2);
//   const seconds = result.substr(6, 2);

//   return `${minutes}:${seconds}`;
// }

const leadingZeroFormatter = new Intl.NumberFormat(undefined, {
  minimumIntegerDigits: 2,
});

function formatTime(time: number) {
  const seconds = Math.floor(time % 60);
  const minutes = Math.floor(time / 60) % 60;
  const hours = Math.floor(time / 3600);
  if (hours === 0) {
    return `${minutes}:${leadingZeroFormatter.format(seconds)}`;
  } else {
    return `${hours}:${leadingZeroFormatter.format(
      minutes
    )}:${leadingZeroFormatter.format(seconds)}`;
  }
}

export default formatTime;
