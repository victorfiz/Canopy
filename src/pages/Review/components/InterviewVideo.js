import React, {useState} from 'react';

const InterviewVideo = ({videoUrl}) =>{
    // create a video element connected to a youtube video
    // https://www.youtube.com/watch?v=5qap5aO4i9A
    return (
        (videoUrl?
            <div className='interview-video'>
            <iframe width="350" height="200"  src={videoUrl} allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
            :
            <div className='interview-video'>
                <div className='interview-video-shimmer shimmer'>
                    <div className='uploading-video-text'>
                        We're still uploading your interview
                        </div>
                        <div className='uploading-video-subtext'>
                        This may take a minute or two
                        </div>
                     </div>
                </div>)

    )
}

export default InterviewVideo;