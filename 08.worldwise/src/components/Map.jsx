import { useNavigate, useSearchParams } from "react-router-dom";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMap,
    useMapEvents,
} from "react-leaflet";

import styles from "./Map.module.css";
import { useCities } from "../contexts/CitiesContext";
import { useEffect, useState } from "react";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button";

export default function Map() {
    const { cities } = useCities();
    const [mapPosition, setMapPosition] = useState([40, 0]);
    const {
        position: geolocationPosition,
        getPosition,
        isLoading: isLoadingPosition,
    } = useGeolocation();
    const [searchParams] = useSearchParams();
    const mapLat = searchParams.get("lat");
    const mapLng = searchParams.get("lng");

    useEffect(() => {
        if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    }, [mapLat, mapLng]);

    useEffect(() => {
        if (geolocationPosition)
            setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
    }, [geolocationPosition]);

    return (
        <div className={styles.mapContainer}>
            {!geolocationPosition && (
                <Button type="position" onClick={getPosition}>
                    {isLoadingPosition ? "Loading..." : "Use your location"}
                </Button>
            )}
            <MapContainer
                center={mapPosition}
                zoom={7}
                scrollWheelZoom={true}
                className={styles.map}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />
                {cities.map((city) => (
                    <Marker
                        position={[city.position.lat, city.position.lng]}
                        key={city.id}
                    >
                        <Popup>
                            <span>{city.emoji}</span>{" "}
                            <span>{city.cityName}</span>
                        </Popup>
                    </Marker>
                ))}
                <ChangeMapCenter position={mapPosition} />
                {geolocationPosition && (
                    <Marker
                        position={[
                            geolocationPosition.lat,
                            geolocationPosition.lng,
                        ]}
                    ></Marker>
                )}
                <DetectClick />
            </MapContainer>
        </div>
    );
}

function ChangeMapCenter({ position }) {
    const map = useMap();
    map.setView(position);
    return null;
}

function DetectClick() {
    const navigate = useNavigate();
    const map = useMap();
    useMapEvents({
        click: (e) => {
            const { lat, lng } = e.latlng;
            navigate(`form?lat=${lat}&lng=${lng}`);
            map.setView([lat, lng], 7);
        },
    });
    return null;
}
