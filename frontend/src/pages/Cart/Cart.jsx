import React, { useState, useEffect } from "react";
import "./Cart.css";
import Layout from "../../components/Layout/Layout";
import CartItem from "../../components/CartItem/CartItem";
import axios from "axios";
import { useUser } from "../../context/user";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Cart = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [user, setUser] = useUser();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        async function fetchCart() {
            try {
                let res = await axios.get("https://urbancart-backend-5jg9.onrender.com/api/getUser");
                setCartItems(res.data.user.cart);
            } catch (e) {
                if (e.response.data.message === "Unauthorized") {
                    navigate('/login');
                    toast("User not logged in");
                }
            }
        }
        fetchCart();

        // Update isMobile state when window resizes
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    async function handlePlaceOrder() {
        navigate('/placeOrder');
    }

    if (!cartItems || !cartItems.length) {
        return (
            <Layout>
                <div className="empty-cart-message">🛒 Seems so light! Your cart is empty.</div>
            </Layout>
        );
    }

    return (
        <Layout title="UrbanCarts-Cart">
            <div className="carts-page">
                {/* Table for Cart Items */}
                <div className="cart-table-wrapper">
                    <table className="cart-table">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                {!isMobile && <th>Subtotal</th>} {/* Hide Subtotal on Mobile */}
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item) => (
                                <CartItem key={item.productId._id} item={item} isMobile={isMobile} />
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Return to Shop Button */}
                <button className="return-shop" onClick={()=>{navigate("/products")}}>Return to Shop</button>

                {/* Order Summary */}
                <div className="carts-items-bill">
                    <div className="bill-heading">Cart Total</div>
                    <div className="bill-subtotal">
                        <div className="bill-title">Subtotal:</div>
                        <div className="bill-price">
                            Rs.{cartItems.reduce((sum, currItem) => sum + parseFloat(currItem.productId.price) * currItem.quantity, 0).toFixed(2)}
                        </div>
                    </div>
                    <hr className="bill-hr" />
                    <div className="bill-shipping-charges">
                        <div className="bill-title">Shipping Charges:</div>
                        <div className="bill-price">Rs. 0</div>
                    </div>
                    <hr className="bill-hr" />
                    <div className="bill-total">
                        <div className="bill-title">Total:</div>
                        <div className="bill-price">
                            Rs.{cartItems.reduce((sum, currItem) => sum + parseFloat(currItem.productId.price) * currItem.quantity, 0).toFixed(2)}
                        </div>
                    </div>
                    <button className="place-order" onClick={handlePlaceOrder}>
                        Place Order
                    </button>
                </div>
            </div>
        </Layout>
    );
};

export default Cart;
