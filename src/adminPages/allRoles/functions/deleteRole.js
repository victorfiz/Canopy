import { getFirestore, collection, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../firebase";

const rolesCollection = collection(db, "roles");

export async function deleteRole(roleId) {
    try {
        const roleDocRef = doc(rolesCollection, roleId);
        await deleteDoc(roleDocRef);
        console.log(`Role with ID ${roleId} deleted successfully`);
    } catch (error) {
        console.error("Error deleting role: ", error);
    }
}
