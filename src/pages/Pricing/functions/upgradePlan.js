
import { doc, getDoc } from "firebase/firestore";
import { db } from '../../../firebase';
import { httpsCallable } from 'firebase/functions';
import { functions } from "../../../firebase";

const createUserCheckout = httpsCallable(functions, 'create_user_checkout');

export async function upgradePlan({authUser}) {
    console.log('upgrade plan')
    //check if user is logged in

    if (!authUser)  window.location.assign("/signup")



    const {checkout_session} = (await createUserCheckout({ uid: authUser.uid, price_id: "price_1O5AfKJDLhsISwB2JmElUQpm"})).data

    console.log(checkout_session)
    const {url} = checkout_session

    window.location.assign(checkout_session.url)

    

}



