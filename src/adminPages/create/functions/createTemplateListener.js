import { onSnapshot, doc, addDoc } from "firebase/firestore";
import { db } from '../../../firebase';

export function createTemplateListener({
    setInterviewTemplateState,
    interviewTemplateId, 
    interviewTemplateStateRef
}) {
    const templateRef = doc(db, 'interview_templates', interviewTemplateId);
    const unsubscribe = onSnapshot(templateRef, (doc) => {

       
        if (doc.exists()) {

            setInterviewTemplateState(doc.data())
            console.log('template listener updated')
        } 

    });
}