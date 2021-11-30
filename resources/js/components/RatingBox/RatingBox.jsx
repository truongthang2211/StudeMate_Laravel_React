import React from 'react';
import './RatingBox.css'
function RatingBox({up,down}) {
    return (
        <div className="rating-box">
            <span className="rating-up">
                <span>{up}</span>
                <i className="fas fa-thumbs-up"></i>
            </span>
            <span className="rating-down">
                <i className="fas fa-thumbs-down"></i>
                <span>{down}</span>
            </span>
        </div>
    );
}

export default RatingBox;