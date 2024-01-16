import React, { useState, useEffect, useRef } from 'react';


const AnimateHead = ({
    
}) => {
    const overlayVideoUrl = "https://firebasestorage.googleapis.com/v0/b/humanview-d6bc8.appspot.com/o/assets%2Frachel%2014%20secs.mp4?alt=media&token=823725ff-7524-4109-a3c8-dbdf3bcd79df&_gl=1*fkbv1w*_ga*ODY0NDU2MTUzLjE2NTg0ODg2NjM.*_ga_CW55HF8NVT*MTY5NjYzODQ3NS42MzMuMS4xNjk2NjM5MzQzLjU2LjAuMA..";
    const reversedVideoUrl = "https://firebasestorage.googleapis.com/v0/b/humanview-d6bc8.appspot.com/o/assets%2Frachel%2014%20backwards.mp4?alt=media&token=b929f281-cda5-4414-9669-c58a0f72ce20&_gl=1*y53eh3*_ga*ODY0NDU2MTUzLjE2NTg0ODg2NjM.*_ga_CW55HF8NVT*MTY5NjYzODQ3NS42MzMuMS4xNjk2NjM5NDMzLjQ5LjAuMA..";
    const [animateHeadDuration, setAnimateHeadDuration] = useState(0);

    const [playingReversed, setPlayingReversed] = useState(false);
    const originalVideoRef = useRef(null);
    const reversedVideoRef = useRef(null);


    window.addEventListener("triggerSpeechEvent", (event) => {

        const { detail } = event;
        const { duration } = detail;
  
        setAnimateHeadDuration(duration);
  
  
  
      });
    const playVideosSequentially = ({ duration }) => {
        let videoDuration = 14;

        let halfway = duration / 2;
        let secondVideoStart = videoDuration - halfway;


        originalVideoRef.current.play();

        setTimeout(() => {
            if (originalVideoRef.current) {
                originalVideoRef.current.pause();
                originalVideoRef.current.currentTime = 0;
            }


            setPlayingReversed(true);

            if (reversedVideoRef.current) {
                reversedVideoRef.current.currentTime = secondVideoStart;
                reversedVideoRef.current.play();
            }
        }, halfway * 1000);
    };

    useEffect(() => {
        const handleReversedVideoEnd = () => {
            setPlayingReversed(false);
        };

        reversedVideoRef.current.addEventListener('ended', handleReversedVideoEnd);


    }, []);

    useEffect(() => {
        const handleMetadataLoaded = () => {
            let originalDuration = originalVideoRef.current.duration;
            let precisionDuration = Math.round(originalDuration * 10000) / 10000;
        };

        originalVideoRef.current.addEventListener('loadedmetadata', handleMetadataLoaded);

        return () => {
        };
    }, []);

    useEffect(() => {
        if (!animateHeadDuration) return;
        playVideosSequentially({
            duration: animateHeadDuration
        })

    }, [animateHeadDuration]);

    useEffect(() => {
        originalVideoRef.current.preload = "auto";
        reversedVideoRef.current.preload = "auto";

        originalVideoRef.current.addEventListener('loadeddata', () => {
        });

        reversedVideoRef.current.addEventListener('loadeddata', () => {
        });
    }, []);



    return (
        <div className="h-[100%] w-[100%] relative">
            <video
                ref={originalVideoRef}
                src={overlayVideoUrl}
                playsInline
                muted
                style={{ opacity: playingReversed ? 0 : 1 }}
            />
            <video
                ref={reversedVideoRef}
                src={reversedVideoUrl}
                playsInline
                muted
                style={{ opacity: playingReversed ? 1 : 0, position: 'absolute', top: 0, left: 0 }}
            />

        </div>
    );
};

export default AnimateHead;
