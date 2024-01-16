import { onSnapshot, doc, addDoc } from "firebase/firestore";
import { db } from '../../../firebase';

export function addUserListener({
    setUserState,
    uid, 

}) {
    const userRef = doc(db, 'users', uid);
    const unsubscribe = onSnapshot(userRef, (doc) => {

       
        if (doc.exists()) {

            setUserState(doc.data())
        } 

    });
}