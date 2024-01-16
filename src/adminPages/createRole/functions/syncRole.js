import { onSnapshot, doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from '../../../firebase';

export async function syncRole({
    roleState,
    roleId
}) {
    try{ 
    const roleRef = doc(db, 'roles', roleId);
    return setDoc( roleRef, {
        ...roleState
    }, { merge: true });
} catch (error) {
    console.log(error);
}

}
