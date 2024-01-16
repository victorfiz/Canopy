import React, { useState, useEffect, useRef } from 'react';
import MainHeading from '../headings/MainHeading.js';

function Form({
    children,
    className, 
    title = "", 
    height = 'auto',
    maxHeight = 'auto',


}) {


    return (
        <div
            className={`flex flex-col w-full ${className} overflow-y-scroll p-3`}
            style={
                {
                    height: height,
                    maxHeight: maxHeight,
                }}

        >
            <MainHeading title={title} />

            {children}

        </div>
    )
}

export default Form