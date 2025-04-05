import axios from 'axios';
import React, { useState, useEffect } from 'react';
import styles from './AdminPanel.module.css';
import Layout from '../../components/Layout/Layout';

const AdminPanel = () => {
    const [activeTab, setActiveTab] = useState('Users');
    const [content, setContent] = useState([]);

    const handleChangeTab = async (tab) => {
        setActiveTab(tab);
        try {
            let endpoint = tab === 'Users' ? "allUsers" : tab === 'Products' ? "allProducts" : "allOrders";
            let response = await axios.get(`https://urbancart-backend-5jg9.onrender.com/api/${endpoint}`);
            setContent(response.data);
        } catch (error) {
            console.error(`Failed to fetch ${tab}:`, error);
            setContent([]);
        }
    };

    useEffect(() => {
        handleChangeTab(activeTab);
    }, []);

    return (
        <Layout>
            <div className={styles.adminContainer}>
                {/* Sidebar */}
                <div className={styles.sidebar}>
                    <h2>Admin Panel</h2>
                    <ul>
                        {["Users", "Products", "Orders"].map((tab) => (
                            <li key={tab} className={activeTab === tab ? styles.active : ""} onClick={() => handleChangeTab(tab)}>
                                {tab}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Main Content */}
                <div className={styles.mainContent}>
                    <h2>{activeTab}</h2>
                    {content.length === 0 ? (
                        <p>No {activeTab.toLowerCase()} found.</p>
                    ) : (
                        <div className={styles.contentGrid}>
                            {content.map((item, index) => (
                                <div key={index} className={styles.card}>
                                    {activeTab === "Users" && (
                                        <>
                                            <p><strong>Name:</strong> {item.name}</p>
                                            <p><strong>Role:</strong> {item.role}</p>
                                            <p><strong>Email:</strong> {item.email}</p>
                                            <p><strong>Phone:</strong> {item.phoneNumber || "N/A"}</p>
                                        </>
                                    )}
                                    {activeTab === "Products" && (
                                        <>
                                            {item.images && item.images.length > 0 ? (
                                                <img src={item.images[0]} alt={item.title} className={styles.productImage} />
                                            ) : (
                                                <p>No Image Available</p>
                                            )}
                                            <p><strong>Title:</strong> {item.title}</p>
                                            <p><strong>Price:</strong> ${item.price}</p>
                                        </>
                                    )}
                                    {activeTab === "Orders" && (
                                        <>
                                            <p><strong>Order ID:</strong> {item._id}</p>
                                            <p><strong>User:</strong> {item.user?.name || "Unknown"}</p>
                                            <p><strong>Address:</strong> {`${item.user?.address?.street}, ${item.user?.address?.city}, ${item.user?.address?.state}, ${item.user?.address?.country} - ${item.user?.address?.postalCode}`|| "Unknown"}</p>
                                            <p><strong>Date:</strong> {new Date(item.orderedAt).toLocaleString()}</p>
                                            <p><strong>Items:</strong></p>
                                            {item.items && item.items.length > 0 ? (
                                                <ul>
                                                    {item.items.map((orderItem, i) => (
                                                        <li key={i}>
                                                            {orderItem.productId?.title || "Unknown Product"} - {orderItem.quantity} pcs
                                                            ({orderItem.productId?.price*orderItem.quantity})
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <p>No items in this order</p>
                                            )}
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default AdminPanel;
