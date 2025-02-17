import React from "react";
import "./RouteInfo.css";

const RouteInfo = ({ travelTime, directions }) => {
    return (
        <div className="route-info-container">
            <h3>Route Information</h3>
            {travelTime && <p>Estimated Travel Time: {(travelTime / 60).toFixed(2)} minutes</p>}
            {directions.length > 0 && (
                <div>
                    <h4>Directions:</h4>
                    <ul>
                        {directions.map((step, index) => (
                            <li key={index}>{step}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default RouteInfo;