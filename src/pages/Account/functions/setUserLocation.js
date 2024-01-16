import { doc, updateDoc } from "firebase/firestore";
import {db } from "../../../firebase";


export async function setUserLocation({
    uid
}) {


    console.log("setUserLocation", uid);
    const apiKey = 'abeed8819d9ab7c38e4c260c720a65ac';
    const url = `http://api.ipstack.com/check?access_key=${apiKey}`;

    const response = await fetch(url)
        
    const data = await response.json();
    
    const userRef = doc(db, "users", uid);

    await updateDoc(userRef, {
        location: data, 
        isLocationSet: true
    });


}