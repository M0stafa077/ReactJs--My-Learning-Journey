import { useNavigate, useRouteError } from "react-router-dom";

interface ErrorI {
    message?: string;
    data?: string;
    status?: number;
}

function Error() {
    const navigate = useNavigate();
    const error = useRouteError() as ErrorI;
    console.log(error);

    return (
        <div>
            <h1>Something went wrong 😢</h1>
            <p>{error.data || error.message}</p>
            <button onClick={() => navigate(-1)}>&larr; Go back</button>
        </div>
    );
}

export default Error;
