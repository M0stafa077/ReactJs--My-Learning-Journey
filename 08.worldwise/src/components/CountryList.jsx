/* eslint-disable react/prop-types */
import { useCities } from "../contexts/CitiesContext";
import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import Message from "./Message";
import Spinner from "./Spinner";

function CountryList() {
    const { cities, isLoading } = useCities();
    const renderedCountries = new Set();
    if (isLoading) return <Spinner />;
    if (!cities.length)
        return (
            <Message message="Start adding cities by clicking on the location on the map" />
        );
    return (
        <ul className={styles.countryList}>
            {cities.map((city) => {
                if (renderedCountries.has(city.country)) return null;
                else {
                    renderedCountries.add(city.country);
                    return <CountryItem country={city} key={city.id} />;
                }
            })}
        </ul>
    );
}

export default CountryList;
