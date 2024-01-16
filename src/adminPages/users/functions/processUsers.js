import { formatDate } from "./formatDate";
import { collection, query, orderBy, limit, onSnapshot, getDocs } from 'firebase/firestore';
import { db } from "../../../firebase";


export function processInterviews({
    setUsers, 
    setUids
}){

    const users = [];
    const uids = [];

    const q = query(collection(db, 'users'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        users.length = 0;
        uids.length = 0;

        const sortedDocs =     querySnapshot.docs.sort((a, b) => {
            if(a.data().timestamp && b.data().timestamp) return b.data().timestamp - a.data().timestamp;
            else if(a.data().timestamp) return -1;
            else return 1;
        })


        sortedDocs.forEach(doc=>{

            uids.push(doc.id);
            const docData = doc.data();
            const uid = doc.id;
            const {timestamp, email, interview_ids, reviews, is_subscribed} = docData;
            users.push([
                email, 
                (is_subscribed)?"Yes":"No",
                interview_ids? interview_ids.length :0,
                reviews? reviews.length :0, 
                !formatDate(timestamp/1000).includes("NaN")? formatDate(timestamp/1000) : "--" , 

            ])

            

        })

        setUsers(users);
        setUids(uids);
    });

    return unsubscribe;
}
