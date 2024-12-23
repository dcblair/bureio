export const calculateSecondsToMinutesAndSeconds = (time: string | number) => {
  const seconds = Math.floor(Number(time) % 60) ?? 0;
  const minutes = Math.floor(Number(time) / 60) ?? 0;

  return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
};
