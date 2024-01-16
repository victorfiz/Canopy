import React, { useEffect, useRef, useState } from 'react';

const Reactions = ({
  isReactionsOpen,

}) => {
  const nodUrl = "https://firebasestorage.googleapis.com/v0/b/humanview-d6bc8.appspot.com/o/assets%2Fsilentnodpalindrome.mp4?alt=media&token=8eff97b1-f704-4c13-a95d-bf81a49de346&_gl=1*wkhrdq*_ga*ODY0NDU2MTUzLjE2NTg0ODg2NjM.*_ga_CW55HF8NVT*MTY5NjY4MjI1Ni42MzQuMS4xNjk2NjgyMjYwLjU2LjAuMA..";
  const nodRef = useRef(null);

  const headshakeUrl = "https://firebasestorage.googleapis.com/v0/b/humanview-d6bc8.appspot.com/o/assets%2FsynthesiaFiles%2Fheadshake.mp4?alt=media&token=e63873a7-8463-4b7a-b4f6-67e0be380e1a";
  const headshakeRef = useRef(null);

  const [selectedReaction, setSelectedReaction] = useState(0);
  const [testing, setTesting] = useState(false);

  useEffect(() => {
    const switchReactEvery3Seconds = setInterval(() => {
      if(isReactionsOpen.current){
        const randomNumber = Math.random();
        const randomReaction = Math.floor(randomNumber * 2);

        setSelectedReaction(randomReaction);
      }

    }, 3000);

    return () => clearInterval(switchReactEvery3Seconds);
  }, []);

  useEffect(() => {
    if (selectedReaction === 0 && nodRef.current) {
      nodRef.current.play();
    } else if (selectedReaction === 1 && headshakeRef.current) {
      headshakeRef.current.play();
    }
  }, [selectedReaction]);


  useEffect(() => {
    const handleStoppedSpeaking = () => {
      if (nodRef.current && nodRef.current.playbackRate !== 0) {
        nodRef.current.playbackRate = 0;
      }
      if (headshakeRef.current && headshakeRef.current.playbackRate !== 0) {
        headshakeRef.current.playbackRate = 0;
      }
    };

    const handleStartedSpeaking = () => {
      if (nodRef.current) {
        nodRef.current.playbackRate = 1;
      }
      if (headshakeRef.current) {
        headshakeRef.current.playbackRate = 1;
      }
    };

    const handleVideoEnded = (event) => {
      if (event.target === nodRef.current || event.target === headshakeRef.current) {
        handleStoppedSpeaking();
      }
    };

    window.addEventListener("stoppedSpeakingEvent", handleStoppedSpeaking);
    window.addEventListener("startedSpeakingEvent", handleStartedSpeaking);
    nodRef.current?.addEventListener('ended', handleVideoEnded);
    headshakeRef.current?.addEventListener('ended', handleVideoEnded);

    return () => {
      window.removeEventListener("stoppedSpeakingEvent", handleStoppedSpeaking);
      window.removeEventListener("startedSpeakingEvent", handleStartedSpeaking);
      nodRef.current?.removeEventListener('ended', handleVideoEnded);
      headshakeRef.current?.removeEventListener('ended', handleVideoEnded);
    };
  }, []);

  return (
    <div className='relative '>
      <video
        ref={nodRef}
        className={`bg-black ${testing ? "" : 'absolute'} ${(selectedReaction === 0 || testing) ? `opacity-1 ${(selectedReaction === 0 && testing) ? "border-2 border-solid border-blue-500" : ""}` : 'opacity-0'}`}
        src={nodUrl}
        muted
        loop
        playsinline

        // loop = {isReactionsPlaying}
      
      />
      <video
        ref={headshakeRef}
        className={`bg-black ${testing ? "" : ''} ${(selectedReaction === 1 || testing) ? `opacity-1 ${(selectedReaction === 1 && testing) ? "border-2 border-solid border-blue-500" : ""}` : 'opacity-0'}`}
        src={headshakeUrl}
        muted
        loop
        playsinline

        // loop={isReactionsPlaying}

      />
    </div>
  );
};

export default Reactions;
