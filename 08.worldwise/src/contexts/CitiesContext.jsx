import { createContext, useContext, useEffect, useReducer } from "react";

const BASE_URL = "http://localhost:5000";
const CitiesContext = createContext();

const initialState = {
    cities: [],
    isLoading: false,
    currentCity: {},
    error: "",
};

function reducer(state, action) {
    switch (action.type) {
        case "loading":
            return { ...state, isLoading: true };

        case "cities/loaded":
            return { ...state, isLoading: false, cities: action.payload };

        case "city/created":
            return {
                ...state,
                isLoading: false,
                cities: [...state.cities, action.payload],
                currentCity: action.payload,
            };

        case "city/deleted":
            return {
                ...state,
                isLoading: false,
                cities: state.cities.filter(
                    (city) => city.id !== action.payload
                ),
            };

        case "currentCity/loaded":
            return { ...state, isLoading: false, currentCity: action.payload };

        case "rejected":
            return { ...state, isLoading: false, error: action.payload };

        default:
            throw new Error("Unkown action type");
    }
}

function CitiesProvider({ children }) {
    const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
        reducer,
        initialState
    );
    useEffect(() => {
        async function fetchCities() {
            dispatch({ type: "loading" });
            try {
                const res = await fetch(`${BASE_URL}/cities`);
                const data = await res.json();
                dispatch({ type: "cities/loaded", payload: data });
            } catch (err) {
                dispatch({
                    type: "rejected",
                    payload: "There was an error fetching the data",
                });
            }
        }
        fetchCities();
    }, []);
    async function getCity(id) {
        dispatch({ type: "loading" });
        try {
            const res = await fetch(`${BASE_URL}/cities/${id}`);
            dispatch({ type: "currentCity/loaded", payload: await res.json() });
        } catch (err) {
            dispatch({
                type: "rejected",
                payload: "There was an error fetching the data",
            });
        }
    }
    async function createCity(newCityData) {
        dispatch({ type: "loading" });
        try {
            const response = await fetch(`${BASE_URL}/cities`, {
                method: "POST",
                body: JSON.stringify(newCityData),
                headers: { "Content-Type": "application/json" },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            dispatch({ type: "city/created", payload: data });
        } catch (err) {
            dispatch({
                type: "rejected",
                payload: "There was an error creating the city",
            });
        }
    }
    async function deleteCity(id) {
        dispatch({ type: "loading" });
        try {
            await fetch(`${BASE_URL}/cities/${id}`, {
                method: "DELETE",
            });
            dispatch({ type: "city/deleted", payload: id });
        } catch (err) {
            dispatch({
                type: "rejected",
                payload: "There was an error deleting the city",
            });
        }
    }
    return (
        <CitiesContext.Provider
            value={{
                cities,
                isLoading,
                currentCity,
                getCity,
                createCity,
                deleteCity,
            }}
        >
            {children}
        </CitiesContext.Provider>
    );
}
function useCities() {
    const context = useContext(CitiesContext);
    if (context === undefined)
        throw new Error("useCities was used outside the CitiesProvider");
    return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { CitiesProvider, useCities };
