export default function FinishScreen({
    points,
    totoalPoints,
    highScore,
    dispatch,
}) {
    const percentage = (points / totoalPoints) * 100;
    return (
        <>
            <p className="result">
                You Scored <strong>{points}</strong> out of {totoalPoints} (
                {Math.round(percentage)} %)
            </p>
            <p className="highscore">(Highscore: {highScore} points)</p>
            <button
                className="btn btn-ui"
                onClick={() => dispatch({ type: "restart" })}
            >
                Restart Quiz
            </button>
        </>
    );
}
