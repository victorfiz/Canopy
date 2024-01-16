import { onSnapshot, doc, } from "firebase/firestore";
import { db } from '../../../firebase';

export function createCategoryListener({
    setCategoriesState
}) {

    const categoriesRef = doc(db, 'admin', "admin");
    const unsubscribe = onSnapshot(categoriesRef, (doc) => {
        if (doc.exists()) {

            const categoriesData = doc.data();

            setCategoriesState(categoriesData)
        }

    });
}