import React from 'react';
import './style.scss';

interface ErrorPageProps {
  message?: string;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ message }) => {
  return (
    <div className="error-page">
      <div className="error-content">
        <h1>Error</h1>
        <p>{message?message:"NOT FOUND!"}</p>
      </div>
    </div>
  );
};

export default ErrorPage;
