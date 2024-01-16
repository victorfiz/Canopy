import {onSnapshot, collection } from 'firebase/firestore';
import { db } from '../../../firebase'
import { handleProcessInterviewDuration } from './handleProcessInterviewDuration'

export const initialiseReviewListener = async ({
    interviewId,
    setReviewState = ()=>{}


}) => {
    const collectionRef = collection(db, 'interviews', interviewId, "completed_sections");
   
    const unsubscribe = onSnapshot(collectionRef, (collectionData) => {

        const collectionDocs = collectionData.docs;

        let scoreAccumulator = 0;
        let numberOfCompletedSections = 0;
        
        let docs = collectionDocs.map(doc => doc.data())

        setReviewState(docs)

        docs.forEach(doc => {
            if(doc.processed&!doc.ignore){
                console.log("doc", doc.ranking)
                scoreAccumulator += doc.ranking;
                numberOfCompletedSections += 1;
            }
        })

        const averageScore = scoreAccumulator/numberOfCompletedSections;

        console.log("averageScore", averageScore)





    
    }); 

    



}