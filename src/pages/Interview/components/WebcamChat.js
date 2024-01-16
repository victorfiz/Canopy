import React, { useEffect } from 'react'
import { useState, useRef } from 'react'
import Stream from './Stream.js'
import WebcamRHS from './WebcamRHS.js'


function WebcamChat({ setDisplayedWidget, displayedWidget, overlayVideoRef }) {

    const [isInterviewOver, setIsInterviewOver] = useState(false);
    const [isIDEOpen, setIsIDEOpen] = useState(false);
    const [isChatExpanded, setIsChatExpanded] = useState(false);
    const [videoRecorder, setVideoRecorder] = useState(null);

    return (
        <div className={'flex h-full flex-col sm:flex-row bg-[#f5f5f6] w-[100vw] max-w-[100vw]'}>

        <div className='absolute sm:static flex flex-grow'> 
            <Stream
                setIsInterviewOver={setIsInterviewOver}
                isIDEOpen={isIDEOpen}
                setIsIDEOpen={setIsIDEOpen}
                isInterviewOver={isInterviewOver}
                setDisplayedWidget={setDisplayedWidget}
                displayedWidget={displayedWidget}
                isChatExpanded={isChatExpanded}
                overlayVideoRef={overlayVideoRef}
                videoRecorder={videoRecorder}
                setVideoRecorder={setVideoRecorder}
                
            />
            </div>


        <div className='sm:block z-10 block '> 
            <WebcamRHS
                isIDEOpen={isIDEOpen}
                overlayVideoRef={overlayVideoRef}
                isChatExpanded={isChatExpanded}
                setIsChatExpanded={setIsChatExpanded}
                videoRecorder={videoRecorder}
                setVideoRecorder={setVideoRecorder}
            />
            </div>

        </div>
    )
}
export default WebcamChat;