import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../../../components/button/Button';
import { BsChevronLeft } from "react-icons/bs";
import { increaseInterviewsStartedCounter } from '../functions/increaseInterviewsStartedCounter'
import { useAuth } from '../../../auth';
import VerticalBox from '../../../components/verticalBox/VerticalBox';
import FocusView from '../../../components/focusView/FocusView';
import Footer from '../../../components/footer/Footer';
import Webcam from 'react-webcam';
import { requestCameraPermission } from '../../Instructions/functions/requestCameraPermission';
import { requestMicrophonePermission } from '../../Instructions/functions/requestMicrophonePermission';
import Banner from '../../../components/banner/Banner';



function Start({ setDisplayedWidget }) {

    const navigate = useNavigate();
    const { interviewId } = useParams();
    const { authUser } = useAuth();
    const [isUserOnPhone, setIsUserOnPhone] = useState(window.innerWidth < 640);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [errorText, setErrorText] = useState("no problem"); // New state
    const [permissions, setPermissions] = useState({
        camera: false,
        microphone: false,

    });

    function redirectToSupportPage() {
        const userAgent = navigator.userAgent;
      
        if (userAgent.includes('Chrome')) {
          // Open Chrome support page in a new tab
          window.open('https://support.google.com/chrome/answer/2693767?hl=en-GB&co=GENIE.Platform%3DDesktop', '_blank');
        } else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
          // Safari also includes 'Chrome' in its user agent string, so we need to check for it explicitly
          // Open Safari equivalent support page in a new tab (you need to provide the correct URL here)
          window.open('https://support.apple.com/en-gb/guide/safari/ibrwe2159f50/mac', '_blank');
        } else {
          // For other browsers, perform a Google search in a new tab
          const query = 'how to enable camera access in web browser';
          window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
        }
      }
      
;
      

      

    useEffect(() => {

        requestCameraPermission({ setPermissions, setErrorText });
        requestMicrophonePermission({ setPermissions, setErrorText });

    }, []);


    useEffect(() => {
        // Update the window width whenever it changes
        const handleResize = () => {
            setWindowWidth(window.innerWidth);

            if (window.innerWidth > 640) {
                setIsUserOnPhone(false)
            }
        };

        window.addEventListener('resize', handleResize);
        return () => {
            // Cleanup the event listener on component unmount
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="bg-[#f5f5f6]">

            <FocusView
                isChildVisible={isUserOnPhone}
                setIsChildVisible={setIsUserOnPhone}
            >


                <VerticalBox
                    width='90vw'
                    height='80vh'
                    title={"You are on a mobile 😞"}
                    className='flex flex-col'
                >
                    <div className='p-3 flex-grow-1 flex flex-col h-[100%]'>
                        <p>
                            Hey there! Would you do a realtime face-to-face interview on a mobile phone? Probably not!
                        </p>
                        <br />
                        <p>
                            Well the Canopy experience is best on a laptop or desktop computer. We strongly recommend you use a computer for the best experience.
                        </p>
                    </div>


                    <div className='w-full p-3'>
                        <Button
                            size="small"
                            type="secondary"
                            text="Let's continue anyway"
                            fullWidth={true}
                            className='mt-2 mb-2'
                            onPress={
                                () => {
                                    setIsUserOnPhone(false)
                                }}
                        />
                        <Button
                            size="small"
                            type="primary"
                            text="Go back to dashboard"
                            fullWidth={true}
                            onPress={
                                () => {
                                    navigate("/account")
                                }}
                        />
                    </div>


                </VerticalBox>

            </FocusView>


            <div className='start-header'
                onClick={() => navigate("/account")}
            >
                <BsChevronLeft size={16} strokeWidth={0.25} className='mr-2' />
                <div className='back-txt'> Back </div>
            </div>
            <div className='start-container'>
                <div className="flex flex-col items-center space-y-4">
                    <div className='flex w-[80vw] justify-center mb-10 flex-wrap'>
                        <div className='ml-8 mr-8 max-h-[230px] w-[400px] overflow-hidden rounded-md mt-3 mb-3'>
                            <Webcam
                                className=" sm:h-auto w-full"
                                mirrored={true}
                                style={{

                                    textAlign: "center",


                                    height: "220px",
                                    width: "400px",
                                    objectFit: "cover",
                                }}
                            />
                        </div>

                        <div className='ml-8 mr-8 h-[220px] w-[400px] overflow-hidden rounded-md mt-3 mb-3'>
                            <video

                                src={"https://firebasestorage.googleapis.com/v0/b/humanview-d6bc8.appspot.com/o/Interlude.mp4?alt=media&token=59999d0f-1c71-4a39-abfd-14a4ec165a56&_gl=1*16402iv*_ga*MzYwMjY1OTUzLjE2OTg2MDM5Mzk.*_ga_CW55HF8NVT*MTY5ODYwMzkzOS4xLjEuMTY5ODYwNDAzOS4zMS4wLjA"}
                                loop
                                muted
                                autoPlay

                            />
                        </div>

                    </div>
                    <div className='flex'>
                        <div className="flex items-center mr-5">
                            <input
                                className="w-4 bg-blue-500 border-none outline-none cursor-pointer mr-1"
                                type="checkbox"
                                id="cameraPermission"
                                checked={permissions.camera}
                                onChange={requestCameraPermission}
                                aria-label="Camera permission"
                                readOnly
                            />
                            <label htmlFor="cameraPermission" onClick={requestCameraPermission}>
                                <span className={permissions.camera ? 'crossed-out' : ''}>Camera permission</span>
                            </label>
                        </div>

                        <div className="flex items-center">
                            <input
                                className="w-4 bg-blue-500 border-none outline-none cursor-pointer mr-1"
                                type="checkbox"
                                id="microphonePermission"
                                checked={permissions.microphone}
                                onChange={requestMicrophonePermission}
                                aria-label="Microphone permission"
                                readOnly
                            />
                            <label htmlFor="microphonePermission" onClick={requestMicrophonePermission}>
                                <span className={permissions.microphone ? 'crossed-out' : ''}>Microphone permission</span>
                            </label>
                        </div>
                    </div>
                    <Button
                        size="primary"
                        type="primary"
                        text="Start Practice Session"
                        loadingText="Starting Interview"
                        isAsync={true}
                        onPress={
                            () => {
                                if (authUser) {
                                    if(permissions.camera && permissions.microphone){
                                        increaseInterviewsStartedCounter({ uid: authUser.uid })
                                        setDisplayedWidget('WebcamChat')
                                    }
                     
                                }
                            }}
                    />
                    <a href={`/instructions/${interviewId}`} className='instructions-redirect'>
                        See tips, tricks, and instructions to ace your interview
                    </a>
                    <Banner

                        bannerTitle={"We need permission"}
                        bannerSubtitle={
                            `You need to grant us permission to use your ${!permissions.camera ? "camera" : ""}
                            ${(!permissions.camera && !permissions.microphone)?"and":""}
                         ${!permissions.microphone ? "microphone" : ""} to start the interview`
                        }
                        className={(permissions.camera && permissions.microphone) ? "hidden" : "mt-10"}
                        type={"critical"}
                
                        isActionButton={true}
                        actionButtonText="Grant permission"
                        onActionButtonPress={redirectToSupportPage}
                    />

                </div>
            </div>


        </div>
    );
}

export default Start