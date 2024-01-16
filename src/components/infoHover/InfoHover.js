import React, { useState, Children } from 'react';

function InfoHover({
    children,
    infoHoverContent, 
    width= 'fit-content', 
    marginTop= '0px', 
    marginLeft="0px"


}) {

    const [isHovered, setIsHovered] = useState(false);
    return (
        <div> 
            <div 
                className={isHovered?'info-hover-container p-2':"hidden"}
                style={{
                    width,
                    marginTop,
                    marginLeft, 
                    zIndex: 100,
                    }}
                
                >
                {infoHoverContent}
                 </div>
                 <div 
                    onMouseOver={()=>{
                        setIsHovered(true)
                    }}
                    onMouseLeave={()=>{
                        setIsHovered(false)
                    }}
                    > 
                 {children}
                 </div>
            
        </div>
    )
}

export default InfoHover;