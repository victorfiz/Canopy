import React from 'react';
import FormField from '../../../components/formField/FormField';
import TextField from '../../../components/textfield/TextField';


const ResumeMain = ({
    userState,
    setUserState
}) => {
    return (
        <div className='user-main w-[300px] m-10 '>
              
                   
        <TextField 
         title={"Resume Text Content"}
         width='500px'
         containerClassName="mb-5"
         textContent = {userState?.resume_text_content}
         setTextContent = {(value)=>{
             console.log("setFormValue");
             setUserState({
                 ...userState,
                 resume_text_content: value, 
             })
         }}

     />
      <FormField 
         title={"Resume Url"}
         containerClassName="mb-5"
         formValue = {userState?.resume_url }
         setFormValue = {(value)=>{
             console.log("setFormValue");
             setUserState({
                 ...userState,
                 resume_url: value, 
             })
         }}

     />
   
 </div>
    );
};

export default ResumeMain;
