import React from 'react';

function LoadingIcon({ message, size=12, type="inline" }) {
    const fullPage = type === "fullPage";

    return (
        <div className={`flex flex-col items-center justify-center ${fullPage ? 'min-h-screen' : ''}`}>
            <div className={`mb-4 w-${size} h-${size}"}`}>
                {/* <div className='logo logo-big spinner'> </div> */}
            </div>
            <div>
                {message}
            </div>
        </div>
    )
}

export default LoadingIcon