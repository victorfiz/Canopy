import { createInterview } from "./createInterview.js";
import { generateInterviewTemplate } from "./generateInterviewTemplate.js";
import { deleteGeneratedTemplate } from "./deleteGeneratedTemplate.js";

import { usePostHog } from 'posthog-js/react'

export async function createInterviewFromTemplate({
    setShowModal,
    template,
    setIsResumeOpen,
    authUser,
    setClickedButtons,
    userState,
    isCreateInterviewInfo,
}) {



    if (userState.is_subscription) { }
    else {
        if (userState.interviews_started) {
            if (userState.interviews_started >= 3) {
                setShowModal(true)
                return { is_limit_reached: true }
            }
        }
    };



    if (template.is_generator) {

        const generatedTemplate = await generateInterviewTemplate({
            interview_template_id: template.id,
        })
        template.id = generatedTemplate.interview_template_id;

    }


    console.log("template.id", template.id)

    if (!(userState.resume_text_content && userState.resume_text_content.length)) {
        isCreateInterviewInfo.current = { isCreateInterview: true, interviewTemplateID: template.id, uid: authUser.uid };
        setIsResumeOpen(true);
        return;
    }

    setClickedButtons(prevState => [...prevState, template.id]);


    const createdInterview = await createInterview({ 
        uid: authUser.uid, 
        interview_template_id: template.id 
    });

    if (template.is_generator) {

        console.log("template is generator")
        await deleteGeneratedTemplate({
            interview_template_id: template.id,
        })
    } else {
        console.log("template is not generator")
    }
    const { interview_id } = createdInterview.data;

    console.log("user_interview_created")

    window.location.assign(`/interview/${interview_id}`);
}