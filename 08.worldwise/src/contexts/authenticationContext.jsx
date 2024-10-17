import { createContext, useContext } from "react";
import { useReducer } from "react";

const AuthContext = createContext();
const FAKE_USER = {
    name: "Jack",
    email: "jack@example.com",
    password: "qwerty",
    avatar: "https://i.pravatar.cc/100?u=zz",
};
const authInitialState = {
    email: "",
    password: "",
    isAuthenticated: false,
};

function reducer(state, action) {
    switch (action.type) {
        case "login":
            if (
                action.payload.email === FAKE_USER.email &&
                action.payload.password === FAKE_USER.password
            ) {
                return {
                    ...state,
                    email: action.payload.email,
                    password: action.payload.password,
                    isAuthenticated: true,
                };
            } else {
                return authInitialState;
            }
        case "logout":
            return authInitialState;
        default:
            throw new Error("Unknown action type");
    }
}

function AuthProvider({ children }) {
    const [{ email, password, isAuthenticated, isLoading }, dispatch] =
        useReducer(reducer, authInitialState);
    function handleLogin(email, password) {
        dispatch({ type: "login", payload: { email, password } });
    }
    function handleLogout() {
        dispatch({ type: "logout" });
    }
    return (
        <AuthContext.Provider
            value={{
                email,
                password,
                isAuthenticated,
                handleLogin,
                handleLogout,
                isLoading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("AuthContext was used outside its provider");
    }
    return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { AuthProvider, useAuth };
