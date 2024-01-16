import React from 'react';

const Notification = ({ text }) => {
    return (
        <div className="fixed bottom-0 w-full bg-black bg-opacity-50 transition-all duration-500 ease-in-out">
            <p className="text-white text-center py-4">{text}</p>
        </div>
    );
};

export default Notification;
