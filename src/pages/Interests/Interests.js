import React, { useEffect, useState } from 'react';
import Button from '../../components/button/Button';
import { useNavigate } from 'react-router-dom';
import Banner from '../../components/banner/Banner';
import { useAuth } from '../../auth';
import {interestsList} from './functions/getInterests';

function Interests() {

    const navigate = useNavigate();
    const [isBannerVisible, setIsBannerVisible] = useState(false);

    const [interests, setInterests] = useState(interestsList);
    

    const { authUser } = useAuth();

    // useEffect(() => {
    //     if(!authUser){
    //         navigate('/login');
    //     }
    // }, [authUser])



    return (
        <div className='bg-[#f5f5f6] h-[100vh] w-[100vw] flex items-center justify-center'>
            <div className='center-interests w-[600px]'>
                <div className='choose-interests text-center'> Select all your interests... </div>

                <div className='interests-list flex flex-wrap justify-center  mt-5'>
                    {interests.map((interest) => (
                        <div
                            className={interest.isSelected ? `selected-interest flex m-2 p-1 bg-white pointer rounded-full pl-2 pr-2 text-small` : `unselected-interests flex m-2 p-1 bg-white pointer rounded-full pl-2 pr-2`}
                            onClick={() => {
                                //limit the number of selected interests to 3

                                let numberOfSelectedInterests = 0;

                                interests.forEach((interest) => {
                                    if (interest.isSelected) {
                                        numberOfSelectedInterests++;
                                    }
                                })

                                console.log(numberOfSelectedInterests);

                                if (numberOfSelectedInterests < 6) {

                                    interest.isSelected = !interest.isSelected; setInterests([...interests])
                                } else {
                                    if (interest.isSelected) {
                                        interest.isSelected = !interest.isSelected; setInterests([...interests])
                                    }
                                }

                            }}
                        >
                            <div className='interest-item'> {interest.interestEmoji} </div>
                            <div className='interest-item ml-2'> {interest.interestName} </div>
                        </div>

                    ))}
                </div>

                <div className='flex justify-center mt-10'> 
                    <Button
                        type={'primary'}
                        text={`Let's move on!`}
                        onPress={() => {
                            let numberOfSelectedInterests = 0;

                            interests.forEach((interest) => {
                                if (interest.isSelected) {
                                    numberOfSelectedInterests++;
                                }
                            }
                            )

                            if (numberOfSelectedInterests === 0) {
                                setIsBannerVisible(true);
                            } else {
                                navigate('/account')

                            }

                        }}
                    />
                </div>

                {isBannerVisible&&<div className='flex justify-center mt-20 absolute w-[600px]'>
                    <Banner 
                        type={'caution'}
                        bannerTitle={'Choose at least one interest!'}
                        bannerSubtitle={'You can choose up to 3 interests, but you need to choose at least one! You can always change your interests later in your profile.'}
                    />
                </div>}


            </div>
        </div>
    );
}

export default Interests;
