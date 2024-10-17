// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useReducer } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "./Button";
import styles from "./Form.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function convertToEmoji(countryCode) {
    const codePoints = countryCode
        .toUpperCase()
        .split("")
        .map((char) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
}

const initialState = {
    cityName: "",
    country: "",
    date: new Date(),
    notes: "",
    isLoadingData: false,
    emoji: "",
    error: false,
};
function reducer(state, action) {
    switch (action.type) {
        case "setCityName":
            return { ...state, cityName: action.payload };
        case "setCountry":
            return { ...state, country: action.payload };
        case "setDate":
            return { ...state, date: action.payload };
        case "setNotes":
            return { ...state, notes: action.payload };
        case "setCityInfo":
            return {
                ...state,
                cityName: action.payload.cityName,
                country: action.payload.country,
                emoji: action.payload.emoji,
                error: action.payload.error,
            };
        case "setIsLoading":
            return { ...state, isLoadingData: action.payload };
        case "setEmoji":
            return { ...state, emoji: action.payload };
        case "setError":
            return { ...state, error: action.payload };
        case "reset":
            return initialState;
        default:
            throw new Error("Unknown action type");
    }
}

function Form() {
    const [states, dispatch] = useReducer(reducer, initialState);
    const navigate = useNavigate();
    const { createCity } = useCities();
    const [searchParams] = useSearchParams();
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");

    useEffect(() => {
        if (!lat && !lng) return;
        async function fetchCityInfo() {
            try {
                dispatch({ type: "setIsLoading", payload: true });
                const res = await fetch(
                    `${BASE_URL}?latitude=${lat}&longitude=${lng}`
                );
                const data = await res.json();
                dispatch({
                    type: "setCityInfo",
                    payload: {
                        cityName: data.city || data.locality || "",
                        country: data.countryName,
                        emoji: convertToEmoji(data.countryCode),
                        error: data.countryCode === "" ? true : false,
                    },
                });
            } catch (err) {
                console.log(err);
            } finally {
                dispatch({ type: "setIsLoading", payload: false });
            }
        }
        fetchCityInfo();
    }, [lat, lng]);

    async function handleFormSubmit(e) {
        e.preventDefault();
        if (!states.cityName || !states.country) return;
        const newCity = {
            cityName: states.cityName,
            country: states.country,
            emoji: states.emoji,
            date: states.date,
            notes: states.notes,
            position: { lat, lng },
        };
        createCity(newCity);
        navigate("/app/cities");
    }

    if (states.isLoadingData) return <Spinner />;
    if (!lat && !lng)
        return (
            <Message message="Start by selecting the cities you've visited on the map" />
        );
    if (states.error) {
        // dispatch({ type: "reset" });
        return <Message message="Please select a valid place 🚀" />;
    }
    return (
        <form className={styles.form} onSubmit={handleFormSubmit}>
            <div className={styles.row}>
                <label htmlFor="cityName">City name</label>
                <input
                    id="cityName"
                    onChange={(e) => {
                        dispatch({
                            type: "setCityName",
                            payload: e.target.value,
                        });
                        // setCityName(e.target.value);
                    }}
                    // value={cityName}
                    value={states.cityName}
                />
                <span className={styles.flag}>{states.emoji}</span>
            </div>

            <div className={styles.row}>
                {/* <label htmlFor="date">When did you go to {cityName}?</label> */}
                <label htmlFor="date">
                    When did you go to {states.cityName}?
                </label>
                {/* <input
                    id="date"
                    onChange={(e) => {
                        dispatch({ type: "setDate", payload: e.target.value });
                        // setDate(e.target.value);
                    }}
                    // value={date}
                    value={states.date}
                /> */}
                <DatePicker
                    id="date"
                    onChange={(date) =>
                        dispatch({ type: "setDate", payload: date })
                    }
                    selected={states.date}
                    dateFormat="dd/MM/yyyy"
                    icon
                />
            </div>

            <div className={styles.row}>
                <label htmlFor="notes">
                    {/* Notes about your trip to {cityName} */}
                    Notes about your trip to {states.cityName}
                </label>
                <textarea
                    id="notes"
                    onChange={(e) => {
                        dispatch({ type: "setNotes", payload: e.target.value });
                        // setNotes(e.target.value)
                    }}
                    // value={notes}
                    value={states.notes}
                />
            </div>

            <div className={styles.buttons}>
                <Button
                    type="back"
                    onClick={(e) => {
                        e.preventDefault();
                        navigate("/app/cities");
                    }}
                >
                    &larr; Back
                </Button>
                <Button type="primary">Add</Button>
            </div>
        </form>
    );
}

export default Form;
