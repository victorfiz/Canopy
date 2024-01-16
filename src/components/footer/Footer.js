import React, { useState, Children } from 'react';


function Footer({
    children
}) {

    return (
        <div className='footer-component'>
            {children}
        </div>
    )
}

export default Footer;