import {auth, db } from '../../../firebase';
import { updateDoc, arrayUnion, doc } from 'firebase/firestore';

export async function uploadReview({
    interviewId, 
    interviewState, 
    reviewState, 
    authUser
}){

    console.log("template id",interviewState.interview_template_id)

    try{

    // if(reviewState && interviewState.interview_duration &&authUser){
        console.log(reviewState.length)
        if(true){
        console.log(authUser.uid)
        setTimeout(() => {

            console.log(interviewState.title)

            updateDoc(doc(db, 'users', authUser.uid), {
                completed_templates:arrayUnion(interviewState.interview_template_id),
                reviews: arrayUnion({
                    title:interviewState.title, 
                    score:  (reviewState?.reduce((sum, review) => {
                        if (review.ranking !== undefined && review.ranking !== null) {
                            return sum + review.ranking;
                        }
                        return sum;
                    }, 0) / (reviewState?.filter(review => review.ranking !== undefined && review.ranking !== null).length || 1)).toFixed(1), 
                    timestamp: interviewState.timestamp *1000,
                    interview_duration: interviewState.interview_duration,
                    review_id: interviewId, 
                    feedback_count: reviewState.length

                })
            })
            
        }, 5000);
    } 
} catch(err){
    console.log(err)
}
    // reviewsFormattedArray.push({
    //     interviewTitle: review.title,
    //     interviewDate: review.timestamp / 1000,
    //     interviewLength: convertMillisecondsToTime(review.interview_duration),
    //     numberOfInterviewInsights: review.feedback_count,
    //     reviewId: review.review_id,
    //     score: review.score
    // })

}