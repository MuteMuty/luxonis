import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner: React.FC = () => {
    return (
        <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Backend is setting up...</p>
            <p>Sit back, this might take a while</p>
        </div>
    );
};

export default LoadingSpinner;
