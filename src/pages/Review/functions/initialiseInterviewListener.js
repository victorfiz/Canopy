import {onSnapshot, collection, doc } from 'firebase/firestore';
import { db } from '../../../firebase'
import { handleProcessInterviewDuration } from './handleProcessInterviewDuration'

export const initialiseInterviewListener = async ({
    interviewId,
    setInterviewState = ()=>{}


}) => {
    const interviewRef = doc(db, 'interviews', interviewId);
   
    const unsubscribe = onSnapshot(interviewRef, (interviewData) => {

        interviewData = interviewData.data();

        setInterviewState(interviewData)

    
    }); 

    



}