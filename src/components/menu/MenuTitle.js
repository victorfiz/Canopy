import React, { useState, Children } from 'react';


function MenuTitle({
    title
}) {

    return (
        <div className='menu-title p-3 pb-2'>
            {title}
        </div>
    )
}

export default MenuTitle;