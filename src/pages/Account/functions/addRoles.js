import { collection, query, where, getDocs, doc, setDoc, arrayUnion, updateDoc } from "firebase/firestore";
import { db } from '../../../firebase'; 

export async function addRoles({ uid, roleIcon, roleId, roleName }) {

    try {


        const userTemplatesRef = collection(db, 'users');

        updateDoc(doc(userTemplatesRef, uid), {
            roles: arrayUnion({
                roleIcon: roleIcon,
                roleId: roleId,
                roleName: roleName,
                selected: true
            })
        });
      

    } catch (err) {
        console.log(err);
    }
}

