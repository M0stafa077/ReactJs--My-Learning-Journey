/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useCities } from "../contexts/CitiesContext";

function formatDate(date) {
    return new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(new Date(date));
}

function CityItem({ city }) {
    const { cityName, emoji, date, id, position } = city;
    const { lat, lng } = position;
    const { currentCity, deleteCity } = useCities();

    return (
        <li>
            <Link
                to={`${id}?lat=${lat}&lng=${lng}`}
                className={`${styles.cityItem} ${
                    currentCity.id == id ? styles["cityItem--active"] : ""
                }`}
            >
                <span className={styles.emoji}>{emoji}</span>
                <h3 className={styles.name}>{cityName}</h3>
                <time className={styles.date}>{formatDate(date)}</time>
                <button
                    className={styles.deleteBtn}
                    onClick={async (e) => {
                        e.preventDefault();
                        await deleteCity(id);
                    }}
                >
                    &times;
                </button>
            </Link>
        </li>
    );
}

export default CityItem;
