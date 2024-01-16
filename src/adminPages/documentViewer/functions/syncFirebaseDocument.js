import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";

export async function syncFirebaseDocument({
    formElement,
    documentData,
    setDocumentData
}) {
    try {
        await updateDoc(doc(db, formElement), documentData);

    } catch (err) {
        console.log(err)
    }
}