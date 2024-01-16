import React, { useState, useEffect, useRef } from 'react';
import FormDropdown from '../../../components/formField/FormDropdown.js';
import TextButton from '../../../components/textButton/TextButton.js';
import FormField from '../../../components/formField/FormField.js';
import { BsArrowRight } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';

function QuestionGenerator({
    children,
    interviewTemplateState,
    setInterviewTemplateState,
    selectedQuestionIndex


}) {

    const navigate = useNavigate()



    return (
        <div
            className='h-full w-full ml-10 mt-10 w-[400px]'

        >


            <FormDropdown
                title="Is Generator"
                formValue={interviewTemplateState?.is_generator?.toString() === "true"  || false  }
                setFormValue={(value) => {


                    setInterviewTemplateState({
                        ...interviewTemplateState,
                        is_generator: value,
                        generator_id: interviewTemplateState.tags[0] || ""
                    })


                }
                }
                options={[
                    {
                        value: true,
                        display: "Yes"
                    },
                    {
                        value: false,
                        display: "No"
                    }
                ]}
            />

            <FormField
                containerClassName="mt-5"
                title={"Number of Questions"}
                formValue={interviewTemplateState.number_of_questions}
                setFormValue={(value) => {
                    setInterviewTemplateState(
                        {
                            ...interviewTemplateState,
                            number_of_questions: value
                        }
                    )
                }
                }
            />

            <TextButton
                text="Open generator questions list"
                type={"primary"}
                className='w-[300px] mt-5'
                icon={
                    <div className='mt-1'> <BsArrowRight /> </div>}
                onPress={() => {
                    navigate(`/create-generator/${interviewTemplateState.tags[0]}`)
                }}
            />











        </div >
    )
}

export default QuestionGenerator