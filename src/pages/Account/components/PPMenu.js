import React, { useState } from 'react';
import { useAuth } from '../../../auth';

import { usePostHog } from 'posthog-js/react'

const PPMenu = ({ isPPMenuOpen, isSubscribed, isResumePresent, setIsPPMenuOpen, uploadResumeToUserDocument, setIsResumeOpen }) => {
    const { authUser, signOut } = useAuth();

    const posthog = usePostHog();

    function handleLogout() {
        signOut();
        posthog.reset();
    }

    return (
        <>
            <div className={isPPMenuOpen ? 'pp-menu-bg' : 'hidden'} onClick={() => {
                setIsPPMenuOpen(false);
            }}></div>
            <div className={isPPMenuOpen ? 'pp-menu' : 'pp-menu hidden'}>
                <div className='pp-menu-hdr-flex'>
                    <div className='pp-menu-hdr'>
                        My Profile
                    </div>
                    <div className='pp-menu-close not-phone-hide' onClick={() => {
                        setIsPPMenuOpen(false);
                    }}
                    >X</div>
                </div>

                <div className='sub-tier'>
                    {isSubscribed ? "Student" : "Basic"}
                </div>

                <div className='pp-menu-item'>
                    {isSubscribed ?
                        <a href="mailto:amu@canopyai.xyz?subject=Cancel%20Subscription&body=I'd%20like%20to%20cancel%20my%20subscription%20[helps%20us%20learn%20if%20you%20fill%20in%20your%20reason]">Cancel Subscription</a> :
                        <a href="/pricing">Upgrade to Pro</a>
                    }
                </div>
                <div className='pp-menu-item not-phone-hide'>
                    <a href="/myreviews">My Reviews</a>
                </div>
                <div className='pp-menu-item not-phone-hide'>
                    <a href="/account">My Interviews</a>
                </div>
                <div className='pp-menu-item'>
                    <input className='pp-ur-inp' type='file' accept='.pdf'
                        onChange={(e) => {
                            console.log(e.target.files[0]);
                            uploadResumeToUserDocument({
                                file: e.target.files[0],
                                authUser,
                                setIsResumeOpen,
                                setIsPPMenuOpen,
                                isResumePresent
                            });
                        }}
                    />
                    Upload Resume
                </div>
                <div onClick={handleLogout} className=' pp-menu-item logout-btn-acc'>Log out</div>
            </div>
        </>
    );
}

export default PPMenu;