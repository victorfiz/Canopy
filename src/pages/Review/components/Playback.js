import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import VerticalBox from '../../../components/verticalBox/VerticalBox';

const Playback = ({
    reviewState, 
    interviewState,
}) => {
    const [verticalHeights, setVerticalHeights] = useState([]);
    const audioBytesRef = useRef(null);
    const [width, setWidth] = useState(0);
    const [percentage, setPercentage] = useState(30);

    const videoRef = useRef(null);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);

    const playVideo = () => {
        if (videoRef.current) {
            if (videoRef.current.paused) {
                videoRef.current.play(); // Play the video if it's paused
                setIsVideoPlaying(true);
            } else {
                videoRef.current.pause(); // Pause the video if it's playing
                setIsVideoPlaying(false);
            }
        }
    };
    useEffect(() => {
        const updateVideoProgress = () => {
            if (videoRef.current) {
                const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
                setPercentage(progress);
            }
        };

        const videoElement = videoRef.current;
        videoElement?.addEventListener('timeupdate', updateVideoProgress);

        return () => videoElement.removeEventListener('timeupdate', updateVideoProgress);
    }, []);

    useLayoutEffect(() => {
        const observer = new ResizeObserver(entries => {
            for (let entry of entries) {
                setWidth(entry.contentRect.width);
            }
        });

        if (audioBytesRef.current) {
            observer.observe(audioBytesRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, [audioBytesRef]);

    useEffect(() => {
        const randomNumbers = Array.from({ length: 200 }, () => Math.floor(Math.random() * 91) + 10);
        setVerticalHeights(randomNumbers);
    }, []);

    return (
        <VerticalBox className='sm:min-h-[120px] min-h-[200px] mb-10 h-[0px] p-3 overflow-hidden flex items-center justify-center bg-[#f5f5f6]' isBorder={false}>

            <div className='h-[40px] w-full flex items-center'>
                <div className='play mr-8'>
                    <div className={`${!isVideoPlaying ? "open-yt-video" : "open-yt-video-pause"} h-[40px] w-[40px]`}

                        onClick={playVideo}
                    > </div>
                

                    <video
                        controls
                        width="0"
                        height="300"
                        ref={videoRef}
                    >
                        <source src={interviewState.downloadUrl}
                            type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>

                <div ref={audioBytesRef} className='w-full h-[40px] overflow-hidden flex items-center'>
                    {interviewState.downloadUrl&&
                        verticalHeights.slice(0, Math.floor(width / 7)).map((height, index) => (
                            <div
                                key={index}
                                className="min-w-[5px] bg-[#703CF0] mr-[2px] pointer"
                                onClick={() => {

                                    let percentage = index / Math.floor(width / 7) * 100
                                    console.log("percentage", percentage)
                                    console.log("duration", videoRef.current.duration)
                                    let duration = videoRef.current.duration;
                                    console.log(videoRef.current)


                                    console.log(duration * percentage / 100)

                                    // videoRef.current.currentTime = duration * percentage / 100;
                                }}
                                style={{
                                    height: `${height}%`,
                                    backgroundColor: index < Math.floor(verticalHeights.slice(0, Math.floor(width / 7)).length * (percentage / 100)) ? "#703CF0" : "#aaa"
                                }}
                            ></div>
                        ))
                    }
                </div>
            </div>
        </VerticalBox>
    );
};

export default Playback;
