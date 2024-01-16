import React, { useState, useRef } from 'react';
import { uploadResumeToUserDocument } from '../functions/uploadResumeToUserDocument';
import VerticalBox from '../../../components/verticalBox/VerticalBox';
import Button from '../../../components/button/Button';


const Resume = ({
    authUser,
    setIsPPMenuOpen,
    setIsResumeOpen,
    isCreateInterviewInfo,



}) => {


    return (

        <VerticalBox
            height='180px'
            width='500px'
            title="If you have already subscribed"
        >

            <div className='resume-pp-body p-3 pt-1'>
                Depending on your bank and country, it may take a few hours to clear your payment.
                If you are unable to access premium features within 24 hours, please contact us, and we will help immediately.
            </div>
            <div className='p-3 pb-1'>



            </div>

        </VerticalBox>

    )
}

export default Resume;
