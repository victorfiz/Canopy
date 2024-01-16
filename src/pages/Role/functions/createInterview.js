import { doc, setDoc, getDoc, addDoc, updateDoc, arrayUnion, collection } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { construct_question_message } from './constructQuestionMessage.js'

const db = getFirestore();

export const createInterview = async ({ interview_template_id, uid }) => {

    console.log("interview_template_id", interview_template_id, "uid", uid)

    try {

        const interview_template_doc = await getDoc(doc(db, 'interview_templates', interview_template_id));
        const user_doc = await getDoc(doc(db, 'users', uid));

        const { resume_text_content, email } = user_doc.data();

        const { pre_interview_boolean, pre_interview_duration, pre_interview_skip_resume } = interview_template_doc.data();

        const { questions, subject } = interview_template_doc.data();


        let interview_doc = await addDoc(collection(db, 'interviews'), {
            current_section: 1,
            last_section_messages: [],
            email, 
            ...interview_template_doc.data(), 
            timestamp: Date.now(),


        })


        await setDoc(doc(db, 'interviews', interview_doc.id, "sections", "0"), {
            type: "resume",
            section_transcript: [{
                role: "system",
                content: interview_template_doc.data().pre_interview_name + (pre_interview_skip_resume ? "" : resume_text_content) + `Include the string "[SECTION:1] at the start of each message to signal that you are on section 1.`,
            }],
            sectionDuration: pre_interview_duration || 20

        }, { merge: true })


        for (let question of questions) {

            const { questionId, retainContext } = question;
            var section_message = null;

            var { section_message } = construct_question_message({ question, subject, is_pre_interview: true })

            let markers = []
            if (question.questionText.includes("<<resume>>")) {
                markers.push("resume")
            }

            await setDoc(doc(db, 'interviews', interview_doc.id, "sections", questionId.toString()), {
                type: "question",
                ...question,
                markers,
                section_transcript: [{
                    role: "system",
                    content: section_message
                }]
            })
        }


        await updateDoc(doc(db, 'interviews', interview_doc.id), {
            uid,
            interview_template_id
        })


        await updateDoc(doc(db, 'users', uid), {
            interview_ids: arrayUnion({
                interview_id: interview_doc.id,
                interview_template_id: interview_template_doc.id,

            })
        })


        return {
            data: {
                interview_id: interview_doc.id,
                interview_template_data: interview_template_doc.data()
            },
            success: true
        }

    } catch (err) {
        throw err
        console.log("err", err)
        return {
            data: err,
            success: false

        }
    }

}