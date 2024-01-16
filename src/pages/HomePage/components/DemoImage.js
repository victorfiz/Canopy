import React, { useState } from 'react'
import VerticalBox from '../../../components/verticalBox/VerticalBox'
import { useNavigate } from 'react-router-dom';

function DemoImage({
    setOpenVideoModal 
}) {
    return (
        <div
            className='hp-demo-hldr mt-10'
            onClick={() => {
                setOpenVideoModal(true)
            }}
        >
            <div className='text-black sm:text-center mt-10 mb-4 font-bold sm:text-[1.5em] ml-5'> 
            Got 64 seconds? See what we do:
            </div>


            <div className='hp-demo-center pointer w-[1000px] max-w-[90vw] sm:h-[565px] mx-auto bg-contain bg-no-repeat rounded-[20px] flex items-center justify-center border-2 border-[black]'>
                {/* <div className='hover-hero left-hover-hero phone-hide' > 
                <div className='hover-hero-title mt-5 ml-3 flex justify-between'>
                    <div> Video Interviews</div>
                
                <div className='hover-hero-img-1'>
                    <div className='hover-hero-block hover-hero-block-1-1'></div>
                    <div className='hover-hero-block hover-hero-block-1-2 ml-0.5'></div>
                    <div className='hover-hero-block hover-hero-block-1-3 ml-0.5'></div>
                    <div className='hover-hero-block hover-hero-block-1-4 ml-0.5'></div>
                    <div className='hover-hero-block hover-hero-block-1-5 ml-0.5'></div>
                    <div className='hover-hero-block hover-hero-block-1-6 ml-0.5'></div>
                    <div className='hover-hero-block hover-hero-block-1-7 ml-0.5'></div>
                    <div className='hover-hero-block hover-hero-block-1-8 ml-0.5'></div>
                    <div className='hover-hero-block hover-hero-block-1-9 ml-0.5'></div>



                </div>
                </div>
                <div className='hover-hero-sttl mt-5 ml-3'>
                    Get on video calls with Canopy's AI interviewers to prep for your next interview. 
                    There's no practice like the real thing!
                </div>
            
            </div> */}
                {/* <div className='hover-hero right-hover-hero phone-hide'> 
                <div className='hover-hero-title mt-5 ml-3'>
                Instant Guidance
                </div>
                <div className='hover-hero-sttl mt-5 ml-3'>
                    After each interview, see how you did and get personalized feedback on how to improve from your AI coach.
                </div>
            
            </div> */}
                <div className='open-yt-video'

                    onClick={() => {
                        setOpenVideoModal(true)
                    }}
                > </div>


            </div>




        </div>
    );
}

export default DemoImage