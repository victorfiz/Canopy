import { uploadResumeToStorage } from '../../../storage'
import { httpsCallable } from 'firebase/functions';
import { functions } from "../../../firebase";
import { createInterview } from "../../../pages/Role/functions/createInterview.js";

const uploadResume = httpsCallable(functions, 'submit_resume');

export async function uploadResumeToUserDocument({
    file,
    authUser,
    setIsResumeOpen,
    setIsPPMenuOpen,
    isCreateInterviewInfo = {
        current:{
            isCreateInterview: false,
            interviewTemplateID: null,
            uid: null
        }
    },
}) {

    const downloadUrl = await uploadResumeToStorage(file);

    await uploadResume({ uid: authUser.uid, resume_url: downloadUrl });


    if (isCreateInterviewInfo.current.isCreateInterview) {
        let createdInterview = await createInterview({
            interview_template_id: isCreateInterviewInfo.current.interviewTemplateID,
            uid: isCreateInterviewInfo.current.uid
        })

        console.log(createdInterview)
        const { interview_id } = createdInterview.data;
        window.location.assign(`/interview/${interview_id}`);
    }

    setIsPPMenuOpen(false);
    setIsResumeOpen(false);



};