import axios from "axios";
import { toast } from "react-toastify";
import {api} from "./api"

export const fetchClosedAreas = async (setClosedAreas) => {
    try {
        const response = await axios.get(`${api}/api/areas`);
        setClosedAreas(response.data);
    } catch (error) {
        console.error("Error fetching closed areas:", error);
    }
};

export const handleDeleteArea = async (id, fetchClosedAreas) => {
    try {
        await axios.delete(`${api}/api/areas/${id}`);
        toast.success("Area deleted successfully!");
        fetchClosedAreas(); // Refresh the list of closed areas
    } catch (error) {
        toast.error("Failed to delete area.");
        console.error("Error deleting area:", error);
    }
};