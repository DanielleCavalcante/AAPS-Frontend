import React from "react";
import './ComingSoon.css';

const ComingSoon = () => {
    return (
        <div className="coming-soon-container">
            <h1 className="coming-soon-title">Em Breve!</h1>
            <p className="coming-soon-text">Estamos trabalhando nisso.</p>
            <img src="src/assets/coming-soon-image.png" alt="coming-soon-image1" className="coming-soon-image" />
        </div>
    );
}

export default ComingSoon;
