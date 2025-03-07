import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import CurrentLocationMarker from "./CurrentLocationMarker";
import DestinationMarker from "./DestinationMarker";
import RoutePolyline from "./RoutePolyline";
import DrawShapes from "./DrawShapes";
import ClosedAreas from "./ClosedAreas";
import RouteInfo from "./RouteInfo";
import { fetchClosedAreas, handleDeleteArea } from "../services/areaService";
import { fetchRoute } from "../services/routeService";

const MapComponent = () => {
    const [position, setPosition] = useState([12.9716, 77.5946]); // Default location
    const [destination, setDestination] = useState([19.0760, 72.8777]); // Static destination
    const [routeCoords, setRouteCoords] = useState([]);
    const [travelTime, setTravelTime] = useState(null);
    const [directions, setDirections] = useState([]);
    const [closedAreas, setClosedAreas] = useState([]);

    useEffect(() => {
        const watchId = navigator.geolocation.watchPosition(
            (pos) => {
                const newPosition = [pos.coords.latitude, pos.coords.longitude];
                setPosition(newPosition);
                fetchRoute(newPosition, destination, setRouteCoords, setTravelTime, setDirections);
            },
            (error) => {
                console.error("Error getting location:", error);
            },
            { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
        );

        // Cleanup
        return () => navigator.geolocation.clearWatch(watchId);
    }, [destination]);

    useEffect(() => {
        fetchClosedAreas(setClosedAreas);
    }, []);

    const handleDelete = async (id) => {
        await handleDeleteArea(id, () => fetchClosedAreas(setClosedAreas));
    };

    return (
        <div style={{ display: "flex" }}>
            <RouteInfo travelTime={travelTime} directions={directions} />
            <MapContainer
                center={position}
                zoom={13}
                style={{ height: "90vh", width: "75%" }}
                onClick={(e) => setDestination([e.latlng.lat, e.latlng.lng])}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <CurrentLocationMarker position={position} />
                <DestinationMarker destination={destination} setDestination={setDestination} />
                <RoutePolyline routeCoords={routeCoords} />
                <DrawShapes onAreaSave={() => fetchClosedAreas(setClosedAreas)} />
                <ClosedAreas closedAreas={closedAreas} handleDeleteArea={handleDelete} />
            </MapContainer>
        </div>
    );
};

export default MapComponent;