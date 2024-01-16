import React, {useState} from 'react';
import Button from '../../../components/button/Button';
import VerticalBox from '../../../components/verticalBox/VerticalBox';

const FeedbackBox = ({FeedbackTitle, FeedbackContent, isShimmering, isPhoneFeedbackBoxOpen}) => {

    const [isMagicCoachShimmering, setIsMagicCoachShimmering] = useState(false)
    
    return (
        <div className='phone-hide'>
     
        <VerticalBox 
        height='400px'
        width='350px'
        title={FeedbackTitle}
        position='fixed'
        className={
            isShimmering?
            

                "shimmer bg-gray feedback-box"

                :

                    'feedback-box'
 
                }>


            <div className='feedback-content p-4 pt-0'> {FeedbackContent}</div> 
            
     

    
        </VerticalBox>

        </div>
    );
}

export default FeedbackBox;