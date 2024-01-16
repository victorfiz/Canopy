import React, { useState, Children } from 'react';

function VerticalBox({
    children,
    className = '',
    height = 'auto',
    width = 'auto',
    position = 'relative',
    top,
    left,
    right,
    title, 
    onPress = ()=>{}, 
    isBorder = true
}) {
    return (
        <div
            className={isBorder?`vertical-box-container ${className}`:`vertical-box-container-no-border ${className}`}
            onClick={onPress}
            style={{ 
                height: height, 
                width: width, 
                position: position,
                top: top,
                left: left,
                right: right, 
                maxHeight: height,

                }}>
            {title && <div className='p-3 font-[500]'>{title}</div>}
            {children}
        </div>
    )
}

export default VerticalBox;