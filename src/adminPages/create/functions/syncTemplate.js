import { onSnapshot, doc, addDoc, updateDoc } from "firebase/firestore";
import { db } from '../../../firebase';
export async function syncTemplate ({
    interviewTemplateStateRef,
    interviewTemplateId
}) {

    const templateRef = doc(db, 'interview_templates', interviewTemplateId);
    return updateDoc(templateRef, {
        ...interviewTemplateStateRef.current
    })

}