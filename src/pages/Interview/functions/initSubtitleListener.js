let currentSection = 0;

export function initSubtitleListener({
  trackSubtitlesAndAudio,
  interviewStopwatch
}) {

  window.addEventListener("setAssistantTextEvent", (event) => {
    const {detail} = event;

    const {assistantMessage, audioDuration} = detail


    trackSubtitlesAndAudio.current.push({
      subtitle: assistantMessage,
      audioStartTime: interviewStopwatch.current,
      audioEndTime: interviewStopwatch.current + audioDuration,
      subtitleStartTime: interviewStopwatch.current,
      subtitleEndTime: interviewStopwatch.current + audioDuration,
      currentSection:parseInt(currentSection),
      role:"assistant"
    });
  });

  window.addEventListener("sectionChanged", (event) => {
    const { detail } = event;
    const { sectionId, currentSectionData } = detail;
    const {system_message} = currentSectionData
    const {content} = system_message
    currentSection = sectionId;

    trackSubtitlesAndAudio.current.push({
      audioData: null,
      subtitle: content || null,
      audioStartTime: interviewStopwatch.current,
      audioEndTime: interviewStopwatch.current,
      subtitleStartTime: interviewStopwatch.current,
      subtitleEndTime: interviewStopwatch.current,
      currentSection:parseInt(currentSection),
      role:"system"
    });

  });
}

