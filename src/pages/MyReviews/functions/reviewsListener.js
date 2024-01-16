import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../firebase'
import { convertMillisecondsToTime } from './convertsMillisecondsToTime';
import { formatDate } from '../functions/formatDate';

export function reviewsListener({
    authUser,
    setReviews,
    setReviewIds
}) {
    const interviewRef = doc(db, 'users', authUser.uid);

    const unsubscribe = onSnapshot(interviewRef, (doc) => {
        if (doc.exists()) {
            // Document exists, update the state with the data
            const { reviews } = doc.data();

            console.log(reviews);

            let reviewsFormattedArray = [];

            if (reviews) {


                reviews.forEach((review) => {
                    reviewsFormattedArray.push({
                        interviewTitle: review.title,
                        interviewDate: review.timestamp,
                        interviewLength: convertMillisecondsToTime(review.interview_duration),
                        numberOfInterviewInsights: review.feedback_count,
                        reviewId: review.review_id,
                        score: review.score
                    })
                })
            }

            console.log("reviewsFormattedArray", reviewsFormattedArray)


            let reviewsRows = [];
            let reviewIds = [];
            reviewsFormattedArray.reverse().forEach((review) => {
                reviewIds.push(review.reviewId)
                reviewsRows.push([review.interviewTitle, formatDate(review.interviewDate/1000000), review.interviewLength, review.score || "--"])
            })

            setReviews(reviewsRows)
            setReviewIds(reviewIds)


        }

    });

}