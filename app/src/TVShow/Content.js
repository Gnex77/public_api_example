import React from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import * as api from '../hooks/tvShowHooks';
import ShowCard from './ShowCard';
import formatISO from 'date-fns/formatISO';
import dateFnsFormat from 'date-fns/format';
import parse from 'date-fns/parse'


const isEmptyOrNull = value => value === null || value.toString().length === 0 || value === undefined;

const Content = () => {
  const [query, setQuery] = React.useState('');
  const [selectedDate, setSelectedDate] = React.useState('');
  const [queryDate, setQueryDate] = React.useState('');
  const FORMAT = 'MM/dd/yyyy';
  const { isLoading: isLoadingQueryShows, isError: isQueryError, data: shows, refetch: refetchQuery, error: queryError } = api.useShowSearch(query);
  const { isLoading: isLoadingDateShows, isError: isDateError, data: dateShows, refetch: refetchDateQuery, error: dateError } = api.useShowsByDate(queryDate);
  const onDateChange = (selectedDay) => {
    const formattedQueryDate = formatISO(selectedDay, {representation: 'date'});
    setQueryDate(formattedQueryDate);
    setSelectedDate(selectedDay);
  };

  const parseDate = (str, format, locale) => {
    const parsed = parse(str, format, new Date(), { locale });
    if (DateUtils.isDate(parsed)) {
      return parsed;
    }
    return undefined;
  };

  const formatDate = (date, format, locale) => dateFnsFormat(date, format, { locale });

  const onQueryChange = e => setQuery(e.target.value);
  const onQueryClick = e => {
    e.preventDefault();
    setSelectedDate('');
    if (!isEmptyOrNull(query)) {
      refetchQuery();
    }
  };

  const onDateSearchClick = e => {
    e.preventDefault();
    setQuery('');
    if (!isEmptyOrNull(selectedDate)) {
      refetchDateQuery();
    }
  }

  if (isQueryError) return <p>Error: {queryError.message}</p>;

  if (isDateError) return <p>Error: {dateError.message}</p>;

  const renderShows = (shows = []) => {
    return shows.map(show => <ShowCard key={show.id} show={show} />);
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
                    name="query"
                    type="text"
                    className="form-control"
                    onChange={onQueryChange}
                    aria-label="Find Shows by Name"
                    aria-describedby="btn-show-query"
                  />
                  <button id="btn-show-query" type="button" className="btn btn-outline-secondary" onClick={onQueryClick}>Find Shows by Name</button>
                </div>
              </div>
              <div className="col">
                <div className="input-group">
                  <DayPickerInput
                    value={selectedDate}
                    parseDate={parseDate}
                    formatDate={formatDate}
                    format={FORMAT}
                    onDayChange={onDateChange}
                    placeholder={`${dateFnsFormat(new Date(), FORMAT)}`}
                    inputProps={{ className: 'form-control' }}
                  />
                  <button id="btn-show-date" type="button" className="btn btn-outline-secondary" onClick={onDateSearchClick}>Find Shows by Date</button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <div className="bg-light p-5 shadow">
        <div className="row row-cols-1 row-cols-3">
          {isLoadingQueryShows ? <p>Loading...</p> : renderShows(shows)}
          {isLoadingDateShows ? <p>Loading...</p> : renderShows(dateShows)}
        </div>
      </div>
    </div>
  );
};

export default Content;