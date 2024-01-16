import { onSnapshot, doc, } from "firebase/firestore";
import { db } from '../../../firebase';

export function createUserDocListener({
    authUser, 
    setUserState
}){
    const uid = authUser.uid;
    const interviewRef = doc(db, 'users', uid);
    const unsubscribe = onSnapshot(interviewRef, (doc) => {
        if (doc.exists()) {
           
            setUserState(doc.data())
        }

    });
}