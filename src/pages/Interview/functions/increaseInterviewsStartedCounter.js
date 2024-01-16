import { db } from '../../../firebase'; 
import { doc, updateDoc, increment } from "firebase/firestore";

export async function increaseInterviewsStartedCounter({uid}) {
    const userRef = doc(db, 'users', uid);

    // Atomically increment the interviews_started field
    await updateDoc(userRef, {
        interviews_started: increment(1)
    });
}