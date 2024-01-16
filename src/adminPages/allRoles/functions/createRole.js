import { getFirestore, collection, addDoc } from "firebase/firestore";
import { db } from "../../../firebase";


const rolesCollection = collection(db, "roles");

export async function createRole() {

    const docRef = await addDoc(rolesCollection, {
        timestamp: Date.now(), 
        rounds:[{
            title:"Round 1",
            roundId:1,
            emoji:"👍",
        }]
    });

}

