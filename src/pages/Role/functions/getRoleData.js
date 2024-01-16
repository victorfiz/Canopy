import { db } from '../../../firebase';
import { doc, getDoc } from "firebase/firestore";

export async function getRoleData ({
    roleId, 
    setRole
}){
    const roleRef = doc(db, 'roles', roleId);
    const roleDoc = await getDoc(roleRef);
    if (roleDoc.exists()) {
        setRole(roleDoc.data());
    } else {
        console.log("No such document!");
    }
}