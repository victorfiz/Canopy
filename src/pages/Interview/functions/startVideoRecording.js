import RecordRTC, { MediaStreamRecorder } from 'recordrtc';
let videoRTC;
let stream

export async function stopRTCInstance() {

    if (stream) {
        stream.getAudioTracks().forEach(track => track.stop());
        stream.getVideoTracks().forEach(track => track.stop());
    }


}

export async function startVideoRecording({ setVideoRecorder, videoRecorderRef }) {

    stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true })

    videoRTC = new RecordRTC(stream, {
        type: 'video',
        mimeType: 'video/webm;codecs=vp9',
        recorderType: MediaStreamRecorder,
        timeSlice: 250, // this will trigger 'ondataavailable' every 250ms
        ondataavailable: function (blob) {
            let fileReader = new FileReader();
            fileReader.onloadend = () => {
                // if (socket.readyState === socket.OPEN) {
                //     socket.emit('message', new Uint8Array(fileReader.result));
                // }
            };
            fileReader.readAsArrayBuffer(blob);
        }
    });

    videoRTC.startRecording();
    setVideoRecorder(videoRTC);
    

}