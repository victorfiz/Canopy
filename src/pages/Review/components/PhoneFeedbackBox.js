import React, {useState} from 'react';
import Button from '../../../components/button/Button';
import VerticalBox from '../../../components/verticalBox/VerticalBox';
import FocusView from '../../../components/focusView/FocusView';

const PhoneFeedbackBox = ({FeedbackTitle, FeedbackContent, isShimmering, isPhoneFeedbackBoxOpen, setIsPhoneFeedbackBoxOpen}) => {

    const [isMagicCoachShimmering, setIsMagicCoachShimmering] = useState(false)
    
    return (
        < div className='not-phone-hide'>
        <FocusView
        setIsChildVisible = {setIsPhoneFeedbackBoxOpen}
        isChildVisible = {isPhoneFeedbackBoxOpen}
        >

        <VerticalBox 
        height='90vh'
        width='90vw'
        title={FeedbackTitle}
        className={
            
                    isPhoneFeedbackBoxOpen?
                    'phone-feedback-box':
                    'phone-feedback-box hidden'
                    }>


            <div className='feedback-content p-4 pt-0'> {FeedbackContent}</div> 
            
     

      
        </VerticalBox>
        </FocusView>
        </div>
    );
}

export default PhoneFeedbackBox;