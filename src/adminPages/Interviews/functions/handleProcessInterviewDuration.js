export function handleProcessInterviewDuration({duration}) {
    let minutes = Math.floor(duration / 60000);
    let seconds = duration / 1000 - minutes * 60;
    return minutes + " mins " + seconds.toFixed(0) + " secs"
}
