// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useReducer } from "react";
import Button from "./Button";
import styles from "./Form.module.css";
import { useNavigate } from "react-router-dom";

export function convertToEmoji(countryCode) {
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
        default:
            throw new Error("Unknown action type");
    }
}

function Form() {
    // const [cityName, setCityName] = useState("");
    // const [country, setCountry] = useState("");
    // const [date, setDate] = useState(new Date());
    // const [notes, setNotes] = useState("");
    const [states, dispatch] = useReducer(reducer, initialState);
    const navigate = useNavigate();

    return (
        <form className={styles.form}>
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
                {/* <span className={styles.flag}>{emoji}</span> */}
            </div>

            <div className={styles.row}>
                {/* <label htmlFor="date">When did you go to {cityName}?</label> */}
                <label htmlFor="date">
                    When did you go to {states.cityName}?
                </label>
                <input
                    id="date"
                    onChange={(e) => {
                        dispatch({ type: "setDate", payload: e.target.value });
                        // setDate(e.target.value);
                    }}
                    // value={date}
                    value={states.date}
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
                <Button type="primary">Add</Button>
                <Button
                    type="back"
                    onClick={(e) => {
                        e.preventDefault();
                        navigate(-1);
                    }}
                >
                    &larr; Back
                </Button>
            </div>
        </form>
    );
}

export default Form;
