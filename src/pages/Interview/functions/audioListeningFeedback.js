let previousReactionNumber = 300;

export function playInterviewerFeedback(videoRefs, overlayVideoRef) {


  //choose a reaction
  const randomNumber = Math.random();
  previousReactionNumber = randomNumber;

  let reactionNumber = Math.floor(randomNumber * videoRefs.length);
  videoRefs[reactionNumber].current.play();

  if((previousReactionNumber !== reactionNumber)||previousReactionNumber==300) {
  overlayVideoRef.current.style.display = 'none';
  videoRefs.forEach((videoRef) => {
    videoRef.current.style.display = 'none';
  });
  }

  videoRefs[reactionNumber].current.style.display = 'block';







 



}