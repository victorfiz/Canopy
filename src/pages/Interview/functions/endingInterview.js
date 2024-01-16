import { db } from '../../../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { stopVideoRecording } from './stopVideoRecording.js';
import { stopRTCInstance } from './startVideoRecording.js';

export async function endingInterview({
  interviewDuration,
  interviewId,
  videoRecorder,
  setDisplayedWidget,
  videoRecorderRef

}) {

  // console.log("interviewDuration", interviewDuration)

  const interviewRef = doc(db, 'interviews', interviewId);

  stopRTCInstance()

  stopVideoRecording({ interviewId, videoRecorder })

  await updateDoc(interviewRef, {
    interview_duration: interviewDuration * 1000,
    status: "completed", 

  })



  return new Promise((resolve, reject) => {

    setTimeout(() => {

      window.streamResponseSocket.close();

      const startedSpeakingEvent = new CustomEvent('startedSpeakingEvent');
      document.dispatchEvent(startedSpeakingEvent);

      if(interviewDuration<120){
        window.location.replace(`/interview-short/${interviewId}`)
      } else {
        setDisplayedWidget("ReviewLoading")

      }
      resolve();
    }, 2000);
  })

}