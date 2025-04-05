import { useState, useEffect } from 'react';
import './Navbar.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi'; 
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import toast from 'react-hot-toast';

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('urbancart-user'));
    const [isFixed, setIsFixed] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        async function getUserData(){
            const storedUser = localStorage.getItem('urbancart-user');
        
            if (!storedUser) return;
        
            axios.get("https://urbancart-backend-5jg9.onrender.com/api/getUser",{withCredentials: true,})
                .then((response) => {
                    const user = response?.data?.user;
                    if (!user || user.email !== storedUser) {
                        localStorage.removeItem('urbancart-user');
                    }
                    console.log(user);
                })
                .catch((error) => {
                    localStorage.removeItem('urbancart-user');
                    console.error("Error fetching user data:", error);
                });
        }
        getUserData();
    }, []);
    

    // Scroll event listener to fix navbar after scrolling past it
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) { // ✅ Reduced threshold for better UX
                setIsFixed(true);
            } else {
                setIsFixed(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = async () => {
        try {
            let response = await axios.get('https://urbancart-backend-5jg9.onrender.com/api/logout');
            console.log(response.data.message);
            localStorage.removeItem("urbancart-user");
            setIsLoggedIn(false);
            setMenuOpen(false); // Close the menu on logout
            toast('Logged Out Successfully!');
            navigate("/");
        } catch (error) {
            console.error("Logout failed:", error);
            toast("Some error occured!");
        }
    };

    return (
        <nav className={`navbar ${isFixed ? 'fixed-navbar' : ''}`}>
            <div className="nav-items">
                <div className="nav-logo">UrbanCarts</div>

                {/* Hamburger Menu Icon for Mobile */}
                <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
                </div>

                {/* Navigation Links */}
                <div className={menuOpen ? "nav-links nav-links-open" : "nav-links"}>
                    <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Home</NavLink>
                    <NavLink to="/about" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>About</NavLink>
                    <NavLink to="/products" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Products</NavLink>
                    
                    {/* Conditional Logout / Sign Up */}
                    {isLoggedIn ? (
                        <button className="nav-link logout-btn" onClick={handleLogout}>
                        Logout
                    </button>
                    
                    ) : (
                        <NavLink to="/signup" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Sign Up</NavLink>
                    )}

                    {/* Profile and Cart - Only show as text on small screens */}
                    {isLoggedIn && (
                        <div className="profile-cart-text">
                            <NavLink to="/profile" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Profile</NavLink>
                            <NavLink to="/cart" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Cart</NavLink>
                        </div>
                    )}
                </div>

                {/* Search Bar (Hidden on Small Screens) */}
                <div className="search-bar">
                    <input type="text" placeholder="What are you looking for?" />
                    <button>Search</button>
                </div>

                {/* Profile & Cart Icons (Only on Large Screens) */}
                {isLoggedIn && (
                    <div className="nav-icons">
                        <NavLink to="/profile" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                            <AccountCircleIcon style={{ fontSize: '1.8rem' }} />
                        </NavLink>
                        <NavLink to="/cart" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                            <ShoppingCartIcon style={{ fontSize: '1.8rem' }} />
                        </NavLink>
                    </div>
                )}
            </div>
        </nav>
    );
}
