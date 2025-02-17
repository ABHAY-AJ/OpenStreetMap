import React from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Define the custom icon for the destination
const destinationIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png", // URL of the icon
    iconSize: [25, 25], // Size of the icon
    iconAnchor: [12, 25], // Point of the icon that corresponds to the marker's location
    popupAnchor: [0, -25], // Point from which the popup should open relative to the iconAnchor
});

const DestinationMarker = ({ destination, setDestination }) => {
    return (
        <Marker
            position={destination}
            icon={destinationIcon}
            draggable={true}
            eventHandlers={{
                dragend: (e) => setDestination([e.target.getLatLng().lat, e.target.getLatLng().lng]),
            }}
        >
            <Popup>Destination</Popup>
        </Marker>
    );
};

export default DestinationMarker;