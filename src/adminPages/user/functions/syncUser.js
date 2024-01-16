import { onSnapshot, doc, addDoc, updateDoc } from "firebase/firestore";
import { db } from '../../../firebase';
export async function syncUser ({
    userState,
    uid
}) {


    const userRef = doc(db, 'users', uid);
    return updateDoc(userRef, {
        ...userState
    })

}