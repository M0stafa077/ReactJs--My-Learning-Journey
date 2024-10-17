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
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const RED_MARKER_ICON_URL =
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png";
const redIcon = L.icon({
    iconUrl: RED_MARKER_ICON_URL,
    iconSize: [25, 41], // size of the icon
    iconAnchor: [12.5, 41], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -41], // point from which the popup should open relative to the iconAnchor
    shadowUrl: iconShadow, // default shadow
    shadowSize: [41, 41], // size of the shadow
    shadowAnchor: [12.5, 41], // anchor point of the shadow
});
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
                        icon={redIcon}
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
