import React, { useState, Children } from 'react';


function MenuItem({
    text, 
    onPress, 

}) {

    return (
        <div className='menu-item ml-1 mr-1 p-2'
        onClick = {onPress}
        >
            {text}
        </div>
    )
}

export default MenuItem;