import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
import { formatDate } from "./formatDate";
import { handleProcessInterviewDuration } from "./handleProcessInterviewDuration";

export async function fetchByUid({
    uid,
    setInterviews
}) {
    console.log("fetching by uid", uid)
    try {
        const q = query(collection(db, "interviews"), where("uid", "==", uid));
        const querySnapshot = await getDocs(q);
        const interviews = [];
        querySnapshot.forEach((doc) => {
            const docData = doc.data();
            const { title, timestamp, email, uid, transcription_evaluation,interview_duration } = docData;
            interviews.push(
                [
                    title,
                    formatDate(timestamp / 1000),
                    email || uid,
                    interview_duration? handleProcessInterviewDuration({duration:interview_duration}): "--",
                    transcription_evaluation?"Yes":"No"
                ]
            );
        });
        setInterviews(interviews);
    } catch (error) {
        console.error('Error fetching interviews by uid:', error);
        setInterviews([]);
    }
}
