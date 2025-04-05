import { useState, useEffect } from "react";
import styles from "./MyOrders.module.css";
import axios from "axios";
import Layout from "../../components/Layout/Layout";
import HashLoader from "react-spinners/HashLoader";

const override = {
    display: "block",
    margin: "15vw auto",
    borderColor: "black",
};

export default function MyOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/getUser");
                console.log(response);
                setOrders(response.data.user.orders);
            } catch (err) {
                setError("Failed to fetch orders");
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    return (
        <Layout>
            <div className={styles.ordersContainer}>
                <h2 className={styles.ordersTitle}>My Orders</h2>
                {loading ? (
                    <div className="loader">
                      <HashLoader
                        color='black'
                        loading='true'
                        cssOverride={override}
                        size={50}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    /></div>
                ) : error ? (
                    <p className={styles.error}>{error}</p>
                ) : orders.length === 0 ? (
                    <p className={styles.noOrders}>You have no orders yet.</p>
                ) : (
                    <div>
                        {orders.map((order) => (
                            <div key={order._id} className={styles.orderSection}>
                                <div className={styles.orderDate}>
                                    <strong>Ordered on:</strong> {new Date(order.date).toLocaleDateString()}
                                </div>
                                <div className={styles.orderItems}>
                                    {order.orderId.items.map((item) => (
                                        <div key={item.productId._id} className={styles.orderItem}>
                                            <img src={item.productId.images[0]} alt={item.productId.title} className={styles.productImage} />
                                            <div className={styles.itemDetails}>
                                                <div className={styles.productTitle}>{item.productId.title}</div>
                                                <div className={styles.productPrice}>${(item.productId.price*item.quantity).toFixed(2)}</div>
                                                <div className={styles.productRating}>Rating: {item.productId.rating} ⭐</div>
                                                <div className={styles.productQuantity}>Quantity: {item.quantity}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    );
}
