import React, { useState, useEffect, useRef } from 'react';
import FormField from '../../../components/formField/FormField.js';
import Form from '../../../components/formField/Form.js';
import FormHeader from '../../../components/formField/FormHeader.js';
import TextField from '../../../components/textfield/TextField.js';
import FormDropdown from '../../../components/formField/FormDropdown.js';

function TemplateSetup({
    children,
    interviewTemplateState,
    setInterviewTemplateState,
    selectedQuestionIndex,


}) {




    return (
        <div
        >

            <Form
                // title='Template Setup'
                className='ml-10'
                maxHeight='calc(100vh - 180px)'
            >
                <FormHeader
                    title='Template Setup'
                    width='300px'

                />

                <FormField
                    title='Key Words (for transcription)'
                    containerClassName='mt-0'
                    width='300px'
                    placeholder='Rachel, Goldman, Sachs'
                    formValue={interviewTemplateState.pre_interview_csv}
                    setFormValue={(formValue) => {
                        setInterviewTemplateState({
                            ...interviewTemplateState,
                            pre_interview_csv: formValue
                        })
                    }}
                />

                <FormField
                    title='Intro Duration'
                    containerClassName='mt-5'
                    width='300px'
                    placeholder='1 (in seconds set 1 unless HR)'
                    formValue={interviewTemplateState.pre_interview_duration}
                    setFormValue={(formValue) => {
                        setInterviewTemplateState({
                            ...interviewTemplateState,
                            pre_interview_duration: formValue
                        })
                    }}
                />

                <FormField
                    title='Tags (for DB search)'
                    containerClassName='mt-5'
                    width='300px'
                    placeholder='GS_IB, equities'
                    formValue={interviewTemplateState.tags?.join(', ') || ""}
                    setFormValue={(formValue) => {
                        setInterviewTemplateState({
                            ...interviewTemplateState,
                            tags: formValue?.split(', '), 
                            generator_id: interviewTemplateState?.tags?.length? interviewTemplateState.tags[0] : ""

                        })
                    }}
                />

                <FormField
                    title='Interview Subject'
                    containerClassName='mt-5'
                    width='300px'
                    placeholder='investment banking analyst role at Goldman Sachs'
                    formValue={(interviewTemplateState?.subject)?.toString() || ""}
                    setFormValue={(formValue) => {
                        setInterviewTemplateState({
                            ...interviewTemplateState,
                            subject: formValue
                        })
                    }}
                />


                <FormDropdown

                    title = "Include Resume In Intro"
                    containerClassName='mt-5'
                    options={[
                        {
                            display: "Yes, include",
                            value: "false"
                        },
                        {
                            display: "No, skip",
                            value: "true"
                        },
                     

                    ]}

                    formValue={
                        interviewTemplateState?.pre_interview_skip_resume || "false"
                    }
                    setFormValue={(formValue) => {
                        setInterviewTemplateState({
                            ...interviewTemplateState,
                            pre_interview_skip_resume: formValue
                        })
                    }}
              
                />




                <TextField
                    title='Intro Prompt'
                    containerClassName='mt-5'
                    width='calc(80%)'
                    placeholder={`Your name is Rachel, you are a Director at Goldman Sachs, and you are interviewing a candidate for an investment banking role. 
You will thank the candidate for coming in. 
They will respond. 
Once you have thanked the candidate for coming in, TAKE A DEEP BREATH, say exactly the following.   “My name is Rachel. I’m your interviewer today. This interview will last around 15 minutes. You’ll get a chance to demonstrate your knowledge of stocks and talk about your perspective on various factors related to investing. Ready to jump in?”  
Make sure you say the exact string provided above to the candidate.`
}
                    textContent={interviewTemplateState.pre_interview_name}
                    setTextContent={(formValue) => {
                        setInterviewTemplateState({
                            ...interviewTemplateState,
                            pre_interview_name: formValue
                        })
                    }}

                />



            </Form>


        </div >
    )
}

export default TemplateSetup