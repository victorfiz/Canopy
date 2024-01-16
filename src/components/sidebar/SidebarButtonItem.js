import React, { useState, useEffect, useRef } from 'react';
import Menu from '../menu/Menu';
import MenuItem from '../menu/MenuItem';
import MenuTitle from '../menu/MenuTitle';
import { AiOutlineMenu } from "react-icons/ai";

function SidebarButtonItem({
    children,
    className = '',
    title = '',

    onPress = () => { },
    icon
}) {

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isLinesOpen, setIsLinesOpen] = useState(false)

    return (
        <div
            className={`sidebar-item-btn ${className} flex justify-start items-center p-1.5 ml-2 mr-2 `}
            onClick={()=>{
                onPress()
            }}

        >
            <div className='flex mr-2'>
            {icon}
            </div>
            {title}

        </div>
    )
}

export default SidebarButtonItem