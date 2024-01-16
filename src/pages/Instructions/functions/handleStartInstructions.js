export function handleStartInstructions ({setIsActive, setIsPlayAvatarClicked}) {
    if(window.setInterviewId){
      window.setInterviewId("uaFHxxGDOcSOgluvXf9j")
  
    }
    setIsActive(true)
    setIsPlayAvatarClicked(true)




    const interval = setInterval(() => {
      if (window.streamResponseSocket && window.streamResponseSocket.readyState === 1) {
        clearInterval(interval)
        window.streamResponseSocket.send(JSON.stringify({
          transcript_boolean: false,
          interview_id: window.interviewIdSpec,
          created_at: Date.now(),
          message_type: "transcript",
        }));

      }
    })

  }