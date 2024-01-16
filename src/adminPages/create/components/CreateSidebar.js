import React, { useState, useEffect, useRef } from 'react';
import Sidebar from '../../../components/sidebar/Sidebar';
import SidebarItem from '../../../components/sidebar/SidebarItem';
import SidebarHeader from '../../../components/sidebar/SidebarHeader';
import SidebarButtonItem from '../../../components/sidebar/SidebarButtonItem';
import { AiOutlinePlusCircle } from "react-icons/ai";


function CreateSidebar({
    setCreateMainVisible,
    interviewTemplateState,
    setInterviewTemplateState,
    setSelectedQuestionIndex,

}) {


    useEffect(() => {
        // console.log(interviewTemplateState)
    }, [interviewTemplateState])


    return (
        <Sidebar
            width='300px'

        >

            <SidebarHeader
                title='INTERVIEW SETUP'
                className='mt-5'
            />

            <SidebarItem
                title='Visuals'
                isMenu={false}
                onPress={() => {
                    setCreateMainVisible("visuals")
                }}
            />
            <SidebarItem
                title='Information'
                isMenu={false}
                onPress={() => {
                    setCreateMainVisible("information")
                }}
            />

            <SidebarItem
                title='Generator'
                isMenu={false}
                onPress={() => {
                    setCreateMainVisible("generator")
                }}
            />

            <SidebarHeader
                title='QUESTIONS'
                className='mt-5'
            />

            {
                interviewTemplateState.questions?.sort((a, b) => a.questionId - b.questionId).map((question, index) => {
                    return (

                        <SidebarItem
                            key={index}
                            title={question.name || (question.userFacingQuestionText.slice(0, 25) || `Question ${question.questionId}`)}
                            isMenu={true}
                            onPress={() => {
                                setCreateMainVisible("question");
                                setSelectedQuestionIndex(index);
                            }}
                            menuItems={[
                                {
                                    title: 'Move Up',
                                    onPress: () => {
                                        if (index > 0) {
                                            let interviewTemplateStateQuestionsCopy = [...interviewTemplateState.questions]

                                            interviewTemplateStateQuestionsCopy.forEach((question, i) => {
                                                if (i === index) {
                                                    question.questionId = i
                                                }
                                                if (i === index - 1) {
                                                    question.questionId = i + 2
                                                }
                                            })

                                            const updatedQuestions = interviewTemplateStateQuestionsCopy.sort((a, b) => a.questionId - b.questionId);
                                            setInterviewTemplateState({
                                                ...interviewTemplateState,
                                                questions: updatedQuestions,
                                            });

                                        }
                                    },
                                },
                                {
                                    title: 'Move Down',
                                    onPress: () => {
                                        if (index < interviewTemplateState.questions.length - 1) {

                                            let interviewTemplateStateQuestionsCopy = [...interviewTemplateState.questions]

                                            interviewTemplateStateQuestionsCopy.forEach((question, i) => {
                                                if (i === index) {
                                                    question.questionId = i + 2
                                                }
                                                if (i === index + 1) {
                                                    question.questionId = i
                                                }
                                            })

                                            const updatedQuestions = interviewTemplateStateQuestionsCopy.sort((a, b) => b.questionId - a.questionId);
                                            setInterviewTemplateState({
                                                ...interviewTemplateState,
                                                questions: updatedQuestions,
                                            });

                                        }
                                    },
                                },
                                {
                                    title: 'Delete',
                                    onPress: () => {

                                        let interviewTemplateStateQuestionsCopy = [...interviewTemplateState.questions]
                                        interviewTemplateStateQuestionsCopy.splice(index, 1)
                                        interviewTemplateStateQuestionsCopy.forEach((question, i) => {
                                            question.questionId = i + 1
                                        })
                                        const updatedQuestions = interviewTemplateStateQuestionsCopy.sort((a, b) => a.questionId - b.questionId);

                                        setInterviewTemplateState({
                                            ...interviewTemplateState,
                                            questions: updatedQuestions,
                                        });
                                    },
                                },
                            ]}
                        />
                    );
                })
            }


            <SidebarButtonItem
                title='Add Question'
                icon={<AiOutlinePlusCircle size={15} strokeWidth={0.05} />}
                onPress={() => {
                    let interviewTemplateStateQuestionsCopy = [...interviewTemplateState?.questions || []] || []
                    interviewTemplateStateQuestionsCopy.push({
                        questionId: interviewTemplateStateQuestionsCopy.length + 1,
                        userFacingQuestionText: '',
                        questionType: null,
                        questionOptions: [],
                    })
                    setInterviewTemplateState({
                        ...interviewTemplateState,
                        questions: interviewTemplateStateQuestionsCopy,
                    });
                }}
            />



        </Sidebar>
    )
}

export default CreateSidebar