import React from 'react';

const Header = () => {
  return (
    <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
      <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
        <i className="bi bi-tv fs-4"></i>&nbsp;
        <span className="fs-4">TV Show Search</span>
      </a>
    </header>
  );
};

export default Header;