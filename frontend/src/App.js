import React from "react";
import MapComponent from "./components/MapComponent";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
    return (
        <div>
            <h1>OpenStreetMap MERN App</h1>
            <MapComponent />
            <ToastContainer />
        </div>
    );
}

export default App;