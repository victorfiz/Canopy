import React, { useState } from 'react';
import Banner from '../../../components/banner/Banner';
import { useNavigate } from 'react-router-dom';
const NoReviews = ({ reviews, setIsCategoryOpen }) => {

    const navigate = useNavigate();
    return (
        <div className={!reviews.length?'no-templates-cont':"hidden"}> 
        
            
            <div className='no-templates-cont-banner'>
            <Banner
                type="default"
                bannerTitle="No reviews"
                bannerSubtitle="You haven't done an interview yet. Get started by doing an interview!"
                isActionButton={true}
                actionButtonType="primary"
                showCloseButton={false}
                onActionButtonPress={() => navigate("/account?open_free_interviews_modal=true")}
                actionButtonText="Do an interview"
                className='no-reviews-banner'
          
                
            >
            </Banner>
            </div>
            
        
        </div>
    )
}

export default NoReviews;
