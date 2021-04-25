import React from 'react';
import * as api from '../hooks/tvShowHooks';
import ShowCard from './ShowCard';

const isEmptyOrNull = value => value === null || value.toString().length === 0 || value === undefined;

const Content = () => {
  const [query, setQuery] = React.useState(null);
  const { isLoading, isError, data: shows, refetch, error } = api.useShowSearch(query);
  const onQueryChange = e => setQuery(e.target.value);
  const onQueryClick = e => {
    e.preventDefault();
    if (!isEmptyOrNull(query)) {
      refetch();
    }
  };

  if (isError) return <p>Error: {error.message}</p>;

  const renderShows = shows => {
    const chunked = [];
    while (shows.length > 0) {
      const chunk = shows.splice(0, 3);
      chunked.push(chunk);
    }

    return chunked.map(shows => shows.map(show => {
      return (
        <div className="row row-cols-1 row-cols-3">
          <ShowCard key={show.id} show={show} />
        </div>
      );
    }));
  };

  return (
    <div className="">
      <div className="row">
        <div className="col">
          <section>
            <div className="row">
              <div className="col">
                <div className="input-group">
                  <input
                    id="txt-show-query"
                    value={query}
                    name="txt-show-query"
                    type="text"
                    className="form-control"
                    onChange={onQueryChange}
                    aria-label="Find Shows by Name"
                    aria-describedby="btn-show-query"
                  />
                  <button id="btn-show-query" type="button" className="btn btn-outline-secondary" onClick={onQueryClick}>Find Shows</button>
                </div>
              </div>
              <div className="col">
                <div className="input-group">
                  <input
                    id="txt-show-date-query"
                    name="txt-show-date-query"
                    type="text"
                    className="form-control"
                    aria-label="Find Shows by Date Airing"
                    aria-describedby="btn-show-date-query"
                  />
                  <button id="btn-show-date-query" type="button" className="btn btn-outline-secondary">Find Shows By Date</button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <div className="bg-light py-5">
        {isLoading ? <p>Loading...</p> : shows && renderShows(shows)}
      </div>
    </div>
  );
};

export default Content;