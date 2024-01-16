import React, {UseState} from 'react';

const UserTranscript = ({
    content,


}) => {
        return ( 
            <div className='dialogue-container'
            onClick={
                () => {
                 

                }
            }>
                <div className='dialogue-content'>   
                <span className='dialogue-role'>You</span>
                <span className={'user-dialogue-general'}>
                {content}
                </span>
                </div>
            </div>
        );
    }

export default UserTranscript;