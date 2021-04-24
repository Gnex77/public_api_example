import { useQuery } from 'react-query';
import fetcher from './fetcher';

const formatShow = (record = {}) => {
  const { show: { id, url, name, premiered, image, summary, network } } = record;
  const { name: networkName } = network;
  return { id, url, name, premiered, image, summary, network: { name: networkName } };
};

const formatSeason = (record = {}) => {
  const { id, url, number: seasonNumber, episodeOrder: numberOfEpisodes, premiereDate, image, summary } = record;
  return { id, url, seasonNumber, numberOfEpisodes, premiereDate, image, summary };
};

const formatSeasons = (data = []) => data.map(record => formatSeason(record));

const formatShows = (data = []) => data.map(record => formatShow(record));

const searchTvShows = async (query) => {
  const url = `${process.env.REACT_APP_BASE_URL}/search/shows?q=${query}`;
  const data = await fetcher(url);
  return formatShows(data);
};

const getShow = async (id) => {
  const url = `${process.env.REACT_APP_BASE_URL}/shows/${id}`;
  const data = await fetcher(url);
  return formatShow(data);
};

const getShowSeasons = async (id) => {
  const url = `${process.env.REACT_APP_BASE_URL}/shows/${id}/seasons`;
  const data = await fetcher(url);
  return formatSeasons(data);
};

export const useShowSearch = query => useQuery(['showSearch', query], () => searchTvShows(query));

export const useShow = id => useQuery(['show', id], () => getShow(id));

export const useShowSeasons = id => useQuery(['showSeasons', id], () => getShowSeasons(id));

