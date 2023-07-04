import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner: React.FC = () => {
    return (
        <div className="loading-spinner">
            <div className="spinner"></div>
            <div className="text">Backend is setting up...</div>
        </div>
    );
};

export default LoadingSpinner;
