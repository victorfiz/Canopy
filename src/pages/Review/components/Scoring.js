import React from 'react';
import VerticalBox from '../../../components/verticalBox/VerticalBox';

const Scoring = ({ score }) => {
    return (
        <VerticalBox
            height="25vw"
            width='50vw'
            className='p-4 sm:700px h-[100vh]'
        >
            <div className='h-full w-full scoring-instructions'> 
            </div>
     
            
        </VerticalBox>
    );
};

export default Scoring;
