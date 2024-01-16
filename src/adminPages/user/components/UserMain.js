import React from 'react';
import FormField from '../../../components/formField/FormField';
import FormDropdown from '../../../components/formField/FormDropdown';


const UserMain = ({
    userState,
    setUserState
}) => {
    return (
        <div className='user-main w-[300px] m-10 '>
        <FormField 
            title={"Email"}
            containerClassName="mb-5"
            formValue = {userState?.email}
            setFormValue = {(value)=>{
                console.log("setFormValue");
                setUserState({
                    ...userState,
                    email: value, 
                })
            }}

        />
           <FormField 
            title={"Stripe Customer Id"}
            containerClassName="mb-5"
            formValue = {userState?.customer_id}
            setFormValue = {(value)=>{
                console.log("setFormValue");
                setUserState({
                    ...userState,
                    customer_id: value, 
                })
            }}

        />

        <FormDropdown
            title ="Is Subscribed"
            containerClassName='mb-5'
            formValue = {userState?.is_subscribed}
            setFormValue = {(value)=>{
                console.log("setFormValue");
                setUserState({
                    ...userState,
                    is_subscribed: value, 
                })
            }}
            options={[
                {
                    display: "Yes",
                    value: true
                },
                {
                    display: "No",
                    value: false
                }
            ]}
        />

           
        <FormField 
            title={"Account Timestamp"}
            containerClassName="mb-5"
            formValue = {userState?.timestamp ? userState?.timestamp : Date.now()}
            setFormValue = {(value)=>{
                console.log("setFormValue");
                setUserState({
                    ...userState,
                    timestamp: value, 
                })
            }}

        />
    </div>
    );
};

export default UserMain;
