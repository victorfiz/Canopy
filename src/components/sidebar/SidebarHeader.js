import React, { useState, useEffect, useRef } from 'react';


function SidebarHeader({
    title,
    className = '',
   
}) {
    

    return (
        <div className={`menu-title ${className} p-0 pl-1.5 mt-3 ml-2 mr-2 mb-3`}>
            {title}
        </div>
    )
}

export default SidebarHeader