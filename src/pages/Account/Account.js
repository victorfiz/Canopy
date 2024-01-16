import React, { useState, useEffect, useRef } from 'react';
import RolesList from './components/RolesList.js';
import Resume from './components/Resume.js';
import Upgrade from './components/Upgrade.js';
import Header from "../../components/applicationHeader/Header.js";
import Button from '../../components/button/Button.js';
import FocusView from '../../components/focusView/FocusView.js';
import PhoneResume from './components/PhoneResume.js';
import Roles from './components/Roles.js';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useAuth } from '../../auth';
import MainHeading from '../../components/headings/MainHeading.js';
import TextButton from '../../components/textButton/TextButton.js';
import Topic from './components/Topic.js';
import FewHours from './components/FewHours.js';
import { topicLists } from './functions/topicLists.js';
import { createUserDocListener } from './functions/createUserDocListener.js';
import FreeStuff from './components/FreeStuff.js';
import { setUserLocation } from './functions/setUserLocation.js';

function Account() {
    const { authUser, isLoading } = useAuth();

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const openFreeInterviewsModal = searchParams.get('open_free_interviews_modal');


    const [isAllTopicsOpen, setIsAllTopicsOpen] = useState(false);

    let navigate = useNavigate();
    const [isResumeOpen, setIsResumeOpen] = useState(false);
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [dbMessage, setDbMessage] = useState("Hey, welcome back!");
    const [isPPMenuOpen, setIsPPMenuOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showIfSubscriberModal, setShowIfSubscriberModal] = useState(false);
    const [isResumeUploading, setIsResumeUploading] = useState(false);
    const [seeFree, setSeeFree] = useState(openFreeInterviewsModal);
    const isCreateInterviewInfo = useRef({})
    const [userState, setUserState] = useState({
        interview_templates: [],
    });

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);


    useEffect(() => {
        // Update the window width whenever it changes
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            // Cleanup the event listener on component unmount
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (userState.email && authUser) {

            console.log(userState);
            if(userState.firstName){
                setDbMessage(`Hey ${userState.firstName}, welcome back!`);

            }
            if (!userState.isLocationSet) {
                console.log("setting locatoin");
                
                setUserLocation({ uid: authUser.uid });
            
            }

            if(userState.resume_text_content){
                setIsResumeUploading(false);
            }

        } else {
            console.log("not setting locatoin");
        }
    }, [userState, authUser])




    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        setIsResumeOpen(params.get('showResume') === 'true');
    }, []);


    useEffect(() => {

        window.setIsResumeOpen = setIsResumeOpen;

        if (authUser) {
            createUserDocListener({ authUser, setUserState, setIsResumeUploading });
        }

    }, [authUser]);


    useEffect(() => {
        if (!isLoading && !authUser) {
            navigate("/");
        }
    }, [authUser, isLoading]);


    return (
        <div className='account-page bg-[#f5f5f6] overflow-y-scroll'>
            <Header
                setIsResumeOpen={setIsResumeOpen}
                selected='account'
                isCreateInterviewInfo={isCreateInterviewInfo}
                userState={userState}

            />
            <div className='flex justify-center'>
                <div className=' justify-center pb-8 pt-8 max-w-[90vw]'>
                    <div className='flex items-center sm:justify-between max-w-[90vw] justify-center'>
                        <MainHeading
                            title={dbMessage}
                        />

                        {
                            (isResumeUploading) ?
                                <Button
                                    type={'secondary'}
                                    text={"Uploading Resume"}
                                    inheritIsLoading={true}
                                    loadingText={"Uploading Resume"}
                                    className='mt-2 sm:block hidden'
                                    onPress={() => {
                                        setIsResumeOpen(true);
                                    }
                                    }
                                />
                                : (userState.resume_text_content) ?
                                    <Button
                                        type={'secondary'}
                                        text={"🎉 Uploaded"}
                                        className=' mt-2 sm:block hidden'
                                        onPress={() => {
                                            setIsResumeOpen(true);
                                        }
                                        }
                                    />
                                    :
                                    <Button
                                        type={'secondary'}
                                        text={"Upload Resume"}
                                        className='mt-2 sm:block hidden'
                                        onPress={() => {
                                            setIsResumeOpen(true);
                                        }
                                        }
                                    />
                        }

                    </div>

{/* 
                    {!userState.isSubscribed &&
                        <Button
                            type={'primary'}
                            size={'medium'}
                            text={<span><span className='mr-1'>  👉 </span> See what you can access for free!<span className='ml-1'>  👈 </span>  </span>}
                            className='mt-4'
                            fullWidth={windowWidth <= 640 ? true : false}
                            onPress={() => {
                                setSeeFree(true);

                            }}
                        />} */}



                    <div className='flex flex-col'>

                        <div className='line p-4 mb-8 flex'> </div>
                        <div className='justify-between items-center mb-4 mt-8 flex'>
                            <div className='text-[#000] text-2xl sm:justify-start justify-center w-full hidden sm:block'> <span className='mr-2'>🎯 </span>Target your weaknesses</div>
                            {/* <TextButton

                                text={isAllTopicsOpen ? "Show less" : "Show all"}
                                className="mt-1 w-[100px] sm:flex hidden "
                                onPress={() => {
                                    setIsAllTopicsOpen(!isAllTopicsOpen)
                                }}
                                icon={" ➡️ "}
                            /> */}
                        </div>
                        <div className='flex flex-wrap justify-center sm:justify-start'>

                            {
                                (topicLists.slice(0, 4))
                                    .map((topic, index) => {
                                        return <Topic
                                            topic={topic}
                                            setShowModal={setShowModal}
                                            userState={userState}
                                            authUser={authUser}
                                            setShowIfSubscriberModal={setShowIfSubscriberModal}
                                            setIsResumeOpen={setIsResumeOpen}
                                            isResumeUploading={isResumeUploading}
                                        />
                                    })
                            }
                        </div>
                        <div className='flex flex-wrap justify-center sm:justify-start'>
                            {isAllTopicsOpen &&
                                (topicLists.slice(4, 8))
                                    .map((topic, index) => {
                                        return <Topic
                                            topic={topic}
                                            setShowModal={setShowModal}
                                            userState={userState}
                                            authUser={authUser}
                                            setShowIfSubscriberModal={setShowIfSubscriberModal}
                                            setIsResumeOpen={setIsResumeOpen}
                                            isResumeUploading={isResumeUploading}
                                        />
                                    })
                            }

                        </div>
                        <div className=' p-4 mb-12 line flex'> </div>
                        <div className='text-[#000] text-2xl mb-4 flex justify-center sm:justify-start'>
                            <div className='flex items-center'>
                                <span className='mr-2'>📋 </span> Practice for a specific job
                                {/* {!userState.isSubscribed && <div className='header-available-interviews mr-8 flex mt-1 items-center ml-2 text-[15px]'>
                                    <div className='bg-[#0fb] text-white rounded-full h-[20px] w-[20px] flex text-center justify-center items-center'> 3</div>

                                </div>} */}
                            </div>
                        </div>

                        <Roles
                            userState={userState}
                        />




                    </div>

                </div>
            </div>






            <FocusView isChildVisible={isCategoryOpen} setIsChildVisible={setIsCategoryOpen}>
                <RolesList
                    authUser={authUser}
                    setIsCategoryOpen={setIsCategoryOpen} />
            </FocusView>

            <div className='phone-hide'>
                <FocusView isChildVisible={isResumeOpen} setIsChildVisible={setIsResumeOpen}>
                    <Resume
                        authUser={authUser}
                        setIsResumeOpen={setIsResumeOpen}
                        setIsPPMenuOpen={setIsPPMenuOpen}
                        isCreateInterviewInfo={isCreateInterviewInfo}
                        setIsResumeUploadingAccount={setIsResumeUploading}
                        isResumeOpen={isResumeOpen}

                    />
                </FocusView>
            </div>

            <div className='not-phone-hide'>
                <FocusView isChildVisible={isResumeOpen} setIsChildVisible={setIsResumeOpen}>
                    <PhoneResume
                        authUser={authUser}
                        setIsResumeOpen={setIsResumeOpen}
                        setIsPPMenuOpen={setIsPPMenuOpen}
                    />
                </FocusView>
            </div>

            <FocusView isChildVisible={seeFree} setIsChildVisible={setSeeFree}>
                <FreeStuff
                    userState={userState}
                    setIsResumeOpen={setIsResumeOpen}
                    setSeeFree={setSeeFree}
                />
            </FocusView>


            <FocusView isChildVisible={showModal} setIsChildVisible={setShowModal}>
                <Upgrade
                    showModal={showModal}
                    setShowModal={setShowModal}
                />
            </FocusView>

            <FocusView
                isChildVisible={showIfSubscriberModal}
                setIsChildVisible={setShowIfSubscriberModal}

            >
                <FewHours
                    showModal={showIfSubscriberModal}
                />
            </FocusView>
        </div>
    )
}

export default Account