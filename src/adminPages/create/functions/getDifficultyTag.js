
export function getDifficultyTag({ difficulty }) {

    switch (difficulty) {
        case 'easy':
            return <div className='tag easy-tag'>easy</div>;
        case 'medium':
            return <div className='tag medium-tag'>medium</div>;
        case 'hard':
            return <div className='tag hard-tag'>hard</div>;
        default:
            return <div className='tag easy-tag'>easy</div>;
    }
}
