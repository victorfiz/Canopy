import React, { useState } from 'react';
import { createInterview } from '../functions/createInterview';
import { useAuth } from '../../../auth';
import { useNavigate } from 'react-router-dom';
import FocusView from '../../../components/focusView/FocusView';
import { BsPlayCircle } from 'react-icons/bs'



const InterviewRow = ({

    index,
    round,
    userState,
    template,
    setShowModal,
    setIsResumeOpen, 



}) => {
    const templateName = template.split(",")[0];
    const templateId = template.split(",")[1];
    const thirdParam = template.split(",")[2];
    const isLocked = thirdParam === "locked"
    const isUpcoming = thirdParam === "upcoming"

    const { authUser } = useAuth();




    const [isLoadingInterviewState, setIsLoadingInterviewState] = useState(false);
    const navigate = useNavigate();


    return (
        <div >

            <div
                className={' pointer flex items-center font-semibold pl-2 items-center'}
                onClick={
                    async () => {
                        console.log("starting int 1")
                        setIsLoadingInterviewState(true);
                        if (!userState.resume_text_content) {
                            setIsResumeOpen(true)
                            setIsLoadingInterviewState(false);
                            return;
                        }

                      
                        // if(!userState.isSubscribed){
                        //     setShowModal(true);
                        //     setIsLoadingInterviewState(false);
                        //     return;
                        // }
                        
                            const { interview_id } = (await createInterview({
                                interview_template_id: templateId,
                                uid: authUser.uid
                            })).data;

                            navigate(`/interview/${interview_id}`);

                        


                    }}
            >
                <div className='mr-4 mt-1 text-[1em] ml-4 w-[30px]'>
                    {(isLoadingInterviewState && templateId !== "locked") ?
                        <div className='spinner spinner-dark mt-[-4px]'></div>
                        : (
                            userState?.completed_templates?.includes(templateId) ?
                                <BsPlayCircle className='text-[#703CF0] text-[1.5em]' />
                                :
                                <BsPlayCircle className='text-[#ccc] text-[1.5em]' />

                        )
                    }
                </div>
                <div className={
                    index === round.templateData?.split("\n")?.length - 1 ?
                        ' p-4 pl-0 flex-grow-1 w-full' : 'p-4 pl-0 border-bottom w-full '
                }>
                    {userState?.location?.country_code==="GB"?templateName.replaceAll("Superday", "Assessment Centre"):templateName}
                </div>
                {/* {(isLocked && !userState.isSubscribed) ? <span className='mr-6'> 🔒</span> : ""} */}
                {isUpcoming ? <span className='mr-2 bg-[#703CF0] text-[0.8em] text-white p-0.5 rounded-sm'> Upcoming</span> : ""}
                {/* {(!isLocked && !userState.isSubscribed && !isUpcoming) ?
                    <div className='header-available-interviews mr-6 flex mt-1 items-center ml-2 text-[15px]'>
                        <div className='bg-[#0fb] text-white rounded-md w-[120px] flex text-center justify-center items-center font-light'> Free Interview</div>

                    </div> : ""} */}


            </div>


        </div>
    );
};

export default InterviewRow;
