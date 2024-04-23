import React from 'react';
import './PageNotFound.css';

function PageNotFound() {
  return (
    <div className='NotFound'>
    <h1>404</h1>
      <h2 className='NotFound__heading'>Page Not Found</h2>
      <p className='NotFound__description'>Sorry, the page you are looking for does not exist.</p>
    </div>
  );
}

export default PageNotFound;
