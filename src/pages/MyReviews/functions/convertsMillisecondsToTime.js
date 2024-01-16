export function convertMillisecondsToTime(ms) {
    let minutes = Math.floor(ms / 60000);
    let seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + " min" + (minutes > 1 ? "s" : "") + "  " + (seconds < 10 ? '0' : '') + seconds + " seconds";
}