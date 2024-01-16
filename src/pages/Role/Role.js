import React, { useState, useRef, useEffect } from 'react';
import BackHeader from '../../components/backHeader/BackHeader';
import MainHeading from '../../components/headings/MainHeading';
import RoundWhiteBox from './components/RoundWhiteBox';
import FocusView from '../../components/focusView/FocusView';
import VerticalBox from '../../components/verticalBox/VerticalBox';
import { createUserDocListener } from './functions/createUserDocListener';
import TextButton from '../../components/textButton/TextButton';
import { useAuth } from "../../auth"
import { useNavigate, useParams } from 'react-router-dom';
import RoundSidebar from './components/RoundSidebar';
import { getRoleData } from './functions/getRoleData';
import Upgrade from '../Account/components/Upgrade';
import Resume from '../Account/components/Resume';

function Role() {

    const navigate = useNavigate();
    const [isPPMenuOpen, setIsPPMenuOpen] = useState(false)

    const [completeTemplateIds, setCompleteTemplateIds] = useState(["1"])
    const [showModal, setShowModal] = useState(false)
    const [isResumeOpen, setIsResumeOpen] = useState(false)
    const [clickedButtons, setClickedButtons] = useState([])

    const { authUser } = useAuth()
    const [userState, setUserState] = useState({})




    


    useEffect(() => {

        window.setIsResumeOpen = setIsResumeOpen;

        if (authUser) {
            console.log("authUser", authUser);
            createUserDocListener({ authUser, setUserState });
        }

    }, [authUser]);


    const { roleId } = useParams();



    const [role, setRole] = useState(
        {

        })


    useEffect(() => {

        console.log("userState", userState);
        getRoleData({ roleId, setRole })

    }, []);




    return (
        <div className='bg-[#f5f5f6] h-[100vh] overflow-y-scroll'>


            <FocusView
                setIsChildVisible={setIsResumeOpen}
                isChildVisible={isResumeOpen}

            >

            </FocusView>

            <FocusView isChildVisible={showModal} setIsChildVisible={setShowModal}>
                <Upgrade
                    showModal={showModal}
                    setShowModal={setShowModal}
                />
            </FocusView>


            <BackHeader
                isBorder={false}
                navigateUrl='/account'
                authUser={authUser}
                setIsResumeOpen={setIsResumeOpen}
                isResumeOpen={isResumeOpen}


            />
            <div className='flex'>
                <RoundSidebar role={role} />
                <div className=''>
                    <div className='p-10 pt-0 '>
                        <div className='flex text-center flex-col justify-center items-center sm:flex-row'>
                            <img
                                className='sm:h-[40px] sm:w-[40px] rounded sm:mr-5 h-[80px] w-[80px] mb-8 mt-4 sm:mb-0 sm:mt-0'
                                src={role.roleIcon}
                            />
                            <MainHeading title={
                                <div className='flex'> {role.roleName}
                                    {/* {(!userState?.isSubscribed && role.roleId==="GOLDMANSACHS")&&<div className='header-available-interviews mr-6 flex mt-1 items-center ml-3 text-[15px]'>
                                        <div className='bg-[#0fb] text-white rounded-full h-[25px] w-[25px] flex text-center justify-center items-center'> 3</div>

                                    </div>} */}
                                </div>

                            } />
                        </div>
                    </div>
                    {
                        role?.rounds?.map((round, index) => {
                            return round.templateData && <div>
                                <RoundWhiteBox
                                    round={round}
                                    setShowModal={setShowModal}
                                    setIsResumeOpen={setIsResumeOpen}
                                    userState={userState}
 

                                />
                            </div>

                        })
                    }

                    <div className=''>
                        <TextButton
                            className='w-[300px] ml-10 '
                            type={"primary"}
                            text='Subscribe to unlock all rounds'
                            icon={"🔒"}
                            onPress={() => {
                                navigate("/pricing")
                            }}
                        />

                    </div>
                    <div className='phone-hide'>
                        <FocusView isChildVisible={isResumeOpen} setIsChildVisible={setIsResumeOpen}>
                            <Resume
                                authUser={authUser}
                                setIsResumeOpen={setIsResumeOpen}
                                setIsPPMenuOpen={setIsPPMenuOpen}
                            />
                        </FocusView>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Role;
