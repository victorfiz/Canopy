import { useEffect } from "react";
import { collection, query, where, getDocs, doc, setDoc, arrayUnion } from "firebase/firestore";
import { db } from '../../firebase';

import { useAuth } from '../../auth';

function Success() {
    const { authUser } = useAuth();
    useEffect(() => {
        async function checkPayment() {
            if (!authUser) return;
            console.log("Checking payment", authUser.uid);

            // Set is_subscription to true
            const userRef = doc(db, "users", authUser.uid);
            await setDoc(userRef, {
                 isSubscribed: true, 
                 isOnFreeTrial: false,
                }, { merge: true });
            window.location.assign("/account");
        }
        checkPayment();
    }, [authUser]);

    return (
        <div className="p-4"> Payment Successful, hold on, we're redirecting you back to Canopy!</div>
    );
}

export default Success;