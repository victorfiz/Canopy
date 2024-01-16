import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import { storage } from "../../../firebase.js";
const BUCKET_URL = "gs://humanview-d6bc8.appspot.com";


export async function uploadInterviewVideoToStorage({file, interviewId}) {

    const docId = uuidv4();
    const bucket = `${BUCKET_URL}/interviews/${interviewId}/${docId}.webm`;
    const storageRef = ref(storage, bucket);

    const snapshot = await uploadBytes(storageRef, file);
    const downloadUrl = await getDownloadURL(snapshot.ref);

    return { downloadUrl, docId };
}

