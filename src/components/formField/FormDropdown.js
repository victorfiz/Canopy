import React, { useState, useEffect, useRef } from 'react';
import MainHeading from '../headings/MainHeading.js';

function FormDropdown({
    title = null, 
    formValue,
    setFormValue, 
    className = '',
    containerClassName = '', 
    options = []


}) {

    const [isFocused, setIsFocused] = useState(false)


    return (
        <div className={`${containerClassName}`}>
            <div className={title?`form-field-title mb-1 `:'hidden'}>
                {title}
          
                </div>
            <div className={`flex flex-col w-full ${className} overflow-y-scroll custom-dropdown-holder ${isFocused ? 'custom-dropdown-holder-focus' : ""}`} >
                <select className="custom-dropdown p-2"
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    value={formValue}
                    onChange={(e) => {
                        setFormValue(e.target.value)
                    }}
                >
                    {
                        options.map((option, index) => {
                            return (
                                <option key={index} value={option.value}>{option.display}</option>
                            )
                        })
                    }
 
                </select>
            </div>
        </div>
    )
}

export default FormDropdown