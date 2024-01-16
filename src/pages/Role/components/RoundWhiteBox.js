import { useAuth } from '../../../auth';
import React, { useRef, useState } from 'react';
import VerticalBox from '../../../components/verticalBox/VerticalBox';
import { useNavigate } from 'react-router-dom';

import InterviewRow from './InterviewRow';

const RoundWhiteBox = ({
    round,
    setShowModal,
    userState,
    setIsResumeOpen, 
    
}) => {

    const navigate = useNavigate();

    const { authUser } = useAuth();
    const isCreateInterviewInfo = useRef({ isCreateInterview: false, interviewTemplateID: null, uid: null });




    return (
        <>
            {
                <div
                    className='p-10 pt-0 w-full'

                >
                    <div className='font-semibold text-sm mb-3 ml-1'>
    
                        {userState?.location?.country_code==="GB"?round.title.replaceAll("Superday", "Assessment Centre"):round.title}

                    </div>
                    <VerticalBox
                        items={round.interviewTemplates}
                        navigateUrl="/instructions/1"
                        className=''
                        isBorder={false}
                    >
                        <div className=''>
                            {round.templateData?.split("\n")?.map((template, index) => {
                             

                                return <InterviewRow
                                    index={index}
                                    round={round}
                                    userState={userState}
                                    template={template}
                                    setIsResumeOpen={setIsResumeOpen}
                                    setShowModal={setShowModal}
             
                                    
                                />
                            })}
                        </div>
                    </VerticalBox>
                </div>
            }
        </>
    );
};

export default RoundWhiteBox;
