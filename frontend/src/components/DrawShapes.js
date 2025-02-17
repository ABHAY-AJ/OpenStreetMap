import React, { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-draw";
import "leaflet-draw/dist/leaflet.draw.css";
import axios from "axios";
import { toast } from "react-toastify";
import { api } from "../services/api";

const DrawShapes = ({ onAreaSave }) => {
    const map = useMap();

    useEffect(() => {
        const drawnItems = new L.FeatureGroup();
        map.addLayer(drawnItems);

        const drawControl = new L.Control.Draw({
            edit: false, // Disable edit and delete buttons
            draw: {
                polygon: true,
                rectangle: false,
                circle: false,
                marker: false,
                polyline: false,
                circlemarker: false,
            },
        });

        map.addControl(drawControl);

        // Handle shape creation
        const handleDrawCreated = async (e) => {
            const layer = e.layer;
            const latlngs = layer.getLatLngs()[0];

            // Validate polygon
            if (latlngs.length < 3) {
                toast.error("A polygon must have at least 3 points.");
                return;
            }

            drawnItems.addLayer(layer);

            const coordinates = latlngs.map(({ lat, lng }) => [lat, lng]);
            try {
                await axios.post(`${api}/api/areas`, { name: "Custom Area", coordinates });
                toast.success("Area saved successfully!");
                onAreaSave();
            } catch (error) {
                toast.error("Failed to save area.");
                console.error("Error saving area:", error);
            }
        };

        // Add event listener
        map.on(L.Draw.Event.CREATED, handleDrawCreated);

        // Cleanup function
        return () => {
            map.off(L.Draw.Event.CREATED, handleDrawCreated); // Remove event listener
            map.removeControl(drawControl); // Remove draw control
            map.removeLayer(drawnItems); // Remove drawn items layer
        };
    }, [map, onAreaSave]);

    return null;
};

export default DrawShapes;