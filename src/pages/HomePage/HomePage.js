import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth';
import { TypeAnimation } from 'react-type-animation';
import { addEmailToWaitlist } from '../../firestore';
import { getAnalytics, logEvent } from "firebase/analytics";

import HomepageHeader from './components/Header';
import Hero from './components/Hero';
import FocusView from '../../components/focusView/FocusView';
import DemoImage from './components/DemoImage';
import Pricing from './components/Pricing';
import Carousel from './components/Carousel';
import Features from './components/Features';

const HomePage = () => {
    const [isSayHelloOpen, setIsSayHelloOpen] = useState(false);
    const [openVideoModal, setOpenVideoModal] = useState(false);
    window.setInterviewId("nRNV0C90WQixsrHiUOD4")




    return (
        <div className="text-white flex flex-col bg-[#f5f5f6] bg-no-repeat relative min-h-screen max-w-screen overflow-x-hidden inter">

            <div className={isSayHelloOpen ? 'say-hello' : 'say-hello hidden'}>
                Say "Hello Canopy" to kick off your conversation!
            </div>


            <FocusView
                isChildVisible={openVideoModal}
                setIsChildVisible={setOpenVideoModal}

            >
                <div className="hp-yt-demo">
                    <video 
                        controls 
                        width="400" 
                        height="300"
                        autoPlay
                        loop
                        >
                        <source src="https://firebasestorage.googleapis.com/v0/b/humanview-d6bc8.appspot.com/o/CanopyAI.mov?alt=media&token=0c12b68a-96ff-4f50-9a57-92f7dcd5d8b4&_gl=1*16ns5oc*_ga*MzYwMjY1OTUzLjE2OTg2MDM5Mzk.*_ga_CW55HF8NVT*MTY5ODcwOTQ4Ny40LjEuMTY5ODcwOTYzMi42MC4wLjA" type="video/mp4" />
                    </video>
                </div>
            </FocusView>


            <HomepageHeader
                setOpenVideoModal={setOpenVideoModal}
            />

            <Hero
                setIsSayHelloOpen={setIsSayHelloOpen}
            />
            <DemoImage
                setOpenVideoModal={setOpenVideoModal}
            />
            <Carousel />


            {/* <Features /> */}
            {/* <div className='mt-40'> </div>
            <Pricing /> */}
            <div className="footer">
                <a className="mr-4" target='_blank' href="https://firebasestorage.googleapis.com/v0/b/humanview-d6bc8.appspot.com/o/assets%2FCanopy%20Privacy%20Policy.pdf?alt=media&token=94f5b3e4-6b27-4c11-9f2a-7ff0fb7ff2d8">Privacy Policy</a>
                © 2023 Canopy Labs
            </div>
        </div>
    );
};

export default HomePage;