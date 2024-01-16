export async function requestMicrophonePermission ({
  setPermissions = () => {}, 
  setErrorText = () => {}
}) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((track) => track.stop());
      setPermissions(prev => ({ ...prev, microphone: true }));
    } catch (error) {
      setErrorText('Please allow microphone permissions in your browser settings'); // Update errorText
      console.log('Microphone permission not granted');
    }
  };