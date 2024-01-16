import { getFirestore, collection, addDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";
import { formatDate } from "./formatDate";

const rolesCollection = collection(db, "roles");


export function rolesListener({
    setRoles,
    setRoleIds
}) {

    onSnapshot(rolesCollection, (querySnapshot) => {
        const allRoles = []
        const allRoleIds = []
        querySnapshot.forEach((doc) => {

            allRoleIds.push(doc.id)

            const {timestamp, roleName, roleIcon, rounds, roleId} = doc.data()

            allRoles.push([
                roleName || "--",
                roleId,
                <a
                href={roleIcon}
                target="_blank"
                > 
                <div className="underline pointer"> {roleName}.png</div>
                </a>
                || "--",
                rounds?.length || "--"


         
            
            ])

        });

        console.log('allRoles', allRoles)
        setRoles(allRoles)
        setRoleIds(allRoleIds)


    });
}
