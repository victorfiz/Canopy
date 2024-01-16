import { collection, query, where, getDocs, doc, setDoc, getDoc, arrayUnion } from "firebase/firestore";
import { db } from '../../../firebase';

export async function submitCode ({uid, setBanner, code}){
//get all the codes from the database. 

console.log("submitting code", code);
const codesRef = doc(db, "admin", "Codes");
const codesDoc = await getDoc(codesRef);

const allCodes = codesDoc.data().codes;


console.log("allCodes", allCodes);

let isCode = false;
let careerIDs = [];
let clubName = '';
let promoCodeTagLine = '';


for (let i = 0; i < allCodes.length; i++) {
    if (allCodes[i].code == code) {
        isCode = true;
        clubName = allCodes[i].club_name;
        careerIDs = allCodes[i].career_ids;
        promoCodeTagLine = allCodes[i].promo_code_tag_line;
    }
}

if(isCode){

    const userRef = doc(db, "users", uid);
    await setDoc(userRef, { 
        is_subscription: true,
        subscription_origin: "PROMO", 
        timestamp: Date.now(), 
        is_promo: true,
        club_name: clubName,
        career_ids: careerIDs, 
        promo_code_tag_line: promoCodeTagLine
     }, { merge: true });
}

return {
    isCode: isCode,
}



//check the code exists
//get the club name and interview_ids

}