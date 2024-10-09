export default function Progress({
    index,
    numberOfQuestions,
    points,
    totalPoints,
    answer,
}) {
    return (
        <header className="progress">
            <progress
                max={numberOfQuestions}
                value={index + Number(answer !== null)}
            ></progress>
            <p>
                Question <strong>{index + 1}</strong> /{numberOfQuestions}
            </p>
            <p>
                {points} / {totalPoints} points
            </p>
        </header>
    );
}
