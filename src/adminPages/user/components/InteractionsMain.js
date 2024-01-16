import React from 'react';
import FormField from '../../../components/formField/FormField';
import TextField from '../../../components/textfield/TextField';


const InteractionsMain = ({
    userState,
    setUserState
}) => {
    return (
        <div className='user-main w-[300px] m-10 '>



            <FormField
                title={"Interviews Started"}
                containerClassName="mb-5"
                formValue={userState?.interviews_started}
                setFormValue={(value) => {
                    console.log("setFormValue");
                    setUserState({
                        ...userState,
                        interviews_started: value,
                    })
                }}

            />

            <div className='flex flex-row justify-between'>
                <div className=''>
                    Reviews Completed:</div>
                <div className=''>
                    {userState?.reviews.length}
                </div>
            </div>




        </div>
    );
};

export default InteractionsMain;
