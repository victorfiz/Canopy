import React, { useState, useEffect, useRef } from 'react';


function Sidebar({
    children,
    height='auto',
    width='auto',
    className='',
    top='auto',
    left='auto',
    right='auto',
    position='auto',
}) {
    

    return (
        <div 
            className={`sidebar ${className}`}
            style={
                {
                    height:height,
                    width:width,
                    top:top,
                    left:left,
                    right:right,
                    position:position,
                    minWidth: width
                }
            }
        >
            
            
            {children}
        </div>
    )
}

export default Sidebar