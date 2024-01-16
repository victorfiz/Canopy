export function construct_question_message(data) {

    const {question, is_pre_interview} = data;

    const {questionText, questionType, retainContext, questionId} = question;


    console.log(questionId)


    if(!questionType || questionType==="null"){
        let system_msg= `${questionText}. Include the string "[SECTION:${is_pre_interview?parseInt(questionId+1):questionId}] at the start of each message to signal that you are on section ${is_pre_interview?parseInt(questionId+1):questionId}.`
        return {section_message:system_msg}
    

    } else if(questionType === "q&a"){
        let system_msg = `${questionText}.  Only when you ask the user the new question, include the string "[SECTION:${is_pre_interview?parseInt(questionId+1):questionId}] at the start of each message to signal that you are on section ${is_pre_interview?parseInt(questionId+1):questionId}.
            Answer Contextual Information:

            There is more than one possible way to arrive at the answer. The candidate may proceed down any route
            
            ${question.additionalContext.answerText}
        if possible guide the candidate to go through these steps by themselves
        
        Use phrases like "Think about...", or "What if...", or "Did you consider", or 
        "Have you looked at...", or "Have you thought about..."
        
        When the user has arrived at the answer or you have helped the user get to the answer say "[SOLVED], and ask the user if they are ready  to move on. Remember you must include the exact string "[SOLVED]" if the user has solved the question.
        `
        
        return {section_message:system_msg}

    } else if (questionType === "q&context"){

        let system_msg =  `${questionText}. Only when you ask the user the new question, include the string "[SECTION:${is_pre_interview?parseInt(questionId+1):questionId}] at the start of each message to signal that you are on section ${is_pre_interview?parseInt(questionId+1):questionId}.
            
        Article/post/review/journal:
        ${question.additionalContext.contextText}
       
        This is based on the article/post/review/journal below. Tell the candidate that they will find this article in the meeting chat.

               
        Keep questions snappy, short but natural and colloquial (no longer than a 8 words).  
`
        
        return {section_message:system_msg}
    }   else if (questionType === "q&code"){

        let system_msg =  `${questionText}. Only when you ask the user the new question, include the string "[SECTION:${is_pre_interview?parseInt(questionId+1):questionId}] at the start of each message to signal that you are on section ${is_pre_interview?parseInt(questionId+1):questionId}.
            
        Take a deep breath and help the user arrive at the correct solution should they require help by giving suggestions. DO NOT give the use any code ever.   
`
        
        return {section_message:system_msg}


    } else {

        console.log("qtype not found", questionType)
    }


}