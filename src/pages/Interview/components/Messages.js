import React, { useState, useEffect, useRef } from 'react';


function Messages({ isIDEOpen, isChatExpanded, setIsChatExpanded }) {

    const [chatHtml, setChatHtml] = useState("Welcome to your interview. Important messages like questions, articles, studies or diagrams will appear here in this chat box. So keep an eye out for anything that may help you!");
    const currentSectionId = useRef(0);
  

    useEffect(() => {
        window.addEventListener("sectionChanged", ({ detail }) => {
            const { currentSectionData } = detail;
            const {user_facing_question_text} = currentSectionData
            

            if(user_facing_question_text&&user_facing_question_text.length){
                setIsChatExpanded(user_facing_question_text)
                setChatHtml(user_facing_question_text);
            }
        })
    }, []);

    return (

        <div className={`p-4 overflow-y-scroll transition-width duration-300 ease-in-out overflow-hidden ${isChatExpanded ? 'w-[800px]' : 'w-[100vw] sm:w-[250px]'}`} 
        dangerouslySetInnerHTML={{ __html: chatHtml }}>
        </div>


    );

}

export default Messages;