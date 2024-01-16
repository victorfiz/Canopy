import React, { useState } from "react";

import { AiOutlineArrowLeft } from "react-icons/ai";
import TextButton from "../textButton/TextButton";
import { useNavigate } from "react-router-dom";
import HeaderPP from "../applicationHeader/HeaderPP";
import Resume from "./components/Resume";
import FocusView from "../focusView/FocusView";


const BackHeader = ({
    text = "Back",
    navigateUrl = "/",
    isBorder = true,
    authUser = null,
    setIsResumeOpen = () => { },
    isResumeOpen = false,
    isCreateInterviewInfo = { current: { isCreateInterview: false, interviewTemplateID: null, uid: null } },
}) => {
    const navigate = useNavigate();
    const [isPPMenuOpen, setIsPPMenuOpen] = useState(false);

    return (
        <div className={`h-[60px] w-[100vw]  flex p-2 justify-between items-center ${isBorder ? "border-b border-[#eee]" : ""}`}>
            <TextButton
                onPress={() => {
                    navigate(navigateUrl);
                }}
                text={text}
                className="text-[#703CF0]"
                icon={
                    <AiOutlineArrowLeft className="mt-1 ml-4" />
                }
            />
            <div className='phone-hide'>
                <FocusView isChildVisible={isResumeOpen} setIsChildVisible={setIsResumeOpen}>
                    <Resume
                        authUser={authUser}
                        setIsResumeOpen={setIsResumeOpen}
                        setIsPPMenuOpen={setIsPPMenuOpen}
                        isCreateInterviewInfo={isCreateInterviewInfo}
                    />
                </FocusView>
            </div>
            <div className="mr-6">
                <HeaderPP
                    isPPMenuOpen={isPPMenuOpen}
                    setIsPPMenuOpen={setIsPPMenuOpen}
                    setIsResumeOpen={setIsResumeOpen}

                />
            </div>
        </div>
    );
};



export default BackHeader;
