import React, { useState, useEffect, useRef } from 'react';

function FormField({
    children,
    title = null,
    containerClassName = '',
    placeholder = '',
    formValue="",
    setFormValue,
    height = 'auto',
    width = 'auto',


}) {


    return (
        <div
            className={`form-field ${containerClassName} `}
            style={
                {
                    height: height,
                    width: width,
                }}
        >
            <div className={title?'form-field-title mb-1':'hidden'}>
                {title}
          
                </div>
            <input
                placeholder={placeholder}
                value={formValue}
                onChange={(e) => setFormValue(e.target.value)}
                className='p-1 w-full form-field-input'

            />

        </div>
    )
}

export default FormField