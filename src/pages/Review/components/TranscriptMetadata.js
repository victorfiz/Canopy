import React from 'react';
import VerticalBox from '../../../components/verticalBox/VerticalBox';
import { handleProcessInterviewDuration } from '../functions/handleProcessInterviewDuration'
import { getReviewMessage } from '../functions/getReviewMessage';
import TextButton from '../../../components/textButton/TextButton';

function TranscriptMetadata({
    transcriptMetadata,
    reviewState,
    interviewState,
    setShowScoringModal
}) {
    return (
        <VerticalBox
            className='sm:min-h-[80px] min-h-[200px] mb-10 h-[80px]'
            isBorder={false}
        >

            <div className='flex flex-col h-[100%] min-h-[100%] p-3 justify-center'>
                <div className='interview-lhs items-center flex justify-between flex-grow-1 w-[100%] flex-col sm:flex-row'>
                    <div className='text-[2.5em] font-bold ml-3 border-r border-r-4 border-gray-200 pr-4'>

                        <span className='mr-2'
                            style={{
                                color: getReviewMessage({
                                    score: (reviewState?.reduce((sum, review) => {
                                        if (review.ranking !== undefined && review.ranking !== null) {
                                            return sum + review.ranking;
                                        }
                                        return sum;
                                    }, 0) / (reviewState?.filter(review => review.ranking !== undefined && review.ranking !== null).length || 1)).toFixed(1)

                                }).hexCode
                            }}
                        >

                         
                            {
                                (reviewState?.reduce((sum, review) => {
                                    if (review.ranking !== undefined && review.ranking !== null && review.ranking && !review.ignore) {
                                        return sum + review.ranking;
                                    }
                                    return sum;
                                }, 0) / (reviewState?.filter(review => review.ranking !== undefined && review.ranking && !review.ignore && review.ranking !== null && review.ranking).length || 1)).toFixed(1)
                            }
                        </span>

                    </div>


                    <div className='flex flex-col justify-center mt-1 font-medium'>
                        <div className="ml-8 mr-4">
                    

                            {getReviewMessage({
                                score: (reviewState?.reduce((sum, review) => {
                                    if (review.ranking !== undefined && review.ranking !== null) {
                                        return sum + review.ranking;
                                    }
                                    return sum;
                                }, 0) / (reviewState?.filter(review => review.ranking !== undefined && review.ranking !== null).length || 1)).toFixed(1)

                            }).message
                            }


                        </div>
                        <div>
                            <TextButton
                                className='ml-8 text-xs font-light'
                                onPress={() => {
                                    setShowScoringModal(true)
                                }}
                                text="Learn how scoring works!"
                                icon={"✅"}
                                type={'secondary'}
                            />
                        </div>
                    </div>

                </div>



            </div>


        </VerticalBox>
    );
}

export default TranscriptMetadata;
