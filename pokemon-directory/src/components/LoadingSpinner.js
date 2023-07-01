import React from 'react';
import { Spinner } from 'react-bootstrap';
import '../styles/LoadingSpinner.css';
const LoadingSpinner = () => (
  <Spinner animation="border" role="status" className="loading-spinner">
    <span className="visually-hidden">Loading...</span>
  </Spinner>
);

export default LoadingSpinner;
