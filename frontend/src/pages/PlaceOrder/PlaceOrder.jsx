import axios from 'axios';
import React, { useEffect, useState } from "react";
import './PlaceOrder.css';
import { load } from "@cashfreepayments/cashfree-js";
import Layout from '../../components/Layout/Layout';
import toast from 'react-hot-toast';
import Loader from '../../components/Loader/Loader';

const PlaceOrder = () => {

    let cashfree;
    // Initialize SDK
    const initializeSDK = async () => {
        cashfree = await load({
            mode: "sandbox"
        });
    };
    initializeSDK();

    const doPayment = async () => {
        if(formData.name=="" || formData.street=="" || formData.city=="" || formData.state=="" || formData.postalCode=="" || formData.country=="" || formData.phoneNumber=="" || formData.email==""){
            alert("Enter the Billing details !");
            return ;
        }
        try {
            let res = await axios.post("https://urbancart-backend-5jg9.onrender.com/api/createOrder",formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log("Order created:", res);

            let checkoutOptions = {
                paymentSessionId: res.data.payment_session_id,
                redirectTarget: "_modal", 
            };

            cashfree.checkout(checkoutOptions).then((result) => {
                if(result.error){
                    // This will be true whenever user clicks on close icon inside the modal or any error happens during the payment
                    console.log("User has closed the popup or there is some payment error, Check for Payment Status");
                    console.log(result.error);
                }
                if(result.redirect){
                    // This will be true when the payment redirection page couldnt be opened in the same window
                    // This is an exceptional case only when the page is opened inside an inAppBrowser
                    // In this case the customer will be redirected to return url once payment is completed
                    console.log("Payment will be redirected");
                }
                if(result.paymentDetails){
                    // This will be called whenever the payment is completed irrespective of transaction status
                    console.log("Payment has been completed, Check for Payment Status");
                    console.log(result.paymentDetails.paymentMessage);
                }
                verifyPayment(res.data.order_id);
            });

        } catch (err) {
            console.error("Error during payment initialization:", err);
        }
    };

    // Payment verification
    const verifyPayment = async (orderId) => {
        try {
            let res = await axios.get(`https://urbancart-backend-5jg9.onrender.com/api/verifyPayment?orderId=${orderId}`);
            if (res && res.data && res.data.length) {
                if(res.data[0].payment_status=='SUCCESS'){
                    toast("Payment Successful , Order Placed!");
                    window.location.href="http://localhost:5173";
                }
                else{
                    toast("Payment failed");
                }
            } else {
                toast("Payment aborted");
            }
        } catch (err) {
            console.error("Error verifying payment:", err);
            toast('Some error occured!')
        }
    };

    const [formData, setFormData] = useState({
        name: "",
        street: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
        phoneNumber: "",
        email: "",
        paymentMethod: "cod",
    });
    const [cartItems,setCartItems] = useState([]);
    
    async function getUser(){
        try{
            let res = await axios.get("https://urbancart-backend-5jg9.onrender.com/api/getUser");
            let user = res.data.user;
            setCartItems(user.cart);
            setFormData({
                name: user.name ?? "",
                street: user.address?.street ?? "",
                city: user.address?.city ?? "",
                state: user.address?.state ?? "",
                postalCode: user.address?.postalCode ?? "",
                country: user.address?.country ?? "",
                phoneNumber: user.phoneNumber ?? "",
                email: user.email ?? "",
                paymentMethod: "cod",
            });
        }
        catch(e){
            console.log(e);
        }
    }

    useEffect(()=>{
        getUser();
    },[]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

        if(cartItems.length==0){
            return(
                <Loader/>
            )
        }
        
        return (
            <Layout title="UrbanCarts-Place Order">
            <div className="checkout-container">
                <div className="billing-details">
                    <h2>Billing Details</h2>
                    <form 
                        id="orderForm"
                        onSubmit={(e) => {
                            e.preventDefault(); 
                            doPayment(); 
                        }}
                    >
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        />
                    <input
                        type="text"
                        name="street"
                        placeholder="Street"
                        value={formData.street}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="text"
                        name="state"
                        placeholder="State"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="text"
                        name="postalCode"
                        placeholder="Postal Code"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="text"
                        name="country"
                        placeholder="Country"
                        value={formData.country}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="text"
                        name="phoneNumber"
                        placeholder="Phone Number"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                    </form>
                </div>
            
                <div className="order-summary">
                    <h2>Order Summary</h2>
                    {cartItems.map((item)=>{
                        return(
                            <div className="order-item">
                                <div className="order-product">
                                    <img src={item.productId.images[0]} alt="LCD Monitor" />
                                    <div className="product-details">
                                        <span>{item.productId.title}</span>
                                        <span className="product-quantity"> ( X{item.quantity} )</span>
                                    </div>
                                </div>
                                <span>{item.productId.price*item.quantity}</span>
                            </div>
                        ) 
                    })}
                    <div className="order-summary-total">
                    <span>Subtotal</span>
                    <span>
                    {
                            cartItems.reduce((sum,item)=>{
                                return sum+(parseFloat(item.productId.price)*(item.quantity));
                            },0).toFixed(2)
                    }
                    </span>
                    </div>
                    <div className="order-summary-total">
                    <span>Shipping</span>
                    <span>Free</span>
                    </div>
                    <div className="order-summary-total">
                    <span>Total</span>
                    <span>
                    {
                            cartItems.reduce((sum,item)=>{
                                return sum+(parseFloat(item.productId.price)*(item.quantity));
                            },0).toFixed(2)
                    }
                    </span>
                    </div>
                    <div className="payment-options">
                    <label>
                        <input
                        type="radio"
                        name="paymentMethod"
                        value="bank"
                        checked={formData.paymentMethod === "bank"}
                        onChange={handleInputChange}
                        />
                        Bank
                    </label>
                    <label>
                        <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={formData.paymentMethod === "cod"}
                        onChange={handleInputChange}
                        />
                        Cash on delivery
                    </label>
                    </div>
                    <button className="place-order-btn" type="submit" form="orderForm">
                    Place Order
                    </button>
                </div>
        </div>
        </Layout>
      );
};

export default PlaceOrder;
