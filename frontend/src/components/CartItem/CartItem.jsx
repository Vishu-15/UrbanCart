import React from "react";
import "./CartItem.css";
import axios from "axios";
import toast from "react-hot-toast";

const CartItem = ({ item, isMobile }) => {
    const handleRemove = async () => {
        try {
            await axios.get(`https://urbancart-backend-5jg9.onrender.com/api/removeFromCart?prodId=${item.productId._id}`);
            toast("Item Removed from Cart Successfully!");
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (e) {
            toast("Failed to remove item from cart");
        }
    };

    return (
        <tr className="cart-item">
            <td className="cart-item-imgname">
                <button className="remove-btn" onClick={handleRemove}>×</button>
                <img src={item.productId.images[0]} alt={item.productId.name} />
                <span className="cart-item-name">{item.productId.name}</span>
            </td>
            <td className="cart-item-price">Rs. {item.productId.price}</td>
            <td className="cart-item-quantity">{item.quantity}</td>
            {!isMobile && (
                <td className="cart-item-subtotal">
                    Rs. {(item.productId.price * item.quantity).toFixed(2)}
                </td>
            )}
        </tr>
    );
};

export default CartItem;
