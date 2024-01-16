import React from 'react';
import TextButton from '../../../components/textButton/TextButton';


function Navigate() {
    return (
        <div className='user-main w-[300px] m-10'>

            <p className='w-[500px] font-small mb-10'> Click on the links below to see what the user will see </p>

            <TextButton
                text="My Reviews"
                onPress={() => {
                    console.log("onPress")
                }}
            />
            


        </div>
    );
}

export default Navigate;
