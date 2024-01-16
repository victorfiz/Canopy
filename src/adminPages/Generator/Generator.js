import React, { useState, useEffect, useRef } from 'react';
import { Form, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../auth';
import Header from '../../components/adminHeader/Header.js';
import Footer from '../../components/footer/Footer';
import Button from '../../components/button/Button';
import HorizontalMenu from '../../components/horizontalMenu/HorizontalMenu';
import TextField from '../../components/textfield/TextField';
import FormField from '../../components/formField/FormField';
import { db } from '../../firebase';
import {setDoc, doc, getDoc, updateDoc, arrayUnion, arrayRemove} from "firebase/firestore";

import { createGeneratorListener } from './functions/createGeneratorListener';

const Generator = () => {
    let navigate = useNavigate();
    const { authUser } = useAuth();
    const [generatorBuilder, setGeneratorBuilder] = useState("setup")
    const [careerState, setCareerState] = useState({
        questions: [],
    })
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

    const [careerId, setCareerId] = useState(
        useParams().careerId
    )


    useEffect(() => {
        if (authUser) {


            createGeneratorListener({
                setCareerState, 
                careerId, 
            })


        } else {

        }
    }, [authUser]);






    return (
        <div className='generator-holder flex flex-col h-[100vh] '>
            <Header
                selected='generator' />
            <div className='flex-grow gen-main'>

                <HorizontalMenu
                    className='mt-10 ml-10 w-[80vw]'
                    items={[{
                        display: "Setup",
                        onPress: () => {
                            setGeneratorBuilder("setup")
                        }

                    }, {
                        display: "Questions",
                        onPress: () => {
                            setGeneratorBuilder("questions")
                        }

                    },

                    ]}

                >


                </HorizontalMenu>
                <div className='flex ml-10 p-2 mt-10'> Question {currentQuestionIndex+1}/{careerState.questions.length}</div>
                <div className="infra-holder ml-10  ">
                    {
                        (generatorBuilder === "setup") && (
                            <div className='w-[300px]'>
                                <FormField
                                    title={'Career Id'}
                                    placeholder='i.e. GS_IB, BOFA_HIREVUE'
                                    formValue={careerId}
                                    setFormValue={setCareerId}

                                />
                                <Button
                                    text={`Questions Counter: ${careerState.questions.length}`}
                                    className='mt-10 cursor-default'
                                />
                            </div>

                        )
                    }

                    {
                        (generatorBuilder === "questions") && (
                
                            <div className='w-[500px] overflow-y-scroll generator-builder pb-2 pl-2 pr-2'>
                            <div className='flex justify-start mt-4 mb-10'>
                            <Button
                                text="Delete question"
                                type="destructive"
                                onPress={() => {
                                    if(careerState.questions.length === 1) return;
                                    console.log(currentQuestionIndex, careerState.questions)
                                    setCareerState({
                                        ...careerState,
                                        questions: [
                                            ...careerState.questions.slice(0, currentQuestionIndex),
                                            ...careerState.questions.slice(currentQuestionIndex + 1)
                                        ]
                                    })

                                    setCurrentQuestionIndex(currentQuestionIndex - 1)
                                }}
                            />
                            <Button
                                text="Move backward"
                                type="Secondary"
                                className='ml-4'
                                onPress={() => {

                                    if (currentQuestionIndex === 0) return;
                                    setCurrentQuestionIndex(currentQuestionIndex - 1)

                                }}
                            />
                            <Button
                                text="Move forward"
                                type="Secondary"
                                className='ml-4'
                                onPress={() => {



                                    //if the next question doesn't exist, create it
                                    if (!careerState.questions[currentQuestionIndex + 1]) {
                                        setCareerState({
                                            ...careerState,
                                            questions: [
                                                ...careerState.questions,
                                                {
                                                    questionText: "",
                                                    feedback: "",
                                                    sectionDuration: "",
                                                }
                                            ]
                                        })
                                    }

                                    //set the current question index to the next question
                                    setCurrentQuestionIndex(currentQuestionIndex + 1)

                                }}
                            />
                        </div>
                                <TextField
                                    width={'100%'}
                                    title={'Question'}
                                    placeholder='i.e. Tell me about yourself'
                                    textContent={careerState.questions[currentQuestionIndex]?.questionText || ""}
                                    setTextContent={(text) => {

                                        //keep the rest of the questions in the question array the same

                                        setCareerState({
                                            ...careerState,
                                            questions: [
                                                ...careerState.questions.slice(0, currentQuestionIndex),
                                                {
                                                    ...careerState.questions[currentQuestionIndex],
                                                    questionText: text
                                                },
                                                ...careerState.questions.slice(currentQuestionIndex + 1)
                                            ]
                                        })


                                    }}
                                />
                                <TextField
                                    width={'100%'}
                                    title={'Feedback'}
                                    placeholder='i.e. Should use STAR framework, should display financial knowledge'
                                    containerClassName={"mt-4"}
                                    textContent={careerState.questions[currentQuestionIndex]?.feedback || ""}
                                    setTextContent={(text) => {

                                        setCareerState({
                                            ...careerState,
                                            questions: [
                                                ...careerState.questions.slice(0, currentQuestionIndex),
                                                {
                                                    ...careerState.questions[currentQuestionIndex],
                                                    feedback: text
                                                },
                                                ...careerState.questions.slice(currentQuestionIndex + 1)
                                            ]
                                        })
                                    }}
                                />
                                <FormField
                                    title={'Section Duration'}
                                    placeholder={'150'}
                                    containerClassName={'mt-4'}
                                    formValue={careerState.questions[currentQuestionIndex]?.sectionDuration || ""}
                                    setFormValue={(text) => {
                                        setCareerState({
                                            ...careerState,
                                            questions: [
                                                ...careerState.questions.slice(0, currentQuestionIndex),
                                                {
                                                    ...careerState.questions[currentQuestionIndex],
                                                    sectionDuration: text
                                                },
                                                ...careerState.questions.slice(currentQuestionIndex + 1)
                                            ]
                                        })

                                    }}
                                />
                         
                            </div>

            
                        )
                    }

                </div>
            </div>
            <Footer>
                <Button
                    type={'primary'}
                    text={'Sync Template'}
                    isAsync={true}
                    loadingText={'Syncing Template...'}
                    onPress={
                        async () => {


                            const docRef = doc(db, "admin", "HR", "careers", careerId);

                            await setDoc(docRef, {
                                questions: careerState.questions
                            }, {merge: true});



                        console.log("sync template")


                    }}

                > </Button>
            </Footer>
        </div >
    );
};

export default Generator;