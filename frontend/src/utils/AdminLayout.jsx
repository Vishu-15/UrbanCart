import { Outlet, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader/Loader";

const AdminLayout = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const storedUser=localStorage.getItem('urbancart-user');

    useEffect(() => {
        axios.get("https://urbancart-backend-5jg9.onrender.com/api/getUser")
            .then(response => {
                setUser(response.data.user);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching user data", error);
                setLoading(false);
            });
    }, []);

    if (loading) return <Loader/>;

    return user && user.email==storedUser && user.role === "admin" ? <Outlet /> : <Navigate to="/" />;
};

export default AdminLayout;
