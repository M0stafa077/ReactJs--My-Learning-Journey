import { useEffect } from "react";

export default function Timer({ dispatch, remainingSeconds }) {
    const mins = Math.floor(remainingSeconds / 60.0);
    const secs = remainingSeconds % 60;
    useEffect(() => {
        const timerId = setInterval(() => {
            dispatch({ type: "tick" });
        }, 1000);

        return () => clearInterval(timerId);
    }, [dispatch, remainingSeconds]);

    return (
        <p className="timer">
            {mins < 10 && 0}
            {mins}:{secs < 10 && 0}
            {secs}
        </p>
    );
}
