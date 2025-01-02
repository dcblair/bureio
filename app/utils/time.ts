export const calculateSecondsToMinutesAndSeconds = (time: string | number) => {
  const seconds = Math.floor(Number(time || 0) % 60);
  const minutes = Math.floor(Number(time || 0) / 60);

  return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
};
