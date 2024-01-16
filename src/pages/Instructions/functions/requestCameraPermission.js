export async function requestCameraPermission ({
  setPermissions = () => {}, 
  setErrorText = () => {}
}) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach((track) => track.stop());
      setPermissions(prev => ({ ...prev, camera: true }));
    } catch (error) {
      setErrorText('Please allow camera permissions in your browser settings'); // Update errorText
      console.log('Camera permission not granted');
    }
  };