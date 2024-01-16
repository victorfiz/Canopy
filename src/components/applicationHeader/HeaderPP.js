import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Menu from '../../components/menu/Menu.js';
import MenuTitle from '../../components/menu/MenuTitle.js';
import MenuItem from '../../components/menu/MenuItem.js';
import MenuDivider from '../../components/menu/MenuDivider.js';
import { AiOutlineUser } from "react-icons/ai";
import { useAuth } from '../../auth.js';
import { upgradePlan } from '../../pages/Pricing/functions/upgradePlan.js'


function HeaderPP({
    setIsPPMenuOpen,
    isPPMenuOpen,
    setIsResumeOpen,
    userState = {}
}) {

    const navigate = useNavigate();
    const { signOut } = useAuth();
    const menuRef = useRef(null);
    const { authUser } = useAuth();
    const [isUpgradeLoading, setIsUpgradeLoading] = useState(false);
    const [trialDaysLeft, setTrialDaysLeft] = useState("3 days");


    useEffect(() => {
        if(Object.keys(userState).length > 0){
            const dateToday = Date.now();
            const dateTrialEndsAt = userState.trialEndsAt;

            const daysLeft = Math.floor((dateTrialEndsAt - dateToday) / (1000 * 60 * 60 * 24));

            console.log(daysLeft);  

            if(daysLeft>0){
                setTrialDaysLeft(daysLeft + " days");
            } 


        }
    }, [userState]);

    useEffect(() => {
        function handleDocumentClick(event) {
            if (isPPMenuOpen && menuRef.current && !menuRef.current.contains(event.target)) {
                setIsPPMenuOpen(false);
            }
        }

        // Attach the click listener to the document
        document.addEventListener('click', handleDocumentClick);

        // Cleanup: remove the event listener when the component unmounts
        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, [isPPMenuOpen]); // This effect runs whenever `isPPMenuOpen` changes


    return (

        <div className="phone-hide hidden md:flex relative items-center"
            ref={menuRef}


        >
            {/* {(userState?.isOnFreeTrial && Object.keys(userState).length > 0) && <div className='header-available-interviews flex mt-1 items-center absolute right-0  mr-10'>
                {!isUpgradeLoading ? <div className=' w-[270px] flex text-[#555]'>
                    Trial ends in
                    <span className='ml-1'>
                        {trialDaysLeft}
                    </span>,
                    <div
                        className='ml-1 underline pointer text-[#703CF0] active:scale-95'
                        onClick={
                            async () => {

                                setIsUpgradeLoading(true);

                                await upgradePlan({
                                    authUser
                                })

                            }}
                    >
                        upgrade now
                    </div>
                </div> :
                    <div className='flex items-center text-[#555] w-[180px]'>
                        <div className='spinner spinner-dark mr-2 ' />
                        Upgrading now...
                    </div>
                }
            </div>} */}

            <div
                onMouseOver={
                    () => {
                        setIsPPMenuOpen(true);
                    }
                }
            >
                <AiOutlineUser size={25} strokeWidth={0.05} className='mr-2 pointer'
                />
            </div>
            <Menu
                isMenuOpen={isPPMenuOpen}
                setIsMenuOpen={setIsPPMenuOpen}
                right={"40px"}
                top='55px'
                position={"fixed"}
            >
                <MenuTitle title='ACCOUNT' />
                <MenuItem text='Upgrade' onPress={() => navigate("/pricing")} />
                <MenuItem text='Add Promo Code' onPress={() => navigate("/promo")} />

                <MenuItem text='Upload resume' onPress={() => {
                    if (setIsResumeOpen) {
                        setIsResumeOpen(true)
                    } else {
                        navigate("/account?showResume=true")
                    }

                }} />
                <MenuItem
                    text='Log out'
                    onPress={() => {
                        signOut();
                        navigate("/")
                    }} />


                <MenuDivider />
                <MenuTitle title='NAVIGATE' />
                <MenuItem text='Dashboard' onPress={() => navigate("/account")} />
                <MenuItem text='Reviews' onPress={() => navigate("/myreviews")} />
                <MenuItem text='Pricing' onPress={() => navigate("/pricing")} />
                <a href="mailto:elias@canopyai.xyz" target="_blank" rel="noopener noreferrer">
                    <MenuItem text='Contact' onPress={() => { }} />
                </a>

            </Menu>
        </div>



    );
}

export default HeaderPP;