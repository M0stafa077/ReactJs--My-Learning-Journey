export function StartScreen({ numberOfQuestion, onStart }) {
    return (
        <div className="start">
            <h2>Welcome to the react quiz!</h2>
            <h3>{numberOfQuestion} questions to test your mastery</h3>
            <button className="btn" onClick={onStart}>
                Let's start!
            </button>
        </div>
    );
}
