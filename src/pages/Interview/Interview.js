import React, { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import WebcamChat from './components/WebcamChat.js'
import ReviewLoading from './components/ReviewLoading.js'
import Start from './components/Start.js'

import { useAuth } from '../../auth'

import { usePostHog } from 'posthog-js/react'

function Interview() {
    const { interviewId } = useParams();
    const [displayedWidget, setDisplayedWidget] = useState('Start');
    const overlayVideoRef = useRef(null);

    const { authUser } = useAuth();

    const posthog = usePostHog();

    useEffect(() => {
        if (authUser) {
            posthog.capture('user_interview_created', {
                uid: authUser.uid,
                interview_id: interviewId,
                timestamp: new Date().toISOString(),
            });
            console.log("user_interview_createddd")
        }
    }, [posthog, authUser, interviewId])


    return (
        <div className='h-[100vh]'>
            {displayedWidget === "Start" && <Start setDisplayedWidget={setDisplayedWidget} overlayVideoRef={overlayVideoRef} />}
            {displayedWidget === "WebcamChat" && <WebcamChat overlayVideoRef={overlayVideoRef} interviewId={interviewId} setDisplayedWidget={setDisplayedWidget} displayedWidget={displayedWidget} />}
            {displayedWidget === "ReviewLoading" && <ReviewLoading interviewId={interviewId} />}
        </div>
    )
}

export default Interview