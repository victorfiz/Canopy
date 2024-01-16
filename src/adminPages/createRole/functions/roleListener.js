import { getFirestore, collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";


export function roleListener({
    setRoleState,
    roleId,
    roleState
}) {
    const rolesRef= doc(db, "roles", roleId);
    onSnapshot(rolesRef, (querySnapshot) => {
        console.log('querySnapshot.data()', querySnapshot.data())
        setRoleState({
            ...querySnapshot.data()
        }) 
    });
}
