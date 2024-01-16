import React, { useState, useEffect } from 'react';

const SideCoach = ({ isSideCoachOpen, setIsSideCoachOpen, muted, setMuted, isMuted }) => {


    return (
        <div className='sidecoach'>
            <div className='sidecoach-top-line'> </div>
            <div className='sidecoach-bubble'
            onClick={() => {
                if(muted){
                    console.log("unmuting")
                    setMuted(false)
                    setIsSideCoachOpen(true)
                    isMuted.current = false

                } else {
                    console.log("muting")
                    setMuted(true)
                    isMuted.current = true

                }
            }}
            
            >
                {
                    //!isSideCoachOpen or muted
                    (muted ) ?
                        <div
                            className='circle-container rev-play'
                            
                        >

                        </div> :
                        <div className='circle-container'>
                            <div className="circle"></div>
                            <div className="circle"></div>
                            <div className="circle"></div>
                            <div className="circle"></div>
                            <div className="circle"></div>
                            <div className="circle"></div>
                            <div className="circle"></div>
                            <div className="circle"></div>
                            <div className="circle"></div>
                            <div className="circle"></div>
                            <div className="circle"></div>
                            <div className="circle"></div>
                            <div className="circle"></div>
                            <div className="circle"></div>
                            <div className="circle-nopulse-pp"></div>
                        </div>}
            </div>
            <div className='sidecoach-bottom-line'> </div>



            <div className='sidecoach-bottom'> Your AI coach is always here to talk to you through your feedback.</div>
        </div>
    );
}

export default SideCoach;