import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";

export async function getFirebaseDocument ({
    formElement,
    setDocumentData
}){
    getDoc(doc(db, formElement)).then((doc) => {
        if (doc.exists()) {
            console.log("Document data:", doc.data());
            setDocumentData(doc.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    })
}