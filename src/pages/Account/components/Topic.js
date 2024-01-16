import React, { useState, useRef } from 'react';
import { createPath, useNavigate } from 'react-router-dom';
import { generateInterviewTemplate } from '../functions/generateInterviewTemplate.js';
import { createInterview } from '../functions/createInterview';
import InfoHover from '../../../components/infoHover/InfoHover.js';
import { deleteGeneratedTemplate } from '../functions/deleteGeneratedTemplate.js';

const Topic = ({
    topic,
    setShowModal,
    userState,
    authUser,
    setShowIfSubscriberModal,
    setIsResumeOpen,
    isResumeUploading = false,


}) => {

    const navigate = useNavigate();
    const [isCreatingInterview, setIsCreatingInterview] = useState(false);
    const [creatingInterviewProgress, setCreatingInterviewProgress] = useState(0);
    const creatingInterviewProgressRef = useRef(0);


    return (<div className='relative'
        onClick={
            async () => {

                console.log("uploading document")
 
                if(isResumeUploading) {
                    console.log('isResumeUploading')
                    return
                }
                if (!userState.resume_text_content) {
                    setIsResumeOpen(true)

                    return
                }

                // if (topic.premium && !userState.isSubscribed) {
                //     setShowModal(true);
                //     return
                // }


                if (isCreatingInterview) {
                    console.log("isCreatingInterview")
                    return
                }
                


     




                // if (!userState.isSubscribed && topic.premium) return
                const interval = setInterval(() => {
                    setIsCreatingInterview(true)

                    if (creatingInterviewProgressRef.current < 260) {

                        creatingInterviewProgressRef.current += 1;

                        setCreatingInterviewProgress(prev => prev + 1)
                    }
                }, 10);







                const { interview_template_id } = await generateInterviewTemplate({
                    interview_template_id: topic.topicId
                });

      

                console.log(interview_template_id)

                const { interview_id } = (await createInterview({
                    interview_template_id,
                    uid: authUser.uid
                })).data;

                deleteGeneratedTemplate({
                    interview_template_id
                })

                navigate(`/interview/${interview_id}`)







            }}
    >
        {/* {(topic.locked || topic.premium) &&
            <InfoHover
                width={"200px"}
                marginLeft={"265px"}
                marginTop='20px'
                infoHoverContent="Upgrade to unlock this topic."
            >
                {topic.premium ?
                    (
                        (userState.isSubscribed || userState.isSubscription) ?
                            <div className='upcoming text-[0.6em] bg-[#FFD700] p-1 text-center rounded-sm text-white w-[60px] absolute ml-[212px] mt-[-0.6em]'> Unlocked </div>
                            :
                            <div
                                className='absolute ml-[250px] pointer'
                                onClick={() => {
                                    setShowModal(true)
                                }}
                            >🔒</div>
                    )



                    :
                    <div
                        className='upcoming text-[0.6em] bg-[#703CF0] p-1 text-center rounded-sm text-white w-[60px] absolute ml-[212px] mt-[-0.6em]'>
                        Upcoming </div>

                }
            </InfoHover>
        } */}
        <div className="mb-6">
            <div className='bg-white rounded-lg  overflow-hidden sm:mr-6 p-4 pointer hover:scale-105 transition ease-in duration-300'>
                <div className='h-[50px] w-[50px] bg-gray-100 mb-2 rounded-sm text-[1.5em] flex justify-center items-center'> {topic.image}</div>
                <div
                    className=' pr-4 flex flex-col justify-center w-[240px]'

                >
                    <div className='font-semibold text-sm'>
                        {topic.title}

                    </div>
                    <div className='font-light text-sm'>
                        {topic.tag}
                    </div>
                </div>

            </div>
            <div
                className={isCreatingInterview ? "bg-[#703CF0] h-[5px] mt-2 rounded-lg absolute" : "invisible h-[5px] mt-2 rounded-lg absolute"}
                style={{
                    width: `${creatingInterviewProgress}px`
                }}
            > </div>
        </div>
    </div>
    );
};

export default Topic;
