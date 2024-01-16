import React, { useState, useEffect, useRef } from 'react';
import CreateSidebar from './components/CreateSidebar.js';
import Header from '../../components/adminHeader/Header.js';
import Footer from '../../components/footer/Footer.js';
import Button from '../../components/button/Button.js';
import VisualsSetup from './components/VisualsSetup.js';
import TemplateSetup from './components/TemplateSetup.js';
import QuestionBuilder from './components/QuestionBuilder.js';
import QuestionGenerator from './components/QuestionGenerator.js';

import { createTemplateListener } from "./functions/createTemplateListener.js";
import { syncTemplate } from "./functions/syncTemplate.js";
import { useParams, useNavigate } from 'react-router-dom';
import { AiOutlineArrowLeft } from 'react-icons/ai'
import TextButton from '../../components/textButton/TextButton.js';
import BackHeader from '../../components/backHeader/BackHeader.js';






function Create() {

    const navigate = useNavigate();

    const [interviewTemplateState, setInterviewTemplateState] = useState({});
    const [createMainVisible, setCreateMainVisible] = useState("visuals");
    const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
    const lastTemplateUpdate = useRef(Date.now() - 2000)
    const [syncLoadingText, setSyncLoadingText] = useState("Syncing template")
    const [isSyncing, setIsSyncing] = useState(false)
    const interviewTemplateStateRef = useRef({})

    const interviewTemplateId = useParams().interviewTemplateId



    useEffect(() => {
        createTemplateListener({
            setInterviewTemplateState,
            interviewTemplateId,
            interviewTemplateStateRef

        })





    }, [])

    useEffect(() => {
        lastTemplateUpdate.current = Date.now()
        interviewTemplateStateRef.current = interviewTemplateState
    }, [interviewTemplateState])

    return (
        <div className='create-page h-[100vh] flex flex-col'>
            <BackHeader
                navigateUrl='/templates'
            />
            <div className='create-page-content flex'>
                <CreateSidebar
                    setCreateMainVisible={setCreateMainVisible}
                    interviewTemplateState={interviewTemplateState}
                    setInterviewTemplateState={setInterviewTemplateState}
                    setSelectedQuestionIndex={setSelectedQuestionIndex}
                    selectedQuestionIndex={selectedQuestionIndex}

                />
                <div className='create-main-page-content w-full pr-10'>

                    {(createMainVisible === "information")
                        &&
                        <TemplateSetup
                            interviewTemplateState={interviewTemplateState}
                            setInterviewTemplateState={setInterviewTemplateState}
                            selectedQuestionIndex={selectedQuestionIndex}
                        />}
                    {(createMainVisible === "visuals")
                        &&
                        <VisualsSetup
                            interviewTemplateState={interviewTemplateState}
                            setInterviewTemplateState={setInterviewTemplateState}
                            selectedQuestionIndex={selectedQuestionIndex}
                        />}

                    {(createMainVisible === "question")
                        &&
                        <QuestionBuilder
                            interviewTemplateState={interviewTemplateState}
                            setInterviewTemplateState={setInterviewTemplateState}
                            selectedQuestionIndex={selectedQuestionIndex}

                        />}

                    {(createMainVisible === "generator")
                        &&
                        <QuestionGenerator
                        setInterviewTemplateState ={setInterviewTemplateState}
                        interviewTemplateState={interviewTemplateState}
                        />}



                </div>

            </div>
            <Footer>


                <Button
                    className='ml-4'
                    type='primary'
                    text='Sync template'
                    isAsync={true}
                    onPress={async () => {
                        await syncTemplate({
                            interviewTemplateStateRef,
                            interviewTemplateId
                        })
                    }}

                    loadingText={"Syncing template"}
                />
            </Footer>
        </div>
    )
}

export default Create