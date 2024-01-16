import { getDoc, doc, addDoc, collection } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

const db = getFirestore();

export async function generateInterviewTemplate(data) {
    const { interview_template_id } = data;

    const interviewTemplateRef = doc(db, 'interview_templates', interview_template_id);
    const interviewTemplateSnap = await getDoc(interviewTemplateRef);
    const interviewTemplateData = interviewTemplateSnap.data();

    let { generator_id, number_of_questions, tags } = interviewTemplateData;

    console.log("generator_id: ", generator_id);

    if(!generator_id) {
         generator_id = tags[0];
    }

    const generatorRef = doc(db, 'admin', 'HR', 'careers', generator_id);
    const generatorSnap = await getDoc(generatorRef);
    const generatorData = generatorSnap.data();

    const all_questions = generatorData.questions;
    const selected_questions = [];

    const random_numbers = [];

    while (random_numbers.length < number_of_questions) {
        const random_number = Math.floor(Math.random() * all_questions.length);
        if (!random_numbers.includes(random_number)) {
            random_numbers.push(random_number);
        }
    }

    random_numbers.forEach(random_number => {
        selected_questions.push(all_questions[random_number]);
    });

    const modified_questions = [];
    let question_id_counter = 1;

    selected_questions.forEach(question => {
        const { feedback, sectionDuration, sectionType, questionText } = question;

        modified_questions.push({
            ...question,
            questionId: question_id_counter,
            // userFacingQuestionText: "HR Interview Practice Question",
            sectionType: null,
            additionalContext:{
                feedbackText: feedback
            },
            sectionDuration: 150,
            questionText: "Now change the topic to the following question. " + questionText + "(And use the candidates resume for personalised followup questions)"
        });

        question_id_counter += 1;
    });

    modified_questions.push({
        questionId: question_id_counter,
        userFacingQuestionText: "Thanks for coming in!",
        sectionType: null,
        feedback: "***",
        sectionDuration: 150,
        questionText: `The interview is over. Tell the candidate "Thanks for coming in! You'll get your feedback in a few seconds. [COMPLETE]". Make sure add the string "[COMPLETE]" at the end of the feedback so that the interview is marked as [COMPLETE].`
    });

    const newInterviewTemplateRef = await addDoc(collection(db, 'interview_templates'), {
        ...interviewTemplateData,
        questions: modified_questions,
        is_generator: false,
        tags: []
    });

    return {
        interview_template_id: newInterviewTemplateRef.id
    };
};