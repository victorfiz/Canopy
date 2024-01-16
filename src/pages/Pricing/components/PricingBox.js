import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineCheckCircle } from "react-icons/ai";
import {RxCross1} from 'react-icons/rx'
import Button from '../../../components/button/Button.js';
import VerticalBox from '../../../components/verticalBox/VerticalBox.js';
import { useAuth } from '../../../auth';


const PricingBox = ({
    txts = [],
    planType = 'starter',
    planTitle = 'Basic Plan',
    buttonText = 'Current Plan',
    buttonType = 'secondary',
    buttonOnPress = () => { },
    className = 'mr-4',
    loadingText = 'Loading...',

}) => {

    return (
        <VerticalBox
            className={`p-4 mb-4 ${className}`}
            width='300px'
        >
            <div
                className={`upcoming text-[0.6em] ${planType === "Start here!" ? "bg-[#3a3]" : ""}  ${planType === "I'm applying" ? "bg-[#FFD700]" : ""} p-1 text-center rounded-sm text-white w-[80px] absolute ml-[180px] mt-[-0.6em]`}>
                {planType}
            </div>

            <div className='pricing-container-hdr'
            >
                {planTitle}
            </div>

            <div className='pricing-container-desc'>
                <div className='pricing-container-desc-item'>

                    {txts.map((txt, i) => {
                        return <div className='flex mt-1' key={i}>
                            {txt.positive && <>
                                <div className='mr-2 pricing-tick mt-1'>
                                    <AiOutlineCheckCircle
                                        size={"1.3em"}
                                        color={"#703cf0"}
                                    />

                                </div>
                                <div className='pricing-txt '> {txt.text} </div>
                            </>}
                            {!txt.positive && <>
                                <div className='mr-2 pricing-tick mt-1.5'>
                                    <RxCross1
                                        size={"1.0em"}
                                        color={"#120F54"}
                                    />
                                </div>
                                <div className='pricing-txt'> {txt.text} </div>
                            </>}


                        </div>
                    })}



                </div>

            </div>
            <Button
                size="medium"
                type={buttonType}
                text={buttonText}
                isAsync={true}
                fullWidth={true}
                onPress={buttonOnPress}
                loadingText={loadingText}

            />
        </VerticalBox>
    );
}

export default PricingBox;