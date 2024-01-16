import React, { useState, useEffect, useRef } from 'react';
import MainHeading from '../headings/MainHeading.js';

function FormHeader({
    className = '', 
    title = "",
    width = 'auto',


}) {


    return (
        <div
            className={`form-header mt-5 ${className}  mb-5`}
            style={
                {
                    width: width,
                }}
        >
            {title}

        </div>
    )
}

export default FormHeader