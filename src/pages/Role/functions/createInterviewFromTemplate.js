import { createInterview } from "./createInterview.js";
import { generateInterviewTemplate } from "./generateInterviewTemplate.js";
import { deleteGeneratedTemplate } from "./deleteGeneratedTemplate.js";

import { usePostHog } from 'posthog-js/react'

export async function createInterviewFromTemplate({
    setShowModal,
    templateId,
    setIsResumeOpen,
    authUser,
    userState,
    isCreateInterviewInfo,
}) {

    console.log("creating interview from template")



    if (userState.is_subscription) { }
    else {
        if (userState.interviews_started) {
            if (userState.interviews_started >= 3) {
                setShowModal(true)
                return { is_limit_reached: true }
            }
        }
    };




    console.log("templateId", templateId)

    if (!(userState.resume_text_content && userState.resume_text_content.length)) {
        isCreateInterviewInfo.current = { isCreateInterview: true, interviewTemplateID: templateId, uid: authUser.uid };
        setIsResumeOpen(true);
        console.log("retruning")
        return;
    }


    const createInterviewData = { uid: authUser.uid, interview_template_id: templateId };

    console.log("createInterviewData", createInterviewData)
    const createdInterview = await createInterview(createInterviewData);

    const { interview_id } = createdInterview.data;

    console.log("user_interview_created")

    window.location.assign(`/interview/${interview_id}`);
}