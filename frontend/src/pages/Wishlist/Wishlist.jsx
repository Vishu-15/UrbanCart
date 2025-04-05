import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Product from "../../components/Product/Product";
import styles from "./Wishlist.module.css";
import Loader from "../../components/Loader/Loader";

const Wishlist = () => {
    const navigate = useNavigate();
    const [wishlist, setWishlist] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(null); // Start as null to avoid incorrect redirection

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const userData = localStorage.getItem("urbancart-user");
                if (userData) {
                    setIsLoggedIn(true); // Set user as logged in before making API call
                    let response = await axios.get("http://localhost:3000/api/getUser");
                    if (response.data?.user?.wishlist) {
                        setWishlist(response.data.user.wishlist);
                    } else {
                        setWishlist([]); // Empty wishlist if no data found
                    }
                } else {
                    setIsLoggedIn(false);
                }
            } catch (e) {
                console.log("Error loading wishlist", e);
                setIsLoggedIn(false); // Handle errors gracefully
            }
        };

        fetchWishlist();
    }, []); // Run only on mount

    useEffect(() => {
        if (isLoggedIn === false) {
            navigate("/login");
        }
    }, [isLoggedIn, navigate]); // Run only when `isLoggedIn` updates

    if (isLoggedIn === null) {
        return <div>Checking login status...</div>; // Prevent unnecessary redirects
    }

    if (!wishlist) {
        return <Loader/>;
    }

    return (
        <Layout title="Urbancart-Wishlist">
            <div className={styles.wishlist}>
                {
                    wishlist.map((prod)=>{
                        return <Product product={prod} showWishIcon={false}/>
                    })
                }
            </div>
        </Layout>
    );
};

export default Wishlist;
