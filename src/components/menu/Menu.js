import React, { useState, Children } from 'react';
import FocusView from '../focusView/FocusView';
import VerticalBox from '../verticalBox/VerticalBox';
function Menu({
    children,
    isMenuOpen, 
    setIsMenuOpen,
    menuHeight="auto", 
    menuWidth="200px",
    position='auto',
    top='auto',
    left='auto',
    right='auto',

}) {

    return (
        < div className={isMenuOpen?'popping':'hidden'}>
      
            <VerticalBox
                height={menuHeight}
                width={menuWidth}
                className='menu pb-1'
                top={top}
            left={left}
            right={right}
            position={position}

            >
                {children}
            </VerticalBox>

        </div>
    )
}

export default Menu;