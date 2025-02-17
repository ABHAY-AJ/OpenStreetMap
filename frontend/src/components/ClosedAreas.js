import React from "react";
import { Polygon } from "react-leaflet"; // Use Polygon instead of Polyline

const ClosedAreas = ({ closedAreas, handleDeleteArea }) => {
    return (
        <>
            {closedAreas.map((area) => {
                console.log("Rendering area with coordinates:", area.coordinates); // Debugging

                // Ensure the coordinates form a closed loop
                const closedCoordinates = [...area.coordinates, area.coordinates[0]];

                return (
                    <div key={area._id}>
                        <Polygon positions={closedCoordinates} color="red" />
                        <button onClick={() => handleDeleteArea(area._id)}>Delete</button>
                    </div>
                );
            })}
        </>
    );
};

export default ClosedAreas;