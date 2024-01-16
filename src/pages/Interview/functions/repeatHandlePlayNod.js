import { playInterviewerFeedback } from '../functions/audioListeningFeedback';

export function repeatHandlePlayNod ({
    nodRef,
    blinkRef,
    headshakeRef,
    overlayVideoRef
})  {

    const nextTimeout = (Math.random() * 1000) + 2000;

    if (window.VADStartLastSpokeAt > window.VADStopLastSpokeAt) {

      playInterviewerFeedback([nodRef, blinkRef, headshakeRef], overlayVideoRef)
    }
    setTimeout(() => {

      repeatHandlePlayNod(nextTimeout)
    }, nextTimeout)

  }