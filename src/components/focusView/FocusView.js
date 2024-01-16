import React, { useState, Children } from 'react';


function FocusView({
    children,
    setIsChildVisible,
    isChildVisible, 
    position='none',
    top='auto',
    left='auto',
    right='auto', 


}) {

    return (
        <>
            {
                isChildVisible &&
                <>
                    <div className='focusview-fullscreen z-10'>
                        <div
                            className='focusview-bg'
                            onClick={() => {
                                setIsChildVisible(false);
                            }}
                        > </div>

                        <div 
                        className='focusview-container'
                        style={{
                            position: position,
                            top: top,
                            left: left,
                            right: right,

                        }}
                        >
                            {children}
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default FocusView;