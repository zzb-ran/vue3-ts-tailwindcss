export const CalcDuration = (duration: number) => {
  let resultCount: string = '',
    hour: number | string = 0,
    min: number | string = 0,
    sec: number | string = 0;
  duration = duration / 1000;
  hour = Math.floor(duration / 3600);
  min = Math.floor((duration - hour * 3600) / 60);
  sec = Math.floor(duration - hour * 3600 - min * 60);
  hour = hour < 9 ? `0${hour}` : hour;
  min = min < 9 ? `0${min}` : min;
  sec = sec < 9 ? `0${sec}` : sec;
  return hour !== '00' ? `${hour}:${min}:${sec}` : `${min}:${sec}`;
};
