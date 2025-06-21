import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section">
                    <h3 className="footer-title">Killah Cassidy</h3>
                    <p className="footer-description">
                        Your ultimate destination for tracking cannabis dispensaries and merchandise across the globe.
                    </p>
                    <div className="social-links">
                        <a href="https://facebook.com" className="social-link" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-facebook"></i>
                        </a>
                        <a href="https://instagram.com" className="social-link" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a href="https://twitter.com" className="social-link" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="https://youtube.com" className="social-link" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-youtube"></i>
                        </a>
                    </div>
                </div>

                <div className="footer-section">
                    <h4 className="footer-heading">Navigation</h4>
                    <ul className="footer-nav">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/locations">Locations</Link></li>
                        <li><Link to="/merchandise">Merchandise</Link></li>
                        <li><Link to="/admin">Admin</Link></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4 className="footer-heading">Services</h4>
                    <ul className="footer-nav">
                        <li><Link to="/locations">QR Code System</Link></li>
                        <li><Link to="/locations">Location Tracking</Link></li>
                        <li><Link to="/locations">Prize Codes</Link></li>
                        <li><Link to="/locations">Community Reviews</Link></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4 className="footer-heading">Contact Info</h4>
                    <div className="contact-info">
                        <div className="contact-item">
                            <i className="fas fa-envelope"></i>
                            <span>info@killahcassidy.com</span>
                        </div>
                        <div className="contact-item">
                            <i className="fas fa-phone"></i>
                            <span>(555) 123-4567</span>
                        </div>
                        <div className="contact-item">
                            <i className="fas fa-map-marker-alt"></i>
                            <span>Global Network</span>
                        </div>
                        <div className="contact-item">
                            <i className="fas fa-clock"></i>
                            <span>24/7 Support</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="footer-bottom-container">
                    <p className="copyright">
                        © 2024 Killah Cassidy. All rights reserved.
                    </p>
                    <div className="footer-links">
                        <Link to="/privacy">Privacy Policy</Link>
                        <Link to="/terms">Terms of Service</Link>
                        <Link to="/cookies">Cookie Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 