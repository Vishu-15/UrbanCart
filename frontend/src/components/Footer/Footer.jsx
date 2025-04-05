import './Footer.css'

export default function Footer(){
    return (
        <div className="footer">
            <div className="footer-content">
                <div className="footer-brand footer-cols">
                    <div className="brand-name">UrbanCarts</div>
                    <div className="subscribe">Subscribe</div>
                    <div>Get 10% off on your first order</div>
                    <div className="mail">
                        <input type="text" placeholder="Enter your email" />
                        <button>Send</button>
                    </div>
                </div>
                <div className="supports footer-cols">
                    <div className="heading">Support</div>
                    <div>Kaikhali,Kolkata,West Bengal,India</div>
                    <div>urbancart@gmail.com</div>
                    <div>+7777-8888-9999</div>
                </div>
                <div className="accounts footer-cols">
                    <div className="heading">Account</div>
                    <div>My Account</div>
                    <div>Login/Sign Up</div>
                    <div>Cart</div>
                    <div>Wishlist</div>
                    <div>Shop</div>
                </div>
                <div className="quick-links footer-cols">
                    <div className="heading">Quick Links</div>
                    <div>Privacy Policy</div>
                    <div>Term and Conditions</div>
                    <div>FAQ</div>
                    <div>Contact</div>
                </div>
                <div className="app-download footer-cols">
                    <div className="heading">Download App</div>
                    <div className="app-offer">Save $3 with App (For New Users Only)</div>
                    <div className="app-qr"></div>
                    <div className="socials">
                        <div>a</div>
                        <div>b</div>
                        <div>c</div>
                        <div>d</div>
                    </div>
                </div>
            </div>
        </div>
    )
}