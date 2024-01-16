import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import Menu from '../../components/menu/Menu.js';
import MenuTitle from '../../components/menu/MenuTitle.js';
import MenuItem from '../../components/menu/MenuItem.js';
import MenuDivider from '../../components/menu/MenuDivider.js';
import { AiOutlineUser } from "react-icons/ai";
import { useAuth } from '../../auth.js';


function HeaderPP({ setIsPPMenuOpen, isPPMenuOpen, setIsResumeOpen }) {

    const navigate = useNavigate();
    const { signOut } = useAuth();
    const menuRef = useRef(null);

    useEffect(() => {
        // Function to handle document click
        function handleDocumentClick(event) {
            // If menu is open and clicked outside of the menu, close it
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

        <div className="phone-hide"
        ref={menuRef}
        onMouseOver={
            () => {
                setIsPPMenuOpen(true);
            }
        }
     
       >
            
        <AiOutlineUser size={25} strokeWidth={0.05} className='mr-2 pointer' color={"white"}/>
        <Menu
            isMenuOpen={isPPMenuOpen}
            setIsMenuOpen={setIsPPMenuOpen}
            right={"40px"}
            top='55px'
            position={"fixed"}
        >
            <MenuTitle title='ACCOUNT' />
            <MenuItem text='Upgrade' onPress={() => navigate("/pricing")} />
            <MenuItem text='Upload resume' onPress={() => {
                if (setIsResumeOpen) {
                    setIsResumeOpen(true)
                } else {
                    navigate("/account?showResume=true")
                }

            }} />
            <MenuItem text='Log out' onPress={()=>{
                signOut();
                navigate("/");
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