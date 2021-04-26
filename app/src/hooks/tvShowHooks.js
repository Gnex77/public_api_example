import { useQuery } from 'react-query';

const fetcher = async (url) => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  const response = await fetch(url, requestOptions);
  if (!response.ok) throw new Error(response.statusText);
  return response.json();
};

const formatDateSearchShow = (record = {}) => {
  const { id, url, name, premiered, image, summary, network } = record;
  const networkName = network?.name;
  const show = { id, url, name, premiered, image, summary, network: { name: networkName } };
  return show;
};

const formatShow = (record = {}) => {
  const { show: { id, url, name, premiered, image, summary, network } } = record;
  const networkName = network?.name;
  const show = { id, url, name, premiered, image, summary, network: { name: networkName } };
  return show;
};

const formatSeason = (record = {}) => {
  const { id, url, number: seasonNumber, episodeOrder: numberOfEpisodes, premiereDate, image, summary } = record;
  return { id, url, seasonNumber, numberOfEpisodes, premiereDate, image, summary };
};

const formatSeasons = (data = []) => data.map(record => formatSeason(record));

const formatShows = (data = []) => data.map(record => formatShow(record));

const formatDateSearchShows = (data = []) => data.map(record => formatDateSearchShow(record));

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

const getShowsByDate = async (date) => {
  const url = `${process.env.REACT_APP_BASE_URL}/schedule/web?date=${date}&country=US`;
  const data = await fetcher(url);
  const shows = formatDateSearchShows(data);
  return shows;
};

export const useShowSearch = query => useQuery(['showSearch', query], () => searchTvShows(query), { enabled: false, refetchOnWindowFocus: false });

export const useShow = id => useQuery(['show', id], () => getShow(id), { enabled: false, refetchOnWindowFocus: false });

export const useShowSeasons = id => useQuery(['showSeasons', id], () => getShowSeasons(id), { enabled: false, refetchOnWindowFocus: false });

export const useShowsByDate = date => useQuery(['showsByDate', date], () => getShowsByDate(date), { enabled: false, refetchOnWindowFocus: false });

