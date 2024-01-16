import React, { useState, Children } from 'react';

function TextField({
    children,
    placeholder, 
    setTextContent, 
    textContent, 
    className,
    height = 'auto',
    width = 'auto',
    title = null,
    containerClassName = '',


}) {
    return (
        <div className={`${containerClassName}`}> 
             <div className={title?'form-field-title mb-1':'hidden'}>
                {title}
          
                </div>
        <textarea
            value={textContent}
            onChange={(e) => setTextContent(e.target.value)}
            placeholder={placeholder}
            rows="5"
            className={`w-full p-3 textfield ${className}`} 
            style={
                {
                    height: height,
                    width: width,
                }
            }

        />
        </div>
    )
}

export default TextField;