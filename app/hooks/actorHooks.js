import { useQuery } from 'react-query';
import fetcher from './fetcher';

const searchActors = async (query) => {
  const url = `${process.env.REACT_APP_BASE_URL}/search/people?q=${query}`;
  return await fetcher(url);
};

const getActorShows = async (id) => {
  const url = `${process.env.REACT_APP_BASE_URL}/people/${id}/castcredits?embed=show`;
  return await fetcher(url);
};

export const useActorSearch = query => useQuery(['actorSearch', query], () => searchActors(query));

export const useActorShows = id => useQuery(['actorShows', id], () => getActorShows(id));