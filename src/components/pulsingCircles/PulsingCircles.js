import React, {useState} from 'react'

function PulsingCircles({ 
    onStart = () => {}, 
    onEnd = () => {} 
}) {
    const [isStartButtonClicked, setIsStartButtonClicked] = useState(false);
    return (
        <div className="hero-animation-container hide-500"
            onClick={() => {
                if (!isStartButtonClicked) {
                    setIsStartButtonClicked(true)
                    onStart()
                    // logEvent(analytics, 'start_button_clicked', 'homepage');
                } else {
                    setIsStartButtonClicked(false)
                    onEnd()
                }
            }}
            >
            <div className={isStartButtonClicked ? 'hidden' : 'circle-container play-png'}></div>

            <div className={!isStartButtonClicked ? 'hidden' : 'circle-container'}>
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
                <div className="circle-nopulse"></div>
            </div>
        </div>
    );
}

export default PulsingCircles