import React, { useState, useEffect, useRef } from 'react';

function MainHeading({
    title = null,
    className = ''


}) {


    return (
        <div
            className={title?`reviews-header ${className} `:"hidden"}
        >
            {title}

        </div>
    )
}

export default MainHeading