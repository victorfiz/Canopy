import React, { useState, Children } from 'react';
import { useNavigate } from 'react-router-dom';
import { RxCross2 } from "react-icons/rx";
import Button from '../button/Button.js';


function Banner({
    children,
    setIsChildVisible=()=>{},
    isChildVisible, 
    type, 
    isActionButton, 
    onActionButtonPress, 
    bannerTitle, 
    bannerSubtitle, 
    className="", 
    actionButtonType="secondary", 
    actionButtonText,
    showCloseButton=true, 
    width = "100%", 
    height = "auto",
    parentClassName="",


}) {

    let navigate = useNavigate();
    const [isBannerVisible, setIsBannerVisible] = useState(true);

    //switch statment for baseClass based on type
    let baseClass = "p-4 flex rounded-sm"
    let defaultClass = "text-[#414552] banner-default bg-white";
    let cautionClass = "bg-yellow-50 text-[#A82B01] banner-caution";
    let criticalClass = "bg-red-50 text-red-800 banner-critical";

    let closeButtonBaseClass = "ml-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 inline-flex h-8 w-8";
    let closeButtonDefaultClass = "text-[#414552] hover:bg-gray-200";
    let closeButtonCautionClass = "bg-yellow-50 text-yellow-800 hover:bg-yellow-200";
    let closeButtonCriticalClass = "bg-red-50 text-red-800 hover:bg-red-200";


    let typeClass = "";
    let closeButtonClass = "";


    switch (type) {
        case 'default':
            typeClass = defaultClass;
            closeButtonClass = closeButtonDefaultClass;

            break;
        case 'caution':
            typeClass = cautionClass;
            closeButtonClass = closeButtonCautionClass;
            break;
        case 'critical':
            typeClass = criticalClass;
            closeButtonClass = closeButtonCriticalClass;
            break;
        default:
            typeClass = defaultClass;
            closeButtonClass = closeButtonDefaultClass;
            break;

    }

    return (
        <div className={parentClassName}>
            <div className={isBannerVisible?`${baseClass} ${typeClass} ${className}`:'hidden'}
             style={{width: width}}
            >
                <div className="ml-3 text-sm font-medium">
                    <div>
                        {bannerTitle}
                    </div>
                    <div className="mt-2 text-sm font-light">
                        {bannerSubtitle}
                    </div>
                    {
                        isActionButton &&
                        <div className='mt-3'>
                            <Button
                                size="small"
                                type={actionButtonType}
                                text={actionButtonText}
                                onPress={onActionButtonPress}
                                
                            />
                        </div>
                    }
                </div>
                {showCloseButton&&<button onClick={() => {
                    setIsChildVisible(false)
                    setIsBannerVisible(false)
                }}
                    type="button"
                    className={`${closeButtonClass} ${closeButtonBaseClass}`}>
                    <span className="sr-only">Close</span>
                    <RxCross2 size={20} strokeWidth={0.2} />
                </button>}
            </div>
        </div>
    )
}

export default Banner;