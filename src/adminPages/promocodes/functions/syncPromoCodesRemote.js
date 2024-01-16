import { doc, setDoc } from "firebase/firestore";
import { db } from '../../../firebase';

export async function syncCodesRemote({
    categoriesState
}) {

    const categoriesRef = doc(db, 'admin', "Codes");
    await setDoc(categoriesRef, categoriesState);
}