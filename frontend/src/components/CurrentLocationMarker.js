import React from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Define the custom icon for the current location
const currentLocationIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/535/535137.png", // URL of the icon
    iconSize: [25, 25], // Size of the icon
    iconAnchor: [12, 25], // Point of the icon that corresponds to the marker's location
    popupAnchor: [0, -25], // Point from which the popup should open relative to the iconAnchor
});

const CurrentLocationMarker = ({ position }) => {
    return (
        <Marker position={position} icon={currentLocationIcon}>
            <Popup>Your Current Location</Popup>
        </Marker>
    );
};

export default CurrentLocationMarker;