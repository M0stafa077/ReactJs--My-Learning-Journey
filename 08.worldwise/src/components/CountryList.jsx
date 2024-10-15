/* eslint-disable react/prop-types */
import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import Message from "./Message";
import Spinner from "./Spinner";

function CountryList({ cities, isLoading }) {
    if (isLoading) return <Spinner />;
    if (!cities.length)
        return (
            <Message message="Start adding cities by clicking on the location on the map" />
        );
    return (
        <ul className={styles.countryList}>
            {cities.map((city) => (
                <CountryItem country={city} key={city.id} />
            ))}
        </ul>
    );
}

export default CountryList;
