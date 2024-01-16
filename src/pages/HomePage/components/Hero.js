import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../auth';
import Button from '../../../components/button/Button';
import PulsingCircles from '../../../components/pulsingCircles/PulsingCircles';
import { TypeAnimation } from 'react-type-animation';
import { getAnalytics, logEvent } from "firebase/analytics";
import VADWidget from '../../Hooks/VADWidget';
import useCreateWebSocket from '../../Hooks/initialiseInterviewerSocket';
import { Auth } from 'firebase/auth';



function Hero({ setIsSayHelloOpen }) {
    const navigate = useNavigate();

    const { authUser } = useAuth();

    const [isStartButtonClicked, setIsStartButtonClicked] = useState(false);
    const analytics = getAnalytics();

    useCreateWebSocket({ active: isStartButtonClicked })

    return (

        <div className="hero">
            {isStartButtonClicked && <VADWidget />}


            <div className='phone-hide font-bold text-[2em] sm:text-[3.5em] w-[800px] text-left sm:text-center  mt-[70px] flex flex-wrap sm:justify-center leading-[1.5em] max-w-[90vw] inter'>
                    Do Mock <span className='mr-[0.3em] ml-[0.3em] text-[#703CF0]'>  Interviews </span> With AI
                </div>


            <div className='sm:text-[1.5em] text-[#475569] mt-2 font-medium mb-1 ml-5 text-[1.2em] mt-5'>
                Practice for HireVues, Superdays & Assessment Centers
            </div>

          
            <div className='buttons flex mt-10 flex-col justify-left sm:justify-center sm:items-center w-[100vw] ml-10 mt-10'> 
            <Button
                text={"Get Started"}
                type={"black"}
                size={"large"}
                className='pr-12 pl-12 mt-10'
                onPress={()=>{
                    if(authUser){
                        navigate('/account')
                    } else{
                        navigate('/signup')
                    }
                }}
            />
            <div className='mt-4 sm:text-center'> * No credit card required</div>
             
            </div>
       
        </div>
    );
}

export default Hero