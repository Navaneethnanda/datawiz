import React from 'react';

const ErrorPage = () => (
  <div className="error-page full-width">
    <h1>404</h1>
    <div className="error-content full-width">Opps, Page Not Found !</div>
    <a href="/" className="default-cta">
      <span>Back to Home</span>
    </a>
  </div>
);

export default ErrorPage;
