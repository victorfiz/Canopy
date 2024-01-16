import React, { useEffect, useState } from 'react';
import Button from '../../components/button/Button';
import { useNavigate } from 'react-router-dom';
import Banner from '../../components/banner/Banner';

import { db } from '../../firebase';
import { doc, setDoc } from "firebase/firestore";
import { useAuth } from '../../auth';
import { getRoles } from './functions/getRoles';

const Roles = () => {

    const [isBannerVisible, setIsBannerVisible] = useState(false);
    const navigate = useNavigate();

    const { authUser } = useAuth();

    const [roles, setRoles] = useState([])
    const [activeRoles, setActiveRoles] = useState([])

    useEffect(() => {

        if (authUser) {

            getRoles({
                setRoles,
                setActiveRoles,

            })


        }

    }, [authUser]);


    return (
        <div className='bg-[#f5f5f6] pt-10 pb-10 w-[100vw] flex items-center justify-center overflow-scroll h-[100vh]'>
            <div className='center-interests w-[600px]'>
                <div className='choose-interests text-center'> Pick up to three jobs you are applying for... </div>
                <div className='interests-list flex flex-wrap justify-center mt-5 '>
                    <div className='flex flex-wrap justify-center'>
                        {activeRoles.map((role) => (
                            false ?
                                <div
                                    className='flex flex-col items-center m-2 p-1 rounded pointer'
                                    onClick={   () => {


                                        let numberOfSelectedRoles = 0;
    
                                        activeRoles.forEach((role) => {
                                            if (role.isSelected) {
                                                numberOfSelectedRoles++;
                                            }
                                        })
    
                                        console.log(numberOfSelectedRoles);
    
                                        if (numberOfSelectedRoles < 3) {
    
                                            role.isSelected = !role.isSelected; setActiveRoles([...roles])
                                        } else {
                                            if (role.isSelected) {
                                                role.isSelected = !role.isSelected; setActiveRoles([...roles])
                                            }
                                        }
                                    }
                                }
                                >
                                    <div className='com-soon bg-black opacity-60 h-[100px] w-[100px] absolute text-white justify-center p-2 text-center items-center flex'> Coming Soon</div>
                                    <img
                                        className={role.isSelected ? `h-[100px] w-[100px] rounded selected-interest ` : `h-[100px] w-[100px] rounded`}
                                        src={role.roleIcon}
                                    />
                                </div>
                                :
                                <div
                                    className='flex flex-col items-center m-2 p-1 rounded pointer'
                                    onClick={() => {
                                        let numberOfSelectedRoles = 0;

                                        roles.forEach((role) => {
                                            if (role.isSelected) {
                                                numberOfSelectedRoles++;
                                            }
                                        })

                                        console.log(numberOfSelectedRoles);

                                        if (numberOfSelectedRoles < 3) {
                                            role.isSelected = !role.isSelected;
                                            setRoles([...roles])
                                        } else {
                                            if (role.isSelected) {
                                                role.isSelected = !role.isSelected;
                                                setRoles([...roles])
                                            }
                                        }
                                    }}
                                >
                                    <img
                                        className={role.isSelected ? `h-[100px] w-[100px] rounded selected-interest ` : `h-[100px] w-[100px] rounded`}
                                        src={role.roleIcon}
                                    />
                                </div>
                        ))
                        }
                    </div>
                    {/* <div className='flex flex-wrap justify-center'> 
                    {roles.slice(0,7).map((role) => (
                        role.roleIsComingSoon ?
                            <div
                                className='flex flex-col items-center m-2 p-1 rounded pointer relative'
                                onClick={() => { }}
                            >
                
                                <div className='com-soon bg-white opacity-80 h-[100px] w-[100px] absolute text-white justify-center p-2 text-center items-center flex'>

                                </div>
                                <div className='com-soon  h-[100px] w-[100px] absolute mt-[-10px] ml-[10px]  justify-end p-1 text-center items-start flex'>
                                    <div className='upcoming text-[0.6em] bg-[#703CF0] p-1 rounded-sm text-white'> Upcoming </div>

                                </div>
                                <img
                                    className={role.isSelected ? `h-[100px] w-[100px] rounded selected-interest ` : `h-[100px] w-[100px] rounded`}
                                    src={role.roleIcon}
                                />
                            </div>
                            :
                            <div
                                className='flex flex-col items-center m-2 p-1 rounded pointer'
                                onClick={() => {
                                    let numberOfSelectedRoles = 0;

                                    roles.forEach((role) => {
                                        if (role.isSelected) {
                                            numberOfSelectedRoles++;
                                        }
                                    })

                                    console.log(numberOfSelectedRoles);

                                    if (numberOfSelectedRoles < 3) {
                                        role.isSelected = !role.isSelected;
                                        setRoles([...roles])
                                    } else {
                                        if (role.isSelected) {
                                            role.isSelected = !role.isSelected;
                                            setRoles([...roles])
                                        }
                                    }
                                }}
                            >
                                <img
                                    className={role.isSelected ? `h-[100px] w-[100px] rounded selected-interest ` : `h-[100px] w-[100px] rounded`}
                                    src={role.roleIcon}
                                />
                            </div>
                    ))
                    }
                    </div> */}
                    <div> 
                     {roles.slice(8, 10).map((role) => (
                        role.roleIsComingSoon ?
                            <div
                                className='flex flex-col items-center m-2 p-1 rounded pointer relative'
                                onClick={() => { }}
                            >
                
                                <div className='com-soon bg-white opacity-80 h-[100px] w-[100px] absolute text-white justify-center p-2 text-center items-center flex'>

                                </div>
                                <div className='com-soon  h-[100px] w-[100px] absolute mt-[-10px] ml-[10px]  justify-end p-1 text-center items-start flex'>
                                    <div className='upcoming text-[0.6em] bg-[#703CF0] p-1 rounded-sm text-white'> Upcoming </div>

                                </div>
                                <img
                                    className={role.isSelected ? `h-[100px] w-[100px] rounded selected-interest ` : `h-[100px] w-[100px] rounded`}
                                    src={role.roleIcon}
                                />
                            </div>
                            :
                            <div
                                className='flex flex-col items-center m-2 p-1 rounded pointer'
                                onClick={() => {
                                    let numberOfSelectedRoles = 0;

                                    roles.forEach((role) => {
                                        if (role.isSelected) {
                                            numberOfSelectedRoles++;
                                        }
                                    })

                                    console.log(numberOfSelectedRoles);

                                    if (numberOfSelectedRoles < 3) {
                                        role.isSelected = !role.isSelected;
                                        setRoles([...roles])
                                    } else {
                                        if (role.isSelected) {
                                            role.isSelected = !role.isSelected;
                                            setRoles([...roles])
                                        }
                                    }
                                }}
                            >
                                <img
                                    className={role.isSelected ? `h-[100px] w-[100px] rounded selected-interest ` : `h-[100px] w-[100px] rounded`}
                                    src={role.roleIcon}
                                />
                            </div>
                    ))
                    }

</div>

                </div>
                <div className='flex justify-center mt-10'>
                    <Button
                        type={'primary'}
                        text={`Let's move on!`}
                        isAsync={true}
                        loadingText={"Hang on..."}
                        onPress={
                            async () => {
                                
                                let numberOfSelectedRoles = 0;
                                let selectedRoles = [];

                                activeRoles.forEach((role) => {
                                    console.log(role);
                                    if (role.isSelected) {
                                        numberOfSelectedRoles++;
                                        selectedRoles.push(role);
                                    }
                                })

                                console.log(numberOfSelectedRoles);

                                if (numberOfSelectedRoles === 0) {
                                    setIsBannerVisible(true);
                                } else {

                                    const userRef = doc(db, "users", authUser.uid);
                                    console.log(roles)
                                    await setDoc(userRef, {
                                        roles: selectedRoles
                                    }, { merge: true });


                                    navigate('/promo')

                                }

                            }}
                    />
                </div>

                {isBannerVisible && <div className='flex justify-center mt-10 absolute w-[600px]'>
                    <Banner
                        type={'caution'}
                        bannerTitle={'Choose at least one company!'}
                        bannerSubtitle={'You can choose up to 3 companies, but you need to choose at least one! You will be able to add more companies later!'}
                    />
                </div>}
            </div>
        </div>
    );
};

export default Roles;
