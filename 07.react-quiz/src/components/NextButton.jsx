export default function NextButton({
    dispatch,
    answer,
    index,
    numberOfQuestions,
}) {
    if (answer === null) return;

    if (index < numberOfQuestions - 1)
        return (
            <button
                className="btn btn-ui"
                onClick={() => {
                    dispatch({ type: "nextQuestion" });
                }}
            >
                Next
            </button>
        );

    if (index === numberOfQuestions - 1)
        return (
            <button
                className="btn btn-ui"
                onClick={() => {
                    dispatch({ type: "finish" });
                }}
            >
                Finish
            </button>
        );
}
