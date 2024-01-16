import React from 'react';
import ReviewRow from './ReviewRow';
import NoReviews from './NoReviews';

const ReviewRows = ({ reviews }) => {
    return (
        <table className="review-rows-container">
            <thead className={reviews.length?'thead-revs':"hidden"}>
                <tr>
                    <th className="th-word pl-2 pb-2">Title</th>
                    <th className="th-word pb-2">Timestamp</th>
                    <th className="th-word pb-2">Duration</th>
                    <th className="th-word pb-2">Insights</th>
                </tr>
            </thead>

           
                <tbody>
                {reviews
                    .sort((a, b) => b.interviewDate - a.interviewDate)
                    .map((review, index) => (
                        <ReviewRow review={review} key={index} index={index}/>
                    ))}
                    </tbody>
            
        </table>
    );
};

export default ReviewRows;
