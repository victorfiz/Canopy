import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
import { formatDate } from "./formatDate";
import { handleProcessInterviewDuration } from "./handleProcessInterviewDuration";

export async function fetchByEmail({
    email,
    setInterviews, 
    setInterviewIds,
}) {
    console.log("fetching by email", email)
    try {
        const q = query(collection(db, "interviews"), where("email", "==", email));
        const querySnapshot = await getDocs(q);
        const interviews = [];
        const interviewIds = [];
        querySnapshot.forEach((doc) => {
            interviewIds.push(doc.id);
            const docData = doc.data();
            const { title, timestamp, uid, email, transcription_evaluation, interview_duration } = docData;
            console.log(docData)
            interviews.push(
                [
                    title,
                    formatDate(timestamp / 1000),
                    email || uid,
                    interview_duration? handleProcessInterviewDuration({duration:interview_duration}): "--",
                    (transcription_evaluation)?"Yes":"No"
                ]
            );
        });
        setInterviews(interviews);
        setInterviewIds(interviewIds);

    } catch (error) {
        console.error('Error fetching interviews by email:', error);
        setInterviews([]);
    }
}
