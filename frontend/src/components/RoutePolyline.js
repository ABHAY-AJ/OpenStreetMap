import React from "react";
import { Polyline } from "react-leaflet";

const RoutePolyline = ({ routeCoords }) => {
    return routeCoords.length > 0 && <Polyline positions={routeCoords} color="blue" />;
};

export default RoutePolyline;