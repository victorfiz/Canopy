import { db } from '../../../firebase'
import { query, setDoc, orderBy, startAfter, limit, getDoc, doc, collection, where, addDoc } from "firebase/firestore";


export async function generateInterviewId ({
    interviewTemplateState,
    selectedQuestionIndex
}){

    const selectedQuestion = interviewTemplateState.questions[selectedQuestionIndex]


    const interviewDoc = await addDoc(collection(db, "interviews"), {
        questions: [
            selectedQuestion, 
            {
                questionText: "This is the end of the interview. Say: 'This test session has now terminated'",
                sectionDuration: 120,
                questionType: "null",
                questionId: "2",

            }
        ],
        createdAt: Date.now(), 
        subject: interviewTemplateState.subject, 
        pre_interview_skip_resume: interviewTemplateState.pre_interview_skip_resume,
    });



    const interviewSectionDoc = await setDoc(doc(db, "interviews", interviewDoc.id, "sections", "0" ), {
        sectionDuration: selectedQuestion.sectionDuration,
        createdAt: Date.now(),
        section_transcript: [
            {
                content: "Ask the candidate why does the earth rotate around the sun?", 
                role: "system"
            },
            {
                content: "Okay, now let's consider why does the earth rotate around the sun?", 
                role: "assistant"
            },
            {
                content: "The earth rotates around the sun because of gravity.", 
                role: "user"
            },
            {
                content: "Alright, let's move on to the next and final question.", 
                role: "assistant"
            },
            {
                content: "You are midway through the interview. Ask the candidate the questions you get provided with", 
                role: "system"
            },
            {
                content: selectedQuestion.questionText, 
                role: "system"
            }
        ]

    });

    const interviewSectionDocFinal = await setDoc(doc(db, "interviews", interviewDoc.id, "sections", "1" ), {
        sectionDuration: selectedQuestion.sectionDuration,
        createdAt: Date.now(),
        section_transcript: [
            {
                content: "You are done with the interview. Say: 'This test session has now terminated'", 
                role: "system"
            },

        ]

    });


    return interviewDoc.id
}