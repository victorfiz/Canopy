import { onSnapshot, doc, } from "firebase/firestore";
import { db } from '../../../firebase';

export function createUserDocListener({
    authUser, 
    setUserState, 
    setIsResumeUploading = () =>{},
}){


    const uid = authUser.uid;
    // const uid = "nizrC7UvddMFlCE7WeaogHERUkI2"




    const userRef = doc(db, 'users', uid);
    const unsubscribe = onSnapshot(userRef, (doc) => {
        if (doc.exists()) {
           
            setUserState(doc.data())

            setIsResumeUploading(false);
        }

    });
}