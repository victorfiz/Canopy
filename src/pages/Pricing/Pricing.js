import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../../firebase';
import BackHeader from '../../components/backHeader/BackHeader.js';
import Pricing from '../HomePage/components/Pricing';


const PricingPage = () => {
    let navigate = useNavigate();
    const [isSubscriber, setIsSubscriber] = useState(false);
    const { authUser } = useAuth();
    const [has2SecondsPassed, setHas2SecondsPassed] = useState(false);

    useEffect(() => {
        
        if (authUser) {

            console.log(authUser)
            getUserDocument({ uid: authUser.uid }).then((userDoc) => {
                console.log(userDoc)
                if (userDoc && userDoc.is_subscription) {
                    setIsSubscriber(true)
                }
            })

        } else {
            if (!has2SecondsPassed) return
            navigate("/signup?redirect=/pricing");
        }

    }, [authUser, has2SecondsPassed]);

    useEffect(() => {
        setTimeout(() => {
            setHas2SecondsPassed(true)
        }, 2000)
    }, [])


    async function getUserDocument(data) {
        const { uid } = data;
        try {
            const userDocRef = doc(db, 'users', uid);
            const docSnap = await getDoc(userDocRef);

            if (docSnap.exists()) {
                const userData = docSnap.data();
                return userData;
            } else {
                console.log("No such document!");
            }
        } catch (err) {
            console.log("Error getting document:", err);
        }
    }




    return (
        <div className="pricing-holder bg-[#f5f5f6]">

            <BackHeader
                selected='pricing'
                isBorder={false}
                navigateUrl='/account'
            />

            <div className="hero-pricing ">

 <Pricing/>

      


            </div>

        </div>
    );
};

export default PricingPage;