import React, { useEffect, useState, useRef } from 'react';
import Webcam from 'react-webcam';
import { useParams } from 'react-router-dom';
import { initSubtitleListener } from '../functions/initSubtitleListener'
import VADWidget from '../../Hooks/VADWidget.js';
import StopWatch from './Stopwatch';
import SubtitlesContainer from './SubtitlesContainer';
import ReportIssue from './ReportIssue';
import { endingInterview } from '../functions/endingInterview';
import VADDisplay from './VADDisplay';

import { startVideoRecording } from '../functions/startVideoRecording';
import FullIDE from './FullIDE.js';
import useCreateWebSocket from '../../Hooks/initialiseInterviewerSocket.js'

import Button from '../../../components/button/Button';
import FocusView from '../../../components/focusView/FocusView';
import Banner from '../../../components/banner/Banner';
import AnimateHead from './AnimateHead.js';



function Stream({

  setDisplayedWidget,
  setVideoRecorder,
  videoRecorder

}) {


  const overlayVideoUrl = "https://firebasestorage.googleapis.com/v0/b/humanview-d6bc8.appspot.com/o/assets%2FsynthesiaFiles%2FCanopyIntro.mp4?alt=media&token=0ad09de1-b4df-44be-be6e-d8c4d8ff12f4"

  const nodUrl = "https://firebasestorage.googleapis.com/v0/b/humanview-d6bc8.appspot.com/o/assets%2FsynthesiaFiles%2Fsilentnod.mp4?alt=media&token=e5d97a26-74ed-422c-a47a-d7a74b9a1df7"
  const nodRef = useRef(null);
  const blinkURL = "https://firebasestorage.googleapis.com/v0/b/humanview-d6bc8.appspot.com/o/assets%2FsynthesiaFiles%2Fblinksilent.mp4?alt=media&token=19b36489-318f-4fbe-9ee4-cdce99537121"
  const blinkRef = useRef(null);
  const headshakeUrl = "https://firebasestorage.googleapis.com/v0/b/humanview-d6bc8.appspot.com/o/assets%2FsynthesiaFiles%2Fheadshake.mp4?alt=media&token=e63873a7-8463-4b7a-b4f6-67e0be380e1a"
  const headshakeRef = useRef(null);


  const [isEndingInterview, setIsEndingInterview] = useState(false);

  const interviewStopwatch = useRef(0);
  const [stopwatchStart, setStopwatchStart] = useState(false);
  const [isCaptionsToggled, setIsCaptionsToggled] = useState(false);
  const trackSubtitlesAndAudio = useRef([]);
  const [showModal, setShowModal] = useState(false);

  const [isMuted, setIsMuted] = useState(false);
  const [isEndInterviewBannerVisible, setIsEndInterviewBannerVisible] = useState(false);
  const [isVadDisplay, setIsVadDisplay] = useState(false);
  const isMutedRef = useRef(false);
  const webcamRef = useRef(null);
  const [isPreTranscriptEvent, setIsPreTranscriptEvent] = useState(true);
  const [webcamCenterMessage, setWebcamCenterMessage] = useState(
    <div>
      <div className='text-center text-[0.6em]'> Say something like...</div>
      <div className='text-center'> Thanks! It's great to be here.</div>

    </div>
  );
  const [isWebcamCenterMessageVisible, setIsWebcamCenterMessageVisible] = useState(false);
  const { interviewId } = useParams();

  const videoRecorderRef = useRef(null);



  useEffect(() => {
    setInterval(() => {
      interviewStopwatch.current += 1;
    }, 1000);
  }, [])

  useEffect(() => { initSubtitleListener({ trackSubtitlesAndAudio, interviewStopwatch }) }, [])

  useEffect(() => {
    window.addEventListener("transcriptDeepgramEvent", (event) => {

      const { transcript } = event.detail;


      if (isPreTranscriptEvent) {

        setWebcamCenterMessage(
          <div>
            <div className='text-center text-[0.6em]'> Now wait...</div>
            <div className='text-center'>Just for a second or two</div>
          </div>
        )

        setTimeout(()=>{
          setIsWebcamCenterMessageVisible(false);
        }, 2000)

          
        setIsPreTranscriptEvent(false);

      } else {
        setIsWebcamCenterMessageVisible(false);
      }

    })
  }, [])

  useEffect(() => {


    window.addEventListener("finishedEventVerified", async (event) => {
      return new Promise((resolve, reject) => {
        setTimeout(async () => {
          setIsEndInterviewBannerVisible(true)
          resolve();

        }, 3000)
      })
    })
  }, [])


  useEffect(() => {
    // startVideoRecording now returns a cleanup function
    startVideoRecording({ setVideoRecorder, videoRecorder, videoRecorderRef });
  }, []);

  useEffect(() => {
    setTimeout(() => {

      setIsWebcamCenterMessageVisible(true);
    }, 3800)
  }, [])

  useCreateWebSocket({ active: true, interviewId, isMuted: isMutedRef })

  return (

    <div className="flex flex-col  min-h-[100vh] w-[100%] sm:w-auto flex-grow overflow-hidden sm:h-[90vh] max-h-[100vh] sm:min-h-auto sm:p-5">
      <VADWidget />
      <div className='sm:w-[100%] ml-[auto] mr-[auto] rounded w-[100%] flex flex-col  items-center justify-center min-h-[100vh] sm:h-[90vh] sm:min-h-auto'>

        {isEndInterviewBannerVisible &&
          <div className='flex justify-center'>
            <Banner
              className='mb-10 mt-2'
              bannerTitle="Your Interview is Over!"
              bannerSubtitle="Press the End Interview button to review your interview."
              width='600px'
              type="caution"
            />
          </div>
        }
        <div className='w-[100%]'>
          {/* {isChatExpanded &&
          <div className='ref-holder'>
            <video ref={overlayVideoRef} src={overlayVideoUrl} playsInline />
            <video ref={nodRef} className="bg-black" style={{ display: 'none' }} src={nodUrl} muted autoPlay />
            <video ref={blinkRef} className="bg-black" style={{ display: 'none' }} src={blinkURL} muted autoPlay />
            <video ref={headshakeRef} className="bg-black" style={{ display: 'none' }} src={headshakeUrl} muted autoPlay />
          </div>
        } */}
          <div className='items-center flex justify-center relative'>
            <div className={`note absolute z-10 bg-black text-white p-3 rounded-lg font-semibold text-[2em] justify-center transition-opacity duration-300
   ${isWebcamCenterMessageVisible ? "opacity-70" : "opacity-0"}`}>
              {webcamCenterMessage}
            </div>
            <Webcam muted={true} ref={webcamRef} className="webcam-big sm:h-auto rounded-lg flex-grow w-full" />
          </div>


          {/* <AnimateHead
              animateHeadDuration={animateHeadDuration}
            /> */}


          <div className='subtitles-holder h-[100px] '>

            {isCaptionsToggled && <SubtitlesContainer />}


          </div>

          <div className='fixed bottom-[20px] sm:hidden flex justify-center  w-full items-center'>

            <Button
              size="medium"
              type="destructive"
              className=' bottom-0  sm:block sm:mb-0 sm:static mr-2'
              text="End Interview"
              isAsync={true}
              loadingText={"Ending Interview"}
              inheritIsLoading={isEndingInterview}
              onPress={

                async () => {

                  console.log("ending", videoRecorderRef)

                  return await endingInterview({
                    setDisplayedWidget,
                    interviewDuration: interviewStopwatch.current,
                    interviewId,
                    setVideoRecorder,
                    videoRecorder,
                    videoRecorderRef
                  })
                }


              }
            />
            <Button
              className='ml-2 mr-2 sm:block'
              onPress={
                async () => {

                  return new Promise((resolve, reject) => {
                    setTimeout(() => {
                      if (isMuted) {
                        setIsMuted(false);
                        isMutedRef.current = false;
                      } else {
                        setIsMuted(true);
                        isMutedRef.current = true;
                      }
                      resolve();
                    }, 1000);
                  })


                }}
              isAsync={true}
              loadingText={isMuted ? "Unmuting..." : "Muting..."}
              size="small"
              type="secondary"
              text={isMuted ? "Unmute" : "Mute"}
            >
            </Button>
            <Button
              className='ml-2 mr-2 sm:block'
              onPress={() => {

              }
              }

              size="small"
              type="secondary"
              text="Open Messages"
            >
            </Button>
          </div>
          <div className='controls-holder flex-row flex-grow sm:flex hidden'
          >
            <StopWatch stopwatchStart={stopwatchStart} setStopwatchStart={setStopwatchStart} />

            <Button
              isAsync={false}
              size="small"
              type="secondary"
              text="Report Issue"
              className='ml-4 mr-2 hidden sm:block'
              onPress={() => setShowModal(true)}
            >

              <div className='report-text'>Report Issue</div>

            </Button>

            {/* 
          <Button
            className='ml-2 mr-2 hidden sm:block'
            onPress={() => setIsCaptionsToggled(!isCaptionsToggled)}
            isAsync={false}
            size="small"

            type="secondary"
            text={isCaptionsToggled ? "Hide Captions" : "Show Captions"}
          >
          </Button>


          <Button
            className='ml-2 mr-2 hidden sm:block'
            onPress={() => setIsVadDisplay(!isVadDisplay)}
            isAsync={false}
            size="small"
            type="secondary"
            text={isVadDisplay ? "Hide Vad" : "Show Vad"}
          >
          </Button> */}


            {/* <Button
            className='ml-2 mr-2 hidden sm:block'
            onPress={() => {
              console.log("generating response")

              window.streamResponseSocket.send(JSON.stringify({
                transcript_boolean: false,
                interview_id:interviewId,
                created_at: Date.now(),
                message_type: "transcript",
              
              }));
            }}
            isAsync={false}
            size="small"
            type="secondary"
            text={"Generate Response"}
          >
          </Button> */}



            <Button
              className='ml-2 mr-2 hidden sm:block'
              onPress={
                async () => {

                  return new Promise((resolve, reject) => {
                    setTimeout(() => {
                      if (isMuted) {
                        setIsMuted(false);
                        isMutedRef.current = false;
                      } else {
                        setIsMuted(true);
                        isMutedRef.current = true;
                      }
                      resolve();
                    }, 1000);
                  })


                }}
              isAsync={true}
              loadingText={isMuted ? "Unmuting..." : "Muting..."}
              size="small"
              type="secondary"
              text={isMuted ? "Unmute" : "Mute"}
            >
            </Button>



            <Button
              size="medium"
              type="destructive"
              className='absolute bottom-0 mb-4 hidden sm:block sm:mb-0 sm:static'
              text="End Interview"
              isAsync={true}
              loadingText={"Ending Interview"}
              inheritIsLoading={isEndingInterview}
              onPress={

                async () => {

                  return await endingInterview({
                    setDisplayedWidget,
                    interviewDuration: interviewStopwatch.current,
                    interviewId,
                    videoRecorderRef,
                    videoRecorder
                  })
                }


              }
            />
          </div>
        </div>
      </div>


      <FocusView isChildVisible={showModal} setIsChildVisible={setShowModal}>
        <ReportIssue
          showModal={showModal}
          setShowModal={setShowModal}
        />
      </FocusView>


      <FocusView isChildVisible={isVadDisplay} setIsChildVisible={setIsVadDisplay}>
        <VADDisplay
          isVadDisplay={isVadDisplay}
          setIsVadDisplay={setIsVadDisplay}
        />
      </FocusView>

    </div>

  );





}
export default Stream