import { useEffect, useReducer } from "react";
import Header from "./Header";
import { Main } from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import { StartScreen } from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Timer from "./Timer";

const SECS_PER_QUESTION = 30;

const initialState = {
    questions: [],
    // "loading", "error", "ready", "avtive", "finished"
    status: "loading",
    currentQuestion: 0,
    answer: null,
    points: 0,
    highScore: 0,
    remainingSeconds: 0,
};

function reducer(state, action) {
    switch (action.type) {
        case "setQuestions":
            return {
                ...state,
                questions: action.payload,
                status: "ready",
                remainingSeconds: state.questions.length * SECS_PER_QUESTION,
            };
        case "dataFailed":
            return { ...state, status: "error" };
        case "start":
            return { ...state, status: "active" };
        case "newAnswer":
            const question = state.questions[state.currentQuestion];
            const newPoints =
                question.correctOption === action.payload
                    ? state.points + question.points
                    : state.points;
            return {
                ...state,
                answer: action.payload,
                points: newPoints,
            };
        case "nextQuestion":
            return {
                ...state,
                answer: null,
                currentQuestion: state.currentQuestion + 1,
            };
        case "finish":
            return {
                ...state,
                status: "finished",
                highScore:
                    state.points > state.highScore
                        ? state.points
                        : state.highScore,
            };
        case "restart":
            return {
                ...initialState,
                status: "ready",
                questions: state.questions,
                highScore: state.highScore,
                remainingSeconds: state.questions.length * SECS_PER_QUESTION,
            };
        case "tick":
            if (state.remainingSeconds === 0)
                return { ...state, status: "finished" };
            return { ...state, remainingSeconds: state.remainingSeconds - 1 };
        default:
            throw new Error("Unkown action");
    }
}

export default function App() {
    const [
        {
            questions,
            status,
            currentQuestion,
            answer,
            points,
            highScore,
            remainingSeconds,
        },
        dispatch,
    ] = useReducer(reducer, initialState);
    const numberOfQuestion = questions.length;
    const totalPoints = questions.reduce((acc, val) => acc + val.points, 0);

    useEffect(() => {
        fetch("http://localhost:4000")
            .then((res) => res.json())
            .then((data) => {
                dispatch({ type: "setQuestions", payload: data });
            })
            .catch(() => dispatch({ type: "dataFailed" }));
    }, []);

    return (
        <div className="app">
            <Header />
            <Main>
                {status === "loading" && <Loader />}
                {status === "error" && <Error />}
                {status === "ready" && (
                    <StartScreen
                        numberOfQuestion={numberOfQuestion}
                        onStart={() => dispatch({ type: "start" })}
                    />
                )}
                {status === "active" && (
                    <>
                        <Progress
                            index={currentQuestion}
                            numberOfQuestions={numberOfQuestion}
                            points={points}
                            totalPoints={totalPoints}
                            answer={answer}
                        />
                        <Question
                            question={questions[currentQuestion]}
                            dispatch={dispatch}
                            answer={answer}
                        />
                        <Footer>
                            <Timer
                                dispatch={dispatch}
                                remainingSeconds={remainingSeconds}
                            />
                            <NextButton
                                dispatch={dispatch}
                                answer={answer}
                                index={currentQuestion}
                                numberOfQuestions={numberOfQuestion}
                            />
                        </Footer>
                    </>
                )}
                {status === "finished" && (
                    <FinishScreen
                        points={points}
                        totoalPoints={totalPoints}
                        highScore={highScore}
                        dispatch={dispatch}
                    />
                )}
            </Main>
        </div>
    );
}

function Footer({ children }) {
    return <footer>{children}</footer>;
}
