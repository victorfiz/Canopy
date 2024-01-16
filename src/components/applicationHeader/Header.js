import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth';
import HeaderPP from './HeaderPP.js';

import PhoneHeaderPP from './PhoneHeaderPP.js';

const Header = ({
    setIsResumeOpen,
    selected = "",
    isCreateInterviewInfo = {},
    userState = {}
}) => {

    let navigate = useNavigate();
    const [isPPMenuOpen, setIsPPMenuOpen] = useState(false);

    return (

        <div className="widget-header-account">
            <div className='header-top-row flex justify-between'>
                <div className='flex'>
                    <div className='widget-header-logo logo mr-3 mb-2'></div>



                </div>
                <div className='hidden justify-center  sm:flex justify-center'>
                    <div className={(selected === "account") ? "pointer bg-gray-200 widget-header-title  justify-center flex items-center w-[100px] rounded-lg" : "widget-header-title  justify-center flex items-center w-[100px] rounded-lg pointer"}
                        onClick={() => {
                            navigate("/account");
                        }}>
                        Dashboard
                    </div>
                    <div className={(selected === "reviews") ? "bg-gray-200 widget-header-title ml-8 justify-center flex items-center w-[100px] rounded-lg pointer" : "widget-header-title  justify-center flex items-center w-[100px] rounded-lg ml-4 pointer"}
                        onClick={() => {
                            navigate("/myreviews");
                        }}>
                        Reviews
                    </div>
                </div>
               
                <HeaderPP
                    setIsResumeOpen={setIsResumeOpen}
                    isPPMenuOpen={isPPMenuOpen}
                    setIsPPMenuOpen={setIsPPMenuOpen}
                    isCreateInterviewInfo={isCreateInterviewInfo}
                    userState ={userState}
                />

                <PhoneHeaderPP
                    setIsResumeOpen={setIsResumeOpen}
                    isPPMenuOpen={isPPMenuOpen}
                    setIsPPMenuOpen={setIsPPMenuOpen}
                    isCreateInterviewInfo={isCreateInterviewInfo}
                />
                  <video
                    controls
                    width="0"
                    height="0"
                    autoPlay
                    loop
                    preload="auto"
                    muted
                    className='absolute'
                >
                    
                    <source src="https://firebasestorage.googleapis.com/v0/b/humanview-d6bc8.appspot.com/o/Canopy_Demo.mov?alt=media&token=cabfed8d-4ab9-4e2a-ad99-3edab1130e4a&_gl=1*chncbo*_ga*MzYwMjY1OTUzLjE2OTg2MDM5Mzk.*_ga_CW55HF8NVT*MTY5OTEwMTUyNy4xMC4xLjE2OTkxMDE3NDguNjAuMC4w" type="video/mp4" />

                </video>
            </div>


        </div>
    );
};

export default Header;