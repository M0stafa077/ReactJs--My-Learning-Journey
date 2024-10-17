import { useNavigate } from "react-router-dom";
import Map from "../components/Map";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../contexts/authenticationContext";
import styles from "./AppLayout.module.css";
import { useEffect } from "react";

export default function AppLayout() {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) navigate("/login");
    }, [isAuthenticated]);
    return (
        <div className={styles.app}>
            <Sidebar />
            <Map />
        </div>
    );
}
