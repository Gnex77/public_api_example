import React from 'react';
import parse from 'html-react-parser';

const ShowCard = ({ show }) => {
  const imageSrc = show.image?.medium || 'https://via.placeholder.com/250'
  return (
    <div className="col py-3">
      <div className="card border-dark shadow">
        <img className="card-img-top" src={imageSrc} alt={show.name} />
        <div className="card-body">
          <h5 className="card-title">{show.name}</h5>
          <div className="card-text">{show.summary && parse(show.summary)}</div>
        </div>
      </div>
    </div>
  );
};

export default ShowCard;