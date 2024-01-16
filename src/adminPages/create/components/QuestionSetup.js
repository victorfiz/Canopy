import React, { useState, useEffect, useRef } from 'react';
import FormField from '../../../components/formField/FormField.js';
import Form from '../../../components/formField/Form.js';
import FormHeader from '../../../components/formField/FormHeader.js';
import FormDropdown from '../../../components/formField/FormDropdown.js';
import TextField from '../../../components/textfield/TextField.js';
import TextButton from '../../../components/textButton/TextButton.js';
import { FaExpandArrowsAlt } from "react-icons/fa";
import FocusView from '../../../components/focusView/FocusView.js';
import HTMLPreview from './HTMLPreview.js';


function QuestionSetup({
    interviewTemplateState,
    setInterviewTemplateState,
    selectedQuestionIndex,
}) {

    const [isHTMLPreviewOpen, setIsHTMLPreviewOpen] = useState(false)
    return (
        <div
        >

            <FocusView
                isChildVisible={isHTMLPreviewOpen}
                setIsChildVisible={setIsHTMLPreviewOpen}
               

            >
                <HTMLPreview 
                    html={
                        interviewTemplateState.questions?.[selectedQuestionIndex]?.userFacingQuestionText || ""
                    }
                />
            </FocusView>


            <Form

                className='ml-10'
                maxHeight='calc(100vh - 180px)'
            >
                <FormHeader
                    title='Question Setup'
                    width='300px'
                />

                <FormField
                    title='Question Name (optional)'
                    containerClassName='mt-0'
                    width='300px'
                    placeholder='EcoInnovate Case Study'
                    formValue={interviewTemplateState.questions?.[selectedQuestionIndex]?.name || ""}
                    setFormValue={(formValue) => {
                        setInterviewTemplateState({
                            ...interviewTemplateState,
                            questions: interviewTemplateState.questions?.map((question, index) => {
                                if (index === selectedQuestionIndex) {
                                    return {
                                        ...question,
                                        name: formValue
                                    }
                                }
                                return question
                            }
                            )
                        })
                    }}

                />

                <FormField
                    title='Section Duration'
                    containerClassName='mt-5'
                    width='300px'
                    placeholder='number in seconds (180)'
                    formValue={interviewTemplateState.questions?.[selectedQuestionIndex]?.sectionDuration || 1}
                    setFormValue={(formValue) => {
                        setInterviewTemplateState({
                            ...interviewTemplateState,
                            questions: interviewTemplateState.questions?.map((question, index) => {
                                if (index === selectedQuestionIndex) {
                                    return {
                                        ...question,
                                        sectionDuration: parseInt(formValue) || 1
                                    }
                                }
                                return question
                            }
                            )
                        })
                    }}
                />
                <FormDropdown
                    title={"Section Type"}
                    containerClassName={'mt-5'}
                    options={[
                        {
                            display: "Simple",
                            value: "null"
                        },
                        {
                            display: "Context",
                            value: "q&context"
                        },
                        {
                            display: "Math",
                            value: "q&a"
                        },

                    ]}
                    formValue={
                        interviewTemplateState.questions?.[selectedQuestionIndex]?.questionType || ""
                    }
                    setFormValue={(formValue) => {
                        setInterviewTemplateState({
                            ...interviewTemplateState,
                            questions: interviewTemplateState.questions?.map((question, index) => {
                                if (index === selectedQuestionIndex) {
                                    return {
                                        ...question,
                                        questionType: formValue
                                    }
                                }
                                return question
                            }
                            )
                        })
                    }}
                />
                <TextField
                    containerClassName='mt-5'
                    title={
                        <div className='flex flex-col'>
                            <div> Question Display (optional) </div>
                            <TextButton
                                onPress={() => {
                                    setIsHTMLPreviewOpen(!isHTMLPreviewOpen)
                                } }
                                className='mb-2 mt-2'
                                text='See html display preview'
                                icon={
                                    <div className='mt-0.5'>
                                        <FaExpandArrowsAlt /></div>
                                }
                                type={'primary'}
                            />

                        </div>
                    }
                    width='calc(max(80%, 300px))'
                    placeholder={`Text you want to display to the user for this question
    `}
                    textContent={interviewTemplateState.questions[selectedQuestionIndex]?.userFacingQuestionText || ""}
                    setTextContent={(formValue) => {
                        setInterviewTemplateState({
                            ...interviewTemplateState,
                            questions: interviewTemplateState.questions?.map((question, index) => {
                                if (index === selectedQuestionIndex) {
                                    return {
                                        ...question,
                                        userFacingQuestionText: formValue || null
                                    }
                                }
                                return question
                            }
                            )
                        })
                    }}
                />

            </Form>


        </div >
    )
}

export default QuestionSetup