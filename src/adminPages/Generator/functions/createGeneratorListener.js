import { onSnapshot, doc, } from "firebase/firestore";
import { db } from '../../../firebase';

export function createGeneratorListener({
    setCareerState, 
    careerId
}){
    const interviewRef = doc(db, 'admin', 'HR', 'careers', careerId);
    const unsubscribe = onSnapshot(interviewRef, (doc) => {
        if (doc.exists()) {
           
            setCareerState(doc.data())
        }

    });
}