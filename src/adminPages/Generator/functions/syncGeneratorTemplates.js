import { onSnapshot, doc, setDoc } from "firebase/firestore";
import { db } from '../../../firebase';

export async function syncGeneratorTemplates({
    careerState, 
    careerId, 
}){
    const interviewRef = doc(db, 'admin', 'HR', 'careers', careerId);
    await setDoc(interviewRef, careerState);

}