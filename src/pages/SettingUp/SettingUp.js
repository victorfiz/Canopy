import React, { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase'
import { useNavigate } from 'react-router-dom';
import Banner from "../../components/banner/Banner"
import { BsEye, BsEyeSlash } from "react-icons/bs";


const ReviewLoading = ({ interviewId }) => {

    const [isInterviewUploading, setIsInterviewUploading] = useState(true);
    const [uploadProgress, setUploadProgress] = useState(1);

    const [currentLoadingSetting, setCurrentLoadingSetting] = useState(0);

    const messages = [
        "We are watching your video",
        "We are assessing your knowledge",
        "We are seeing how well you speak",
        "Counting ums and ahs",
        "We are analysing your style",
        "Evaluating your critical thinking skills",
        "Assessing your enthusiasm and passion for the role",
        "Looking at how you communicate",
    ];
    

    useEffect(() => {
        
        const interval = setInterval(() => {
            // if(currentLoadingSetting === 3) setCurrentLoadingSetting(0);
            setCurrentLoadingSetting(currentLoadingSetting => currentLoadingSetting+1);
            console.log(currentLoadingSetting)

        }, 10000/messages.length);

        return () => clearInterval(interval);
    }, []);


  

    let navigate = useNavigate();



    useEffect(() => {

        const interval = setInterval(() => {


            setUploadProgress((uploadProgress) => (uploadProgress + 0.2));

        }, 10);

        setTimeout(() => {

            navigate(`/account`);
        }, 5000);

        return () => clearInterval(interval);
    }, []);


    return (
        <div className='review-loading-container bg-[#f5f5f6]'>

            <div className='review-center'>
                <div className='text-4xl font-medium text-black mb-8'>
                    We're setting up Canopy for <span className='text-purple-700 italic'> you</span>
                </div>
                <div className='review-loading-holder'>
                    <div className='review-loading-holder-inner flex justify-center'>
                        <div className='review-uploading'>
                            <div className='review-uploader-holder rev-uh-left'>
                                <div className="review-uploader-bar" style={
                                    { width: `${uploadProgress}%` }
                                }>

                                </div>
                            </div>
                        </div>
                   
                    </div>


                </div>

            </div>
        </div>
    )
}

export default ReviewLoading;