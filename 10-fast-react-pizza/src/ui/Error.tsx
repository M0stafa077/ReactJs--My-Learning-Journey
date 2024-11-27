import { useNavigate, useRouteError } from "react-router-dom";
import LinkButton from "./LinkButton";

interface ErrorI {
    message?: string;
    data?: string;
    status?: number;
}

function Error() {
    const error = useRouteError() as ErrorI;
    console.log(error);

    return (
        <div>
            <h1>Something went wrong 😢</h1>
            <p>{error.data || error.message}</p>
            <LinkButton to="-1">&larr; Go back</LinkButton>
        </div>
    );
}

export default Error;
