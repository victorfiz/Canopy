import React from 'react';
import { FaChevronRight } from "react-icons/fa";
import { formatDate } from '../functions/formatDate';

function ReviewRow({review, index}) {
    const rowClass = index % 2 === 0 ? 'even-rev rev-row' : 'odd-rev rev-row';
    return (
        <tr key={review.reviewId} className={rowClass}>
            <td className="rev-row-ttl pl-2">{review.interviewTitle}</td>
            <td className="rev-row-datetime">{formatDate(review.interviewDate)}</td>
            <td className="rev-row-duration">{review.interviewLength}</td>
            <td className="rev-row-insights pl-10">{review.numberOfInterviewInsights}</td>
            <td className="last-table-item"
                onClick={() => {
                    window.location.href = `/review/${review.reviewId}`;
                }}
            >
                <FaChevronRight style={{ color: '#BC13FE', fontWeight: 100, cursor:"pointer" }} />
            </td>
        </tr>
    );
}

export default ReviewRow;