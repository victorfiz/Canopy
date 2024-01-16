import axios from 'axios';
import { uploadInterviewVideoToStorage } from './uploadInterviewVideoToStorage.js';
import { stopRTCInstance } from './startVideoRecording.js';
import { db } from '../../../firebase';
import { doc, updateDoc } from 'firebase/firestore';

export const stopVideoRecording = async ({
    videoRecorder,
    interviewId
}) => {

    stopRTCInstance()
    if (videoRecorder) {
        await videoRecorder.stopRecording(async () => {

            let blob = videoRecorder.getBlob();
            const modifiedBlob = new Blob([blob], { type: 'video/webm' });

            const { downloadUrl } = await uploadInterviewVideoToStorage({ file: modifiedBlob, interviewId });
            console.log("location 1", downloadUrl)

            const interviewRef = doc(db, 'interviews', interviewId);

            await updateDoc(interviewRef, {
                downloadUrl
              })

            






        });
    } else {
        console.log("no video recorder");
    }
};