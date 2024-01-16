import React, { useState, useEffect, useRef } from 'react';
import NoReviews from './components/NoReviews';
import Resume from '../Account/components/Resume'

import { useAuth } from '../../auth';

import { uploadResumeToUserDocument } from '../Account/functions/uploadResumeToUserDocument.js';
import ReviewRows from './components/ReviewRows';
import Header from '../../components/applicationHeader/Header';
import { reviewsListener } from './functions/reviewsListener'
import FocusView from '../../components/focusView/FocusView';
import Table from '../../components/table/Table';
import Button from '../../components/button/Button';
import { useNavigate } from 'react-router-dom';



function MyReviews() {
    let navigate = useNavigate();
    const { authUser, isLoading } = useAuth();
    const [reviews, setReviews] = useState([]);
    const [isPPMenuOpen, setIsPPMenuOpen] = useState(false);
    const isResumePresent = useRef(false)
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isResumeOpen, setIsResumeOpen] = useState(false);
    const [selectedReviews, setSelectedReviews] = useState([]);
    const [reviewIds, setReviewIds] = useState(null);


    useEffect(() => {
        if (!isLoading && !authUser) {
            navigate("/");
        }
    }, [authUser, isLoading]);


    useEffect(() => {
        if (authUser) reviewsListener({ authUser, setReviews, setReviewIds })
    }, [authUser]);

    return (

        <div className='myreviews-page bg-[#f5f5f6]'>

            <Header
                setIsResumeOpen={setIsResumeOpen}
                selected='reviews'
            />


            <FocusView isChildVisible={isResumeOpen} setIsChildVisible={setIsResumeOpen}>
                <Resume
                    uploadResumeToUserDocument={uploadResumeToUserDocument}
                    authUser={authUser}
                    setIsResumeOpen={setIsResumeOpen}
                    setIsPPMenuOpen={setIsPPMenuOpen}
                    isResumePresent={isResumePresent}
                />
            </FocusView>



            {(reviews.length > 0) &&
                <>
                    <div className='w-full flex justify-center'>
                        <div className='w-[800px]'>
                            <div className='reviews-header ml-8'>
                                🔍<span className='ml-2'>  Reviews </span>
                            </div>

                            <div className='ml-8 flex mb-4 justify-between mr-16'>
                                <div className='flex'>
                                    <div className='tag sub-tag mr-2'> Title</div>
                                    <div className='tag sub-tag mr-2'> Timestamp</div>
                                    <div className='tag sub-tag mr-2'> Duration</div>
                                    <div className='tag sub-tag'> Score</div>
                                </div>

                                {
                                    (selectedReviews?.length > 0)
                                    && <Button
                                        text='Open feedback'
                                        size="small"
                                        type="primary"
                                        isAsync={true}
                                        loadingText={"Opening"}
                                        onPress={() => {
                                            //create a promise that resolves in 0.5 seconds
                                            return new Promise((resolve, reject) => {
                                                setTimeout(() => {
                                                    resolve("hi");
                                                    if (selectedReviews?.length) {
                                                        navigate(`/review/${reviewIds[selectedReviews[0]]}`)
                                                    }
                                                }, 500);
                                            });
                                        }}
                                    />}

                            </div>
                        </div>
                    </div>
                    <div className='w-full flex justify-center'>
                        <div className='ml-16 w-[800px]'>
                            <Table
                                headings={[
                                    <span> 🏷️ <span className='ml-1'>Title</span> </span>,
                                    <span> ⌛️ <span className='ml-1'>Timestamp</span> </span>,
                                    <span> ⏱️ <span className='ml-1'>Duration</span> </span>,
                                    <span> 💡 <span className='ml-1'>Score</span> </span>,
                                ]}
                                rows={reviews}
                                isReviews={true}
                                tableContainerClassName='mr-16 w-[800px]'
                                rowsHeight="calc(100vh - 200px)"
                                setSelectedElements={setSelectedReviews}
                                selectedElements={selectedReviews}
                            />
                        </div>
                    </div>

                </>}

            <NoReviews
                reviews={reviews}
            />
        </div>
    )
}

export default MyReviews;