import React, { useState, useEffect, useRef } from 'react';
import Menu from '../menu/Menu';
import MenuItem from '../menu/MenuItem';
import MenuTitle from '../menu/MenuTitle';
import { AiOutlineMenu } from "react-icons/ai";

function SidebarItem({
    children,
    className = '',
    title = '',
    isMenu = false,
    menuItems = [],
    onPress = () => { },
}) {

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isLinesOpen, setIsLinesOpen] = useState(false)

    return (
        <div
            className={`sidebar-item ${className} flex justify-between items-center p-1.5 ml-2 mr-2 `}
            onMouseOver={() => {
                setIsLinesOpen(true)
                // setIsMenuOpen(false)
            }}
            onMouseOut={() => {
                setIsLinesOpen(false)
               
            }}

            onClick={()=>{
                onPress()
            }}

        >
            {title}
            <div className={isLinesOpen?'sidebar-item-menu':"hidden"}
                onMouseOver={() => {
                    setIsMenuOpen(true)
                    // setIsMenuOpen(false)
                }}
                onMouseOut={() => {
                    setIsMenuOpen(false)
                   
                }}
            >
                <AiOutlineMenu size={15} strokeWidth={0.05} className={isMenu?'mr-2 pointer':"hidden"}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                />

                <Menu
                    isMenuOpen={isMenuOpen}
                    setIsMenuOpen={setIsMenuOpen}
                    className="p-3 mt-2"
                    position='absolute'

                >

                    <MenuTitle title="QUESTION" />


                    {menuItems.map((item, index) => {
                        const { title, onPress } = item
                        return (
                            <MenuItem
                                key={index}
                                text={title}
                                onPress={onPress}
                            />
                        )
                    })}
                </Menu>
            </div>
        </div>
    )
}

export default SidebarItem