import React, { useState, useEffect, useRef } from 'react';
import HorizontalMenu from '../../../components/horizontalMenu/HorizontalMenu.js';
import QuestionSetup from './QuestionSetup.js';
import QuestionPrompts from './QuestionPrompts.js';
import Test from './Test.js';

function QuestionBuilder({
    children,
    interviewTemplateState,
    setInterviewTemplateState,
    selectedQuestionIndex


}) {



    const [selectedQuestionBuilder, setSelectedQuestionBuilder] = useState("setup")

    return (
        <div
            className='h-full'
        >

            <HorizontalMenu
                className='mt-10 ml-10 '
                items={[{
                    display: "Setup",
                    onPress: () => {
                        setSelectedQuestionBuilder("setup")
                    }

                }, {
                    display: "Prompts",
                    onPress: () => {
                        setSelectedQuestionBuilder("prompts")
                    }

                },
                {
                    display: "Test it out",
                    onPress: () => {
                        setSelectedQuestionBuilder("test")
                    }

                }

                ]}
            />

            {selectedQuestionBuilder === "setup" &&
                <QuestionSetup
                    interviewTemplateState={interviewTemplateState}
                    setInterviewTemplateState={setInterviewTemplateState}
                    selectedQuestionIndex={selectedQuestionIndex}
                    selectedQuestionBuilder={selectedQuestionBuilder}
                    setSelectedQuestionBuilder={setSelectedQuestionBuilder}
                />
            }

            {selectedQuestionBuilder === "prompts" &&
                <QuestionPrompts
                    interviewTemplateState={interviewTemplateState}
                    setInterviewTemplateState={setInterviewTemplateState}
                    selectedQuestionIndex={selectedQuestionIndex}
                    selectedQuestionBuilder={selectedQuestionBuilder}
                    setSelectedQuestionBuilder={setSelectedQuestionBuilder}
                />
            }

            {selectedQuestionBuilder === "test" &&
                <Test
                    interviewTemplateState={interviewTemplateState}
                    selectedQuestionIndex={selectedQuestionIndex}
                />
            }








        </div >
    )
}

export default QuestionBuilder