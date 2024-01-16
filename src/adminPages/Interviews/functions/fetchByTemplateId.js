import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
import { formatDate } from "./formatDate";
import { handleProcessInterviewDuration } from "./handleProcessInterviewDuration";

export async function fetchByTemplateId({
    templateId,
    setInterviews
}) {
    console.log("fetching by templateId", templateId)
    try {
        const q = query(collection(db, "interviews"), where("interview_template_id", "==", templateId));
        const querySnapshot = await getDocs(q);
        const interviews = [];
        querySnapshot.forEach((doc) => {
            const docData = doc.data();
            const { title, timestamp, uid, email, interview_duration, transcription_evaluation } = docData;
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
        console.error('Error fetching interviews by email:', error);
        setInterviews([]);
    }
}
