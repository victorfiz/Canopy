import React, { useState, useEffect, useRef } from 'react';
import UserTranscript from './components/UserTranscript';
import Playback from './components/Playback';
import AssistantTranscript from './components/AssistantTranscript';

import { useParams, useLocation } from 'react-router-dom';
import { useAuth } from '../../auth';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import BackHeader from '../../components/backHeader/BackHeader';
import FeedbackSection from './components/FeedbackSection';
import TranscriptMetadata from './components/TranscriptMetadata';
import { initialiseReviewListener } from './functions/initialiseReviewListener';
import { assessTransitionDirection } from './functions/assessTransitionDirection';
import { initialiseInterviewListener } from './functions/initialiseInterviewListener';
import FocusView from '../../components/focusView/FocusView';
import Upgrade from "../Account/components/Upgrade";
import Scoring from './components/Scoring';
import {uploadReview} from './functions/uploadReview';
import { auth } from '../../firebase';
import { createUserDocListener } from "../Account/functions/createUserDocListener";





const Review = () => {
    const { authUser, isLoading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const refs = useRef([]);
    const [contentToScrollTo, setContentToScrollTo] = useState("");
    const interviewId = useParams().reviewId;
    const [transcriptMetadata, setTranscriptMetadata] = useState({
        totalDialogues: 0,
        interviewDuration: "",
        improvementCount: 0
    })

    const [reviewState, setReviewState] = useState(null)
    const [interviewState, setInterviewState] = useState({})
    const [showModal, setShowModal] = useState(false);
    const [showScoringModal, setShowScoringModal] = useState(false);
    const [userState, setUserState] = useState({ isSubscribed: false });

    useEffect(() => {
        if (authUser) {

            const unsubscribeUser = createUserDocListener({
                authUser,
                setUserState, 
                setIsResumeUploading: () => { },
            })
        }
    }, [authUser])
            

    useEffect(() => {
        // Function to handle the resize event
        const handleResize = () => setWindowWidth(window.innerWidth);
    
        // Add event listener for window resize
        window.addEventListener('resize', handleResize);
    
        // Cleanup function to remove event listener
        return () => window.removeEventListener('resize', handleResize);
      }, []); 




    const [transcript, setTranscript] = useState([{}, {}]);

    //define previous location
    const prevLocation = useRef(location);

    useEffect(() => {
        prevLocation.current = location;
    }, [location]);


    const direction = assessTransitionDirection({
        location,
        prevLocation,

    });

    const pageVariants = {
        initial: { x: direction === 1 ? '100%' : '-100%', opacity: 0 },
        in: { x: 0, opacity: 1 },
        out: { x: direction === 1 ? '-100%' : '100%', opacity: 0 },
    };

    const pageTransition = {
        type: 'tween',
        ease: [0.43, 0.13, 0.23, 0.96],
        duration: 0.5,
    };

    useEffect(() => {
        if (!isLoading && !authUser) {
            navigate("/");
        }
    }, [authUser, isLoading]);


    useEffect(() => {
        const unsubscribeReview = initialiseReviewListener({
            interviewId,
            setReviewState
        })

        const unsubscribeInterview = initialiseInterviewListener({
            interviewId,
            setInterviewState, 

        })
        // Clean up the listener when the component unmounts

    }, [interviewId]);

    useEffect(()=>{

        uploadReview({
            interviewState, 
            reviewState, 
            interviewId, 
            authUser
        })

        
    }, [reviewState, interviewState, authUser])


    useEffect(() => {


        if (reviewState && contentToScrollTo) {

            const allMessages = reviewState.reduce((acc, item) => [...acc, ...item.messages], [])
                .filter(item => (item.role === 'user' || item.role === 'assistant'))
                .map(item => ({ ...item, content: item.content.replace(/\[SECTION:\d+\]/g, '') }))

            console.log(allMessages)

            let indexToScrollTo = 0;

            allMessages.forEach((item, index) => {
                if (item.content.includes(contentToScrollTo)) {
                    indexToScrollTo = index;
                }
            })



            if (refs.current[indexToScrollTo]) {
                refs.current[indexToScrollTo].scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                });
            } else {
                console.log("no ref to scroll to")
            }

        }
    }, [contentToScrollTo, reviewState]);



    return (
        <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
        >

            <FocusView isChildVisible={showModal} setIsChildVisible={setShowModal}>
                <Upgrade
                    showModal={showModal}
                    setShowModal={setShowModal}
                />
            </FocusView>

            <FocusView isChildVisible={showScoringModal} setIsChildVisible={setShowScoringModal}>
                <Scoring
                    showModal={showScoringModal}
                    setShowModal={setShowScoringModal}
                />
            </FocusView>

            <div className='review-holder-main bg-[#f5f5f6]'>

                <BackHeader
                    navigateUrl='/myreviews'
                    isBorder={false}
                />


                <div className='flex justify-evenly flex-grow-1 flex-col sm:flex-row'>

                    

                    <div
                        className='feedback-sections sm:overflow-y-scroll  w-full sm:w-1/2 hide-scrollbar'
                        style={{ height: windowWidth>640?"":'calc(100vh - 50px)' }}
                    >
                              <TranscriptMetadata
                            transcriptMetadata={transcriptMetadata}
                            reviewState={reviewState}
                            interviewState={interviewState}
                            setShowScoringModal={setShowScoringModal}
                            authUser={authUser}
                        />

                        {interviewState?.downloadUrl
                        &&
                        <Playback
                            reviewState={reviewState}
                            interviewState={interviewState}
                            authUser={authUser}
                            
                        />
                        }
                        {reviewState &&
                            reviewState.map((item, index) => {
                                return !item.ignore ?
                                    <FeedbackSection
                                        key={index}
                                        sectionData={item}
                                        index={index}
                                        setContentToScrollTo={setContentToScrollTo}
                                        setShowModal={setShowModal}
                                        userState={userState}
                                    /> : ""
                            })
                        }
                    </div>



                    {/* <div className='transcipt-container flex flex-grow-1 flex-col'>

                  
                        <div className='transcript-title font-semibold mt-8 mb-4 hide-scrollbar flex-grow-1'>
                            💬 <span className='ml-2'>What you said</span>
                        </div>
                        <div className='sm:overflow-y-scroll  flex-grow-1 hide-scrollbar'>
                            {reviewState &&
                                reviewState.reduce((acc, item) => [...acc, ...item.messages], [])
                                    .filter(item => (item.role === 'user' || item.role === 'assistant'))
                                    .map(item => ({ ...item, content: item.content.replace(/\[SECTION:\d+\]/g, '') }))
                                    .map((item, index) => {
                                        if (item.role === 'user') {

                                            return <div ref={el => refs.current[index] = el}>
                                                <UserTranscript content={item.content} key={index} />
                                            </div>
                                        } else if (item.role === 'assistant') {
                                            return <AssistantTranscript content={item.content} key={index} />
                                        } else {
                                            return <div className='shimmer-block shimmer bg-gray'></div>
                                        }
                                    })
                            }
                        </div>
                    </div> */}
                </div>
            </div>
        </motion.div>

    );
}

export default Review;


