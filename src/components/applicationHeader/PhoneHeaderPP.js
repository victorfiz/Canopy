import React from 'react'
import { useNavigate } from 'react-router-dom';
import Menu from '../../components/menu/Menu.js';
import MenuTitle from '../../components/menu/MenuTitle.js';
import MenuItem from '../../components/menu/MenuItem.js';
import MenuDivider from '../../components/menu/MenuDivider.js';
import { useAuth } from '../../auth.js';
import FocusView from '../focusView/FocusView.js';
import { AiOutlineUser } from "react-icons/ai";


function PhoneHeaderPP({ setIsPPMenuOpen, isPPMenuOpen, setIsResumeOpen }) {

    const navigate = useNavigate();
    const { signOut } = useAuth();

    return (

        <div className="widget-header-pp not-phone-hide"
        onClick={() => {
            setTimeout(() => {
                setIsPPMenuOpen(!isPPMenuOpen);
            }, 100);
        }}>
                    <AiOutlineUser size={25} strokeWidth={0.05} className='mr-2 pointer' />

        <FocusView
            isChildVisible = {isPPMenuOpen}
            setIsChildVisible = {setIsPPMenuOpen}
            position='fixed'
            top='5vh'
            left='5vw'
        > 
        <Menu
            isMenuOpen={isPPMenuOpen}
            setIsMenuOpen={setIsPPMenuOpen}
            menuHeight='90vh'
            menuWidth='90vw'
            >
            <MenuTitle title='ACCOUNT' />
            <MenuItem text='Upgrade' onPress={() => navigate("/pricing")} />
            <MenuItem text='Upload resume' onPress={() => {
                if (setIsResumeOpen) {
                    setIsResumeOpen(true)
                } else {
                    navigate("/account")
                }

            }} />
            <MenuItem text='Logout' onPress={signOut} />


            <MenuDivider />
            <MenuTitle title='NAVIGATE' />
            <MenuItem text='Dashboard' onPress={() => navigate("/account")} />
            <MenuItem text='Reviews' onPress={() => navigate("/myreviews")} />
            <MenuItem text='Pricing' onPress={() => navigate("/pricing")} />
            <a href="mailto:elias@canopyai.xyz" target="_blank" rel="noopener noreferrer">
                <MenuItem text='Contact' onPress={() => { }} />
            </a>

        </Menu>
        </FocusView>
    </div>
    


    );
}

export default PhoneHeaderPP;