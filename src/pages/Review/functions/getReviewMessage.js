export function getReviewMessage({ score }) {
    console.log("score", score);
    if (score < 3) {
        return {
            message: "There's significant room for improvement in your communication.",
            hexCode: "#f53431",
            emoji: "👎"
        };
    } else if (score < 5) {
        console.log("score", score);
        return {
            message: "You're making a start; focus on continued learning and practice.",
            hexCode: "#ad3d0c",
            emoji: "👎"
        };
    } else if (score < 6) {
        return {
            message: "You're developing your responses well. Maintain your effort and focus.",
            hexCode: "#de6d16",
            emoji: "🤔"
        };
    } else if (score < 7) {
        return {
            message: "Your performance is satisfactory, but further practice will yield improvement.",
            hexCode: "#F1C40F",
            emoji: "👍"
        };
    } else if (score < 9) {
        return {
            message: "A very good performance; some refinements can make it excellent.",
            hexCode: "#27AE60",
            emoji: "👏"
        };
    } else if (score < 10) {
        return {
            message: "Outstanding effort; your preparation is evident and effective.",
            hexCode: "#2980B9",
            emoji: "🎉"
        };
    } else if (score > 10) {
        return {
            message: "Exceptional results; your proficiency may set a benchmark for others.",
            hexCode: "#8E44AD",
            emoji: "🤖"
        };
    } else {
        return {
            message: "Consider focusing more on honing your communication skills.",
            hexCode: "#FF5733",
            emoji: "👎"
        };
    }
}
