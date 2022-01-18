import { IArtists, IRecommendSong } from '../interface/home';
import { CalcDuration } from './common';

export const CalcPlayCount = (playCount: number) => {
  let resultCount: string = '';
  if (playCount <= 99999999 && playCount > 9999) {
    resultCount = Math.floor(playCount / 10000) + '万';
  } else if (playCount > 99999999) {
    resultCount = Math.floor(playCount / 100000000) + '亿';
  } else {
    resultCount = playCount.toString();
  }
  return resultCount;
};

export const CalcRecommendSong = (recommendSong: IRecommendSong) => {
  const artists: any[] = recommendSong.song.artists;
  let newArtists: string = '',
    newArtistList: string[] = [];
  if (artists.length < 2) {
    newArtists = artists[0].name;
  } else {
    artists.forEach((artist: IArtists) => {
      newArtistList.push(artist.name);
    });
    newArtists = newArtistList.join(' / ');
  }
  return {
    artists: newArtists,
    duration: CalcDuration(recommendSong.song.duration)
  };
};

export const CalcDayRecommendSong = (dayRecommendSong: IRecommendSong) => {
  const artists: any[] = dayRecommendSong.ar;
  let newArtists: string = '',
    newArtistList: string[] = [];
  if (artists.length < 2) {
    newArtists = artists[0].name;
  } else {
    artists.forEach((artist: IArtists) => {
      newArtistList.push(artist.name);
    });
    newArtists = newArtistList.join(' / ');
  }
  return {
    artists: newArtists,
    duration: CalcDuration(dayRecommendSong.dt)
  };
};
