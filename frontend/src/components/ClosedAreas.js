import React from "react";
import { Polygon } from "react-leaflet";
import "./ClosedAreas.css";

const ClosedAreas = ({ closedAreas, handleDeleteArea }) => {
    return (
        <>
            {closedAreas.map((area) => {
                const closedCoordinates = [...area.coordinates, area.coordinates[0]];
                return (
                    <div key={area._id} className="closed-area-container">
                        <Polygon positions={closedCoordinates} color="red" />
                        <button className="delete-button" onClick={() => handleDeleteArea(area._id)}>
                            Delete
                        </button>
                    </div>
                );
            })}
        </>
    );
};

export default ClosedAreas;