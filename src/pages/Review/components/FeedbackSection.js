import React from 'react';
import VerticalBox from '../../../components/verticalBox/VerticalBox';
import TextButton from '../../../components/textButton/TextButton';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../auth';
import InfoHover from '../../../components/infoHover/InfoHover';


function FeedbackSection({
    sectionData,
    userState = { isSubscribed: false },
    index = 1,
    setContentToScrollTo = () => { },
    setShowModal = () => { }
}) {

    const { authUser, isLoading } = useAuth();



    return (<div className='relative'>

        {
            (
                sectionData?.section_heading_feedback &&
                sectionData?.bulletpoint_feedback
            )
            &&

            <VerticalBox
                className='p-4 mb-10 pb-0'
                isBorder={false}
                onPress={() => {

                    setContentToScrollTo(sectionData.main_transcript_characteristic)

                }}
            >

                <div className='text-[#703CF0] font-semibold mb-2'>
                    {index}. {sectionData.section_heading_feedback}
                </div>
                <div className='mt-4 mb-4' dangerouslySetInnerHTML={{
                    __html: `<ul class="list-disc list-inside">${sectionData?.bulletpoint_feedback?.split("\n-")
                        .map(item => `<li class="mb-4">${item.trim().startsWith("-") ? item.trim().slice(1).trim() : item.trim()}</li>`)
                        .join('')
                        }</ul>`
                }} />


                {userState.isSubscribed ?
                    <InfoHover
                        infoHoverContent={<div className='flex'><div className='mr-3'> 💡 </div> <div> This is a model answer created for you to learn how you can improve for next time.</div></div>}
                        width='240px'
                        height="fit-content"
                        marginTop='10px'
                        marginLeft="10px"
                    >
                        <div className='font-medium pb-5 leading-loose bg-[#f5f5f6] p-2 mb-3 flex'>
                            <div className='mr-2'>💡</div>
                            <div>
                                {sectionData.model_answer_feedback}
                            </div>
                        </div>
                    </InfoHover>
                    :
                    <div className='h-[135px] w-full mt-2'>
                        <div className='h-[135px] w-full absolute items-center justify-center flex'>
                            <div className=''>  <TextButton
                                className='w-[300px] mb-8'
                                type={"primary"}
                                text='View an example answer'
                                icon={"🔒"}
                                onPress={() => {
                                    setShowModal(true)

                                }}
                            /> </div>
                        </div>

                        <div className='flex justify-between'>
                            <div className='strip bg-gray h-[30px] w-[60%]'> </div>
                            <div className='strip bg-gray h-[30px] w-[35%]'> </div>
                        </div>
                        <div className='flex justify-between mt-2'>
                            <div className='strip bg-gray h-[30px] w-[20%]'> </div>
                            <div className='strip bg-gray h-[30px] w-[75%]'> </div>
                        </div>
                        <div className='flex justify-between mt-2'>
                            <div className='strip bg-gray h-[30px] w-[30%]'> </div>
                            <div className='strip bg-gray h-[30px] w-[30%]'> </div>
                            <div className='strip bg-gray h-[30px] w-[35%]'> </div>
                        </div>

                    </div>

                }






            </VerticalBox>

        }
    </div>
    );
}

export default FeedbackSection;
