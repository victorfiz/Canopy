import React, { useState, useEffect, useRef } from 'react';
import Button from '../../../components/button/Button.js';
import useCreateWebSocket from '../../../pages/Hooks/initialiseInterviewerSocket.js';
import VADWidget from "../../../pages/Hooks/VADWidget.js";
import { generateInterviewId } from '../functions/generateInterviewId.js';
import Banner from '../../../components/banner/Banner.js';
function Test({
    interviewTemplateState, 
    selectedQuestionIndex
}) {

    const [isWebsocketActive, setIsWebsocketActive] = useState(false);
    const [liveTestText, setLiveTestText] = useState("Start live test");
    const isTestRunning = useRef(false);
    const [interviewId, setInterviewId] = useState(null);


    useCreateWebSocket({ active: isWebsocketActive, interviewId })





    const startTest = async () => {
        return new Promise((resolve) => {
            const intervalId = setInterval(() => {

                if (!isTestRunning.current) {
                    clearInterval(intervalId);
                    resolve();
                }
            }, 1000);
        });
    };




    return (
        <>
        <div className='mt-3 ml-10'> 
        <Banner
            type='caution'
            bannerTitle='Live Test'
            bannerSubtitle='Live tests are not perfect replicas of how the interview will run. They are designed to allow you to quickly iterate on your template and get a feel for how it will run. You can click the same button to toggle the test active or inactive.'
            className='mt-3'
        />
        </div>
        <div className='flex justify-center items-center h-full'>
            {isWebsocketActive && <VADWidget />}
      
            <div className='flex mb-60'>
          
                <Button
                    type={'secondary'}
                    isAsync={true}
                    className='ml-4'
                    text={liveTestText}
                    loadingText={liveTestText}
                    onPress={async () => {

                        if (!isTestRunning.current) {
                            setLiveTestText("Spinning up...");

                            isTestRunning.current = true;
                            const fetchedInterviewId = await generateInterviewId({
                                interviewTemplateState, 
                                selectedQuestionIndex
                                 
                            });

                            setInterviewId(fetchedInterviewId);
                            setIsWebsocketActive(true);
                            window.VADStartLastSpokeAt = Date.now();
                            window.VADStopLastSpokeAt = Date.now() +500;
                            setTimeout(()=>{
                                console.log("sending transcript")
                                window.streamResponseSocket.send(JSON.stringify({
                                    transcript_boolean: true,
                                    created_at: Date.now(),
                                    message_type: "transcript",
                                    transcript_data: {
                                      role: 'user',
                                      transcript_content:"Can we now try the next question?"
                                    }
                                  }));
                            }, 1000)

                            setTimeout(()=>{
                                setLiveTestText("Running server...");

                            }, 2500)
                            
                        } else {
                            console.log("already selected")
                            setIsWebsocketActive(false);
                            window.streamResponseSocket.close();
                            setLiveTestText("Closing down...")
                            isTestRunning.current = false;
                            setLiveTestText("Restart live test")
                        }
                    }}
                />

            </div>

        </div >
        </>
    )
}

export default Test