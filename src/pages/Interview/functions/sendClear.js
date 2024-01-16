export const writeClearMessage = (accumulateAssistantAudio, userAudio, interviewId, section_id, changeover, complete) => {

    if(complete){



        const message_to_be_written = {
            assistant_message: accumulateAssistantAudio,
            user_message: userAudio,
            interview_id: interviewId,
            section_id
        };
    
    
        if (accumulateAssistantAudio && userAudio) {
            if (changeover) {
                window.streamResponseSocket.send(JSON.stringify({
                    message_type: "clear",
                    message_to_be_written,
                    is_changeover: true
                }))
    
            } else {
    
    
                window.streamResponseSocket.send(JSON.stringify({
                    message_type: "clear",
                    message_to_be_written,
                    is_changeover: false
                }))
            }
        }
    }

}