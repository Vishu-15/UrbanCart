import React from "react";
import { Link } from "react-router-dom";
import styles from "./NotFound.module.css"; // ✅ Correct import for CSS Modules
import Layout from "../../components/Layout/Layout";

const NotFound = () => {
  return (
    <Layout>
        <div className={styles.notFound}> {/* ✅ Use styles.className */}
        <h1>404 Not Found</h1>
        <p>Oops! The page you're looking for doesn't exist.</p>
        <Link to="/">Go Back Home</Link>
        </div>
    </Layout>
  );
};

export default NotFound;
