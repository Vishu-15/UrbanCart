import React, { useEffect, useState} from "react";
import toast from 'react-hot-toast';
import { Link } from "react-router-dom";
import styles from "./Profile.module.css"; // Importing CSS module
import axios from "axios"; // Axios to fetch user data from backend
import Layout from "../../components/Layout/Layout";
import ProfilePic from "../../assets/images/profile-pic1.jpg";
import Loader from "../../components/Loader/Loader";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [editing, setEditing] = useState(false);
  const [updatedData, setUpdatedData] = useState({
    name: "",
    email: "",
    address: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },
    phoneNumber: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/getUser") // Fetch user data
      .then((response) => {
        const user = response.data.user;
        setUserData(user);
        setUpdatedData({
          name: user.name || "",
          email: user.email || "",
          phoneNumber: user.phoneNumber || "",
          address: {
            street: user.address?.street || "",
            city: user.address?.city || "",
            state: user.address?.state || "",
            postalCode: user.address?.postalCode || "",
            country: user.address?.country || "",
          },
        });
      })
      .catch((error) => {
        console.error("Error fetching user data", error);
      });
  }, []);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({
      ...prevData,
      address: { ...prevData.address, [name]: value },
    }));
  };

  const handleSaveChanges = () => {
    axios
      .put("http://localhost:3000/api/editUser", updatedData)
      .then((response) => {
        toast('Profile Updated!');
        setUserData(response.data.user);
        setEditing(false);
      })
      .catch((error) => {
        console.error("Error saving user data", error);
        toast('Failed to Update Profile!');
      });
  };

  if (!userData) {
    return (
      <Loader/>
    );
  }

  return (
    <Layout title="UrbanCart-Profile">
      <div className={styles.profilePage}>
        {/* Profile Header */}
        <div className={styles.profileHeader}>
          <div className={styles.profilePic}>
            <img src={userData.profilePic || ProfilePic} alt="Profile" />
          </div>
          <div className={styles.profileInfo}>
            <h2>{userData.name}</h2>
            <p>{userData.email}</p>
          </div>
        </div>

        {/* Profile Information */}
        <div className={styles.profileDetails}>
          <h3>Profile Information</h3>
          <div className={styles.details}>
            <div className={styles.infoItem}>
              <label>Name</label>
              {editing ? (
                <input
                  type="text"
                  name="name"
                  value={updatedData.name || ""}
                  onChange={handleEditChange}
                />
              ) : (
                <p>{userData.name || "N/A"}</p>
              )}
            </div>
            <div className={styles.infoItem}>
              <label>Email</label>
              {editing ? (
                <input
                  type="email"
                  name="email"
                  value={updatedData.email || ""}
                  onChange={handleEditChange}
                />
              ) : (
                <p>{userData.email || "N/A"}</p>
              )}
            </div>
            <div className={styles.infoItem}>
              <label>Phone Number</label>
              {editing ? (
                <input
                  type="text"
                  name="phoneNumber"
                  value={updatedData.phoneNumber || ""}
                  onChange={handleEditChange}
                />
              ) : (
                <p>{userData.phoneNumber || "N/A"}</p>
              )}
            </div>

            {/* Address Fields */}
            <div className={styles.infoItem}>
              <label>Street</label>
              {editing ? (
                <input
                  type="text"
                  name="street"
                  value={updatedData.address.street || ""}
                  onChange={handleAddressChange}
                />
              ) : (
                <p>{userData.address?.street || "N/A"}</p>
              )}
            </div>
            <div className={styles.infoItem}>
              <label>City</label>
              {editing ? (
                <input
                  type="text"
                  name="city"
                  value={updatedData.address.city || ""}
                  onChange={handleAddressChange}
                />
              ) : (
                <p>{userData.address?.city || "N/A"}</p>
              )}
            </div>
            <div className={styles.infoItem}>
              <label>State</label>
              {editing ? (
                <input
                  type="text"
                  name="state"
                  value={updatedData.address.state || ""}
                  onChange={handleAddressChange}
                />
              ) : (
                <p>{userData.address?.state || "N/A"}</p>
              )}
            </div>
            <div className={styles.infoItem}>
              <label>Postal Code</label>
              {editing ? (
                <input
                  type="text"
                  name="postalCode"
                  value={updatedData.address.postalCode || ""}
                  onChange={handleAddressChange}
                />
              ) : (
                <p>{userData.address?.postalCode || "N/A"}</p>
              )}
            </div>
            <div className={styles.infoItem}>
              <label>Country</label>
              {editing ? (
                <input
                  type="text"
                  name="country"
                  value={updatedData.address.country || ""}
                  onChange={handleAddressChange}
                />
              ) : (
                <p>{userData.address?.country || "N/A"}</p>
              )}
            </div>
          </div>

          <button
            className={styles.editButton}
            onClick={editing ? handleSaveChanges : () => setEditing(true)}
          >
            {editing ? "Save Changes" : "Edit Profile"}
          </button>
        </div>

        {/* Buttons for My Orders and My Wishlist */}
        <div className={styles.actions}>
          <Link to="/my-orders">
            <button className={styles.actionButton}>My Orders</button>
          </Link>
          <Link to="/wishlist">
            <button className={styles.actionButton}>My Wishlist</button>
          </Link>

          {/* Admin Panel Button (Only for Admins) */}
          {userData.role === "admin" && (
            <Link to="/admin-panel">
              <button className={styles.adminButton}>Admin Panel</button>
            </Link>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
