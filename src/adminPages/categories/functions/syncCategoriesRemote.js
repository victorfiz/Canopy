import { doc, setDoc } from "firebase/firestore";
import { db } from '../../../firebase';

export async function syncCategoriesRemote({
    categoriesState
}) {

    const categoriesRef = doc(db, 'admin', "admin");
    await setDoc(categoriesRef, categoriesState);
}