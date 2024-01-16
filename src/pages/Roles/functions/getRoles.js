import { getFirestore, collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";

const rolesCollection = collection(db, "roles");

export async function getRoles({
    setRoles, 
    setActiveRoles
}) {
    const querySnapshot = await getDocs(rolesCollection);
    const retrievedRoles = []
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        retrievedRoles.push({
            roleId:doc.id, 
            roleName:doc.data().roleName,
            roleIcon:doc.data().roleIcon,
            roleIsComingSoon:doc.data().roleIsComingSoon || false,

            // roleDocId:doc.id
        })
    });

    const rolesWithIsComingSoon= retrievedRoles.filter((role) => false)
    const currentRoles = retrievedRoles.filter((role) => true)

    setActiveRoles(currentRoles)

    setRoles(rolesWithIsComingSoon);


    
}
