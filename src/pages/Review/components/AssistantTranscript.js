import React, { useState } from 'react';

const UserTranscript = ({ content, isMarkedForReview, setFeedback, setIsShimmering, setIsPhoneFeedbackBoxOpen }) => {

  return (
    <div className={isMarkedForReview?'dialogue-container marked-for-review-ass':'dialogue-container '}
      
      onClick={() => {
        if (isMarkedForReview) {
          setFeedback({
            title: 'Section feedback',
            content: isMarkedForReview
          });
          setIsPhoneFeedbackBoxOpen(true);


          if (window.streamResponseSocket) {
            window.streamResponseSocket.send(JSON.stringify({
              message_type: "system",
              system_message: `The user is looking at the part of the transcript that starts with them saying "${content.slice(0, 30)}...". The feedback they have been given is "${isMarkedForReview}".`,
            }));
          }


          // Reset the shimmer effect after 1 second
          setIsShimmering(true);
          setTimeout(() => {
            setIsShimmering(false);
          }, 1000);
        }
      }}
    >

      {isMarkedForReview && 
        <div className='flex justify-center mt-10 mb-6'> 
        <div className='new-sec-dashed'> </div>
        <div className='new-section-word'> New Section</div>
        <div className='new-sec-dashed'> </div>
        </div>
      }

      <div className='dialogue-content'>
        <span className='dialogue-role dialogue-role-assistant'>Interviewer</span>
        <span className={isMarkedForReview ? 'assistant-for-review user-dialogue-general' : 'user-dialogue-general'}>
          {content}
        </span>

      </div>
    </div>
  );
}

export default UserTranscript;