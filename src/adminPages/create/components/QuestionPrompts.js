import React, { useState, useEffect, useRef } from 'react';
import FormField from '../../../components/formField/FormField.js';
import Form from '../../../components/formField/Form.js';
import FormHeader from '../../../components/formField/FormHeader.js';
import FormDropdown from '../../../components/formField/FormDropdown.js';
import HorizontalMenu from '../../../components/horizontalMenu/HorizontalMenu.js';
import TextField from '../../../components/textfield/TextField.js';
import { BsChevronDown } from 'react-icons/bs'
import Menu from '../../../components/menu/Menu.js';
import MenuTitle from '../../../components/menu/MenuTitle.js';
import MenuItem from '../../../components/menu/MenuItem.js';

function QuestionPrompts({
    interviewTemplateState,
    setInterviewTemplateState,
    selectedQuestionIndex,
    selectedQuestionBuilder,
    setSelectedQuestionBuilder


}) {

    const [isQuestionPromptMenuOpen, setIsQuestionPromptMenuOpen] = useState(false)
    const [isFeedbackPromptMenuOpen, setIsFeedbackPromptMenuOpen] = useState(false)


    return (
        <div
        >

            <Form

                className='ml-10'
                maxHeight='calc(100vh - 250px)'
            >
                <FormHeader
                    title='Prompts'
                    width='300px'
                />




                <TextField

                    title={
                    <div className="flex">
                        <div>Question Prompt</div>
                        <div 
                        className='ml-2 mt-1 pointer'
                        onMouseOver={()=>{
                            setIsQuestionPromptMenuOpen(true)
                        }}
                        onMouseLeave={()=>{
                            setIsQuestionPromptMenuOpen(false)
                        }}
                        >
                            <BsChevronDown
                                size={15} strokeWidth={1} color={"#414552"}
                            />
                            <Menu
                                isMenuOpen={isQuestionPromptMenuOpen}
                                setIsMenuOpen={setIsQuestionPromptMenuOpen}
                                position={"fixed"}
                                menuWidth='600px'
                            >
                                <MenuTitle title='PROMPTS' />
                                <MenuItem text='Thank the candidate for coming in, wish them a good day.' onPress={() => {
                                     setInterviewTemplateState({
                                        ...interviewTemplateState,
                                        questions: interviewTemplateState.questions?.map((question, index) => {
                                            if (index === selectedQuestionIndex) {
                                                return {
                                                    ...question,
                                                    questionText: interviewTemplateState.questions[selectedQuestionIndex]?.questionText + 
                                                    `Thank the candidate for coming in, wish them a good day. Make sure you include the string [COMPLETE] to signal the end of the interview.`
                                                }
                                            }
                                            return question
                                        }
                                        )
                                    })
                                }} />
                                <MenuItem 
                                text='Once the candidate has finished their response, follow up with a brief insightful question based on their response.
                                '
                                 onPress={() => {
                                     setInterviewTemplateState({
                                        ...interviewTemplateState,
                                        questions: interviewTemplateState.questions?.map((question, index) => {
                                            if (index === selectedQuestionIndex) {
                                                return {
                                                    ...question,
                                                    questionText: interviewTemplateState.questions[selectedQuestionIndex]?.questionText +`
Once the candidate has finished their response, follow up with a brief insightful question based on their response.`
                                                }
                                            }
                                            return question
                                        }
                                        )
                                    })
                                }} />
                                <MenuItem text='Ask the candidate short provoking follow up questions and make them justify their claims' onPress={() => {
                                   
                                   setInterviewTemplateState({
                                    ...interviewTemplateState,
                                    questions: interviewTemplateState.questions?.map((question, index) => {
                                        if (index === selectedQuestionIndex) {
                                            return {
                                                ...question,
                                                questionText: interviewTemplateState.questions[selectedQuestionIndex]?.questionText + 
                                                `
                                                (Ask the candidate short provoking follow up questions and make them justify their claims.)`
                                            }
                                        }
                                        return question
                                    }
                                    )
                                })
                                }} />
                                

                            </Menu>
                        </div>
                    </div>
                    }
                    width='calc(max(80%, 300px))'
                    placeholder={`Now change the subject and ask the candidate what they would do if they were the CEO of the company. `}
                    textContent={interviewTemplateState.questions[selectedQuestionIndex]?.questionText || ""}
                    setTextContent={(formValue) => {
                        setInterviewTemplateState({
                            ...interviewTemplateState,
                            questions: interviewTemplateState.questions?.map((question, index) => {
                                if (index === selectedQuestionIndex) {
                                    return {
                                        ...question,
                                        questionText: formValue
                                    }
                                }
                                return question
                            }
                            )
                        })
                    }}
                />



                {interviewTemplateState.questions[selectedQuestionIndex]?.questionType === "q&context" &&
                    <TextField
                        containerClassName='mt-5'
                        title="Context"
                        width='calc(max(80%, 300px))'
                        placeholder={`Paste the article/report here.`}
                        textContent={interviewTemplateState.questions[selectedQuestionIndex]?.additionalContext?.contextText || ""}
                        setTextContent={(formValue) => {
                            setInterviewTemplateState({
                                ...interviewTemplateState,
                                questions: interviewTemplateState.questions?.map((question, index) => {
                                    if (index === selectedQuestionIndex) {
                                        return {
                                            ...question,
                                            additionalContext: {
                                                ...question.additionalContext,
                                                contextText: formValue
                                            }
                                        }
                                    }
                                    return question
                                }
                                )
                            })
                        }}
                    />
                }


                {interviewTemplateState.questions[selectedQuestionIndex]?.questionType === "q&a" &&
                    <TextField
                        containerClassName='mt-5'
                        title="Solutions"
                        width='calc(max(80%, 300px))'
                        placeholder={`Below is/are x different possible solution(s) to the problem.

Solution 1:
Step 1: Divide A/B
Step 2: Multiply C/D
Step 3: Add E/F
Answer: Hence the answer is G/H

Alternative Solution 2:
    `}
                        textContent={interviewTemplateState.questions[selectedQuestionIndex]?.additionalContext?.answerText || ""}
                        setTextContent={(formValue) => {
                            setInterviewTemplateState({
                                ...interviewTemplateState,
                                questions: interviewTemplateState.questions?.map((question, index) => {
                                    if (index === selectedQuestionIndex) {
                                        return {
                                            ...question,
                                            additionalContext: {
                                                ...question.additionalContext,
                                                answerText: formValue
                                            }
                                        }
                                    }
                                    return question
                                }
                                )
                            })
                        }}
                    />
                }
                <TextField
                    containerClassName='mt-5'
                    title={
                        <div className="flex">
                        <div>Feedback Prompt</div>
                        <div 
                        className='ml-2 mt-1 pointer'
                        onMouseOver={()=>{
                            setIsFeedbackPromptMenuOpen(true)
                        }}
                        onMouseLeave={()=>{
                            setIsFeedbackPromptMenuOpen(false)
                        }}
                        >
                            <BsChevronDown
                                size={15} strokeWidth={1} color={"#414552"}
                            />
                            <Menu
                                isMenuOpen={isFeedbackPromptMenuOpen}
                                setIsMenuOpen={setIsFeedbackPromptMenuOpen}
                                position={"fixed"}
                                menuWidth='600px'
                            >
                                <MenuTitle title='PROMPTS' />
                                <MenuItem text='*** (i.e. skip feedback for this section)' onPress={() => {
                                        setInterviewTemplateState({
                                            ...interviewTemplateState,
                                            questions: interviewTemplateState.questions?.map((question, index) => {
                                                if (index === selectedQuestionIndex) {
                                                    return {
                                                        ...question,
                                                        additionalContext: {
                                                            ...question.additionalContext,
                                                            feedbackText: `***` || ""
                                                        }
                                                    }
                                                }
                                                return question
                                            }
                                            )
                                        })
                                    
                                }} />
                                 <MenuItem
                                  text='Assess the candidates ability to draw from their own experiences ability and recommend a framework if their answer lacks structure. This is a good example of a structure to follow:'
                                  onPress={() => {
                                        setInterviewTemplateState({
                                            ...interviewTemplateState,
                                            questions: interviewTemplateState.questions?.map((question, index) => {
                                                if (index === selectedQuestionIndex) {
                                                    return {
                                                        ...question,
                                                        additionalContext: {
                                                            ...question.additionalContext,
                                                            feedbackText: interviewTemplateState.questions[selectedQuestionIndex]?.additionalContext?.feedbackText +`Assess the candidates ability to draw from their own experiences ability and recommend a framework if their answer lacks structure. This is a good example of a structure to follow:` || ""
                                                        }
                                                    }
                                                }
                                                return question
                                            }
                                            )
                                        })
                                    
                                }} />

                                <MenuItem text='Assess the candidates ability to...' onPress={() => {
                                   setInterviewTemplateState({
                                    ...interviewTemplateState,
                                    questions: interviewTemplateState.questions?.map((question, index) => {
                                        if (index === selectedQuestionIndex) {
                                            return {
                                                ...question,
                                                additionalContext: {
                                                    ...question.additionalContext,
                                                    feedbackText: interviewTemplateState.questions[selectedQuestionIndex]?.additionalContext?.feedbackText +
                                                    `Assess the candidates domain knowledge and their ability to justify their claims` || ""
                                                }
                                            }
                                        }
                                        return question
                                    }
                                    )
                                })
                            }}
                                 />
                                

                            </Menu>
                        </div>
                    </div>
                    }
                    width='calc(max(80%, 300px))'
                    placeholder={`Keep it 1-2 sentences and enter *** for none`}
                    textContent={interviewTemplateState.questions[selectedQuestionIndex]?.additionalContext?.feedbackText || ""}
                    setTextContent={(formValue) => {
                        setInterviewTemplateState({
                            ...interviewTemplateState,
                            questions: interviewTemplateState.questions?.map((question, index) => {
                                if (index === selectedQuestionIndex) {
                                    return {
                                        ...question,
                                        additionalContext: {
                                            ...question.additionalContext,
                                            feedbackText: formValue || ""
                                        }
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

export default QuestionPrompts