import React, { useState, useRef } from 'react';
import VerticalBox from '../../../components/verticalBox/VerticalBox';
import TextButton from '../../../components/textButton/TextButton';
import { createInterview } from '../functions/createInterview';
import { useAuth } from '../../../auth';
import { useNavigate } from 'react-router-dom';


const FreeStuff = ({
    userState, 
    setIsResumeOpen, 
    setSeeFree
}) => {

    const { authUser } = useAuth();
    const navigate = useNavigate();

    const [isTemplate1Loading, setIsTemplate1Loading] = useState(false);
    const [isTemplate2Loading, setIsTemplate2Loading] = useState(false);
    const [isTemplate3Loading, setIsTemplate3Loading] = useState(false);


    return (

        <VerticalBox
            // height='80vh'
            width='min(90vw,600px)'
            title="Click below to start an interview"
        >


            <div className='p-3 pb-1'>

            <div
                    className='bg-gray-100 p-3 rounded-lg mb-3 text-[0.9em] mt-4 pointer hover-scale-anim'
                    onClick={
                        async () => {

                            setIsTemplate2Loading(true);

                            const { data } = await createInterview({
                                uid: authUser.uid,
                                interview_template_id: "w7bk7xNLQ2p2iu09NLHO"
                            })

                            console.log(data);

                            const { interview_id } = data;

                            navigate(`/interview/${interview_id}`)

                        }}
                >
                    <div className='font-semibold text-[#703CF0] flex'>
                        {isTemplate2Loading && <div className='spinner spinner-dark mt-0.5 mr-2'></div>}

                        Goldman Sachs: Superday - Case #1 </div>
                    <div className=''>
                    <b>Click</b> to start a  mock interview on your resume and industry knowledge.
                    </div>
                </div>

                <div
                    className='bg-gray-100 p-3 rounded-lg mb-3 text-[0.9em] pointer hover-scale-anim mt-8'
                    onClick={
                        async () => {

                            if (!userState.resume_text_content) {
                                setIsResumeOpen(true)
                                setSeeFree(false)
                                return
                            }

                            // if(!userState.isSubscribed){
                            //     setSeeFree(true)
                            //     return
                            // }

                            setIsTemplate1Loading(true);

                            const { data } = await createInterview({
                                uid: authUser.uid,
                                interview_template_id: "bJpcFXrlY9IUenmEYkP3"
                            })

                            console.log(data);

                            const { interview_id } = data;

                            navigate(`/interview/${interview_id}`)

                        }}
                >
                    <div className='font-semibold text-[#703CF0] flex'>
                        {isTemplate1Loading && <div className='spinner spinner-dark mt-0.5 mr-2'></div>}
                        Goldman Sachs: Phone Interview </div>
                    <div className=''>
                        <b>Click</b> to start a mock interview where you can show off your equity research skills.
                    </div>
                </div>


         
                <div
                    className='bg-gray-100 p-3 rounded-lg mb-3 text-[0.9em] mt-4 pointer hover-scale-anim mt-8'
                    onClick={
                        async () => {

                            setIsTemplate3Loading(true);

                            const { data } = await createInterview({
                                uid: authUser.uid,
                                interview_template_id: "jAnkTtRePkIzadB6CxF3"
                            })

                            console.log(data);

                            const { interview_id } = data;

                            navigate(`/interview/${interview_id}`)

                        }}
                >
                    <div className='font-semibold text-[#703CF0] flex'>
                        {isTemplate3Loading && <div className='spinner spinner-dark mt-0.5 mr-2'></div>}

                        Goldman Sachs: Superday - Technical #1 
                    </div>
                    <div className=''>
                    <b>Click</b> to start a mock interview on your technical and industry knowledge.
                    </div>
                </div>

        

             



            </div>

        </VerticalBox>

    )
}

export default FreeStuff;
