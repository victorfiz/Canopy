import React, { useState } from 'react';
import Banner from '../../../components/banner/Banner';
import { useNavigate } from 'react-router-dom';
const NoReview = ({ isReviewDoc }) => {

    const navigate = useNavigate();
    return (
        <div className={!isReviewDoc?'no-review-cont':"hidden"}> 
        
            
            <div className='no-templates-cont-banner'>
            <Banner
                type="default"
                bannerTitle="Review session not found"
                bannerSubtitle="It looks like there isn't a review session for this interview. See your reviews below."
                isActionButton={true}
                actionButtonType="primary"
                showCloseButton={false}
                onActionButtonPress={() => navigate("/myreviews")}
                actionButtonText="See reviews"
                className='no-reviews-banner'
          
                
            >
            </Banner>
            </div>
            
        
        </div>
    )
}

export default NoReview;
