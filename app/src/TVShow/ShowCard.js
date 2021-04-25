import React from 'react';

const ShowCard = ({ show }) => {
  return (
    <div className="col">
      <div className="card border-dark shadow">
        <img className="card-img-top" src={show.image?.medium} alt={show.name} />
        <div className="card-body">
          <h5 className="card-title">{show.name}</h5>
          <p className="card-text">{show.summary}</p>
        </div>
        <div className="card-footer">
          <button type="button" className="btn btn-light btn-sm">Details</button>
        </div>
      </div>
    </div>
  );
};

export default ShowCard;