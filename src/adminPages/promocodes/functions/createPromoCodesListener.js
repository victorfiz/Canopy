import { onSnapshot, doc, } from "firebase/firestore";
import { db } from '../../../firebase';

export function createPromoCodesListener({
    setCategoriesState
}) {

    const categoriesRef = doc(db, 'admin', "Codes");
    const unsubscribe = onSnapshot(categoriesRef, (doc) => {
        if (doc.exists()) {

            const categoriesData = doc.data();
            console.log(categoriesData)

            setCategoriesState(categoriesData)
        } else {
            console.log("No such document!");
        }

    });
}