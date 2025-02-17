import axios from "axios";
import { toast } from "react-toastify";
import { getDistance } from "geolib";
import {api} from "./api"

export const fetchRoute = async (start, end, setRouteCoords, setTravelTime, setDirections) => {
    try {
        if (!start || !end || start.length !== 2 || end.length !== 2) {
            toast.error("Invalid coordinates.");
            return;
        }

        // Validate distance using geolib
        const distance = getDistance(
            { latitude: start[0], longitude: start[1] },
            { latitude: end[0], longitude: end[1] }
        );

        // Check if the distance exceeds the API limit (6,000,000 meters)
        if (distance > 6000000) {
            toast.error("The distance between start and end points is too large (maximum 6,000 km).");
            return;
        }

        // Swap [lat, lng] to [lng, lat]
        const formattedStart = `${start[1]},${start[0]}`;
        const formattedEnd = `${end[1]},${end[0]}`;

        const response = await axios.get(`${api}/api/areas/route?start=${formattedStart}&end=${formattedEnd}`);

        const route = response.data.features[0];
        const coords = route.geometry.coordinates.map(coord => [coord[1], coord[0]]);
        setRouteCoords(coords);

        setTravelTime(route.properties.segments[0].duration); // Duration in seconds
        setDirections(route.properties.segments[0].steps.map(step => step.instruction));
    } catch (error) {
        console.error("Error fetching route:", error);
        if (error.response) {
            toast.error(`Failed to fetch route: ${error.response.data.error}`);
        } else {
            toast.error("Failed to fetch route. Please try again.");
        }
    }
};