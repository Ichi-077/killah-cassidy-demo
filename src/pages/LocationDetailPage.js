import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../config';

const LocationDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [prizeCode, setPrizeCode] = useState(null);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [review, setReview] = useState({ rating: 5, comment: '' });

    const fetchLocation = useCallback(async () => {
        try {
            const response = await fetch(`${API_ENDPOINTS.LOCATIONS}/${id}`);
            if (!response.ok) {
                throw new Error('Location not found');
            }
            const data = await response.json();
            setLocation(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchLocation();
        checkLoginStatus();
    }, [id, fetchLocation]);

    const checkLoginStatus = () => {
        // Check if user is logged in (you can implement your own auth logic)
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
            setIsLoggedIn(true);
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = formData.get('email');
        // const password = formData.get('password'); // Removed unused variable

        // Simple login simulation - replace with your actual auth logic
        const mockUser = {
            id: 'user123',
            email: email,
            name: email.split('@')[0]
        };

        localStorage.setItem('user', JSON.stringify(mockUser));
        setUser(mockUser);
        setIsLoggedIn(true);
        setShowLoginModal(false);
        generatePrizeCode();
    };

    const handleSignup = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const name = formData.get('name');
        const email = formData.get('email');
        // const password = formData.get('password'); // Removed unused variable

        // Simple signup simulation - replace with your actual auth logic
        const mockUser = {
            id: 'user' + Date.now(),
            email: email,
            name: name
        };

        localStorage.setItem('user', JSON.stringify(mockUser));
        setUser(mockUser);
        setIsLoggedIn(true);
        setShowLoginModal(false);
        generatePrizeCode();
    };

    const generatePrizeCode = async () => {
        try {
            const response = await fetch(`${API_ENDPOINTS.LOCATIONS}/${id}/prize-code`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: user.id,
                    userName: user.name
                })
            });

            if (response.ok) {
                const data = await response.json();
                setPrizeCode(data.code);
            }
        } catch (error) {
            console.error('Error generating prize code:', error);
            // Fallback to local generation
            const code = 'KC' + Math.random().toString(36).substr(2, 8).toUpperCase();
            setPrizeCode(code);
        }
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        try {
            const reviewData = {
                locationId: id,
                userId: user.id,
                userName: user.name,
                rating: review.rating,
                comment: review.comment,
                timestamp: new Date().toISOString()
            };

            // Save review to database (you'll need to implement this endpoint)
            const response = await fetch(API_ENDPOINTS.REVIEWS, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reviewData)
            });

            if (response.ok) {
                setShowReviewModal(false);
                setReview({ rating: 5, comment: '' });
                // Refresh location data to show new review
                fetchLocation();
            }
        } catch (error) {
            console.error('Error submitting review:', error);
        }
    };

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
        setIsLoggedIn(false);
        setPrizeCode(null);
    };

    if (loading) {
        return (
            <div className="location-detail-page">
                <div className="loading">Loading location details...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="location-detail-page">
                <div className="error">Error: {error}</div>
                <button onClick={() => navigate('/locations')} className="back-btn">
                    Back to Locations
                </button>
            </div>
        );
    }

    return (
        <div className="location-detail-page">
            <button onClick={() => navigate('/locations')} className="back-btn">
                ← Back to Locations
            </button>

            {location && (
                <div className="location-detail-content">
                    <div className="location-header">
                        <img src={location.image} alt={location.name} className="location-hero-image" />
                        <div className="location-hero-info">
                            <h1 className="gothic-title">{location.name}</h1>
                            <p className="location-type">{location.type}</p>
                            <p className="location-description">{location.description}</p>
                            <div className="location-rating">
                                ⭐ {location.rating} ({location.reviews} reviews)
                            </div>
                        </div>
                    </div>

                    <div className="location-sections">
                        <div className="location-info-section">
                            <h2>Location Details</h2>
                            <div className="info-grid">
                                <div className="info-item">
                                    <strong>Address:</strong>
                                    <p>{location.address.street}</p>
                                    <p>{location.address.city}, {location.address.state} {location.address.zipCode}</p>
                                </div>
                                <div className="info-item">
                                    <strong>Phone:</strong>
                                    <p>{location.phone}</p>
                                </div>
                                <div className="info-item">
                                    <strong>Website:</strong>
                                    <p><a href={location.website} target="_blank" rel="noopener noreferrer">{location.website}</a></p>
                                </div>
                            </div>
                        </div>

                        <div className="location-hours-section">
                            <h2>Hours of Operation</h2>
                            <div className="hours-grid">
                                {Object.entries(location.hours).map(([day, hours]) => (
                                    <div key={day} className="hour-item">
                                        <span className="day">{day.charAt(0).toUpperCase() + day.slice(1)}:</span>
                                        <span className="time">{hours}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {!isLoggedIn && (
                            <div className="login-prompt-section">
                                <h2>🎁 Get Your Prize!</h2>
                                <p>Sign in or create an account to receive your exclusive Killah Cassidy prize code!</p>
                                <button
                                    onClick={() => setShowLoginModal(true)}
                                    className="login-btn"
                                >
                                    Sign In / Create Account
                                </button>
                            </div>
                        )}

                        {isLoggedIn && prizeCode && (
                            <div className="prize-section">
                                <h2>🎉 Your Prize Code</h2>
                                <div className="prize-code-display">
                                    <h3>{prizeCode}</h3>
                                    <p>Show this code to the staff to claim your prize!</p>
                                </div>
                                <button
                                    onClick={() => setShowReviewModal(true)}
                                    className="review-btn"
                                >
                                    Leave a Review
                                </button>
                                <button onClick={logout} className="logout-btn">
                                    Sign Out
                                </button>
                            </div>
                        )}

                        <div className="location-tags-section">
                            <h2>Features</h2>
                            <div className="tags-grid">
                                {location.tags.map((tag, index) => (
                                    <span key={index} className="tag">{tag}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Login Modal */}
            {showLoginModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>Sign In / Create Account</h2>
                        <div className="modal-tabs">
                            <button
                                className="tab-btn active"
                                onClick={() => document.getElementById('login-form').style.display = 'block'}
                            >
                                Sign In
                            </button>
                            <button
                                className="tab-btn"
                                onClick={() => document.getElementById('signup-form').style.display = 'block'}
                            >
                                Create Account
                            </button>
                        </div>

                        <form id="login-form" onSubmit={handleLogin} className="auth-form">
                            <input type="email" name="email" placeholder="Email" required />
                            <input type="password" name="password" placeholder="Password" required />
                            <button type="submit">Sign In</button>
                        </form>

                        <form id="signup-form" onSubmit={handleSignup} className="auth-form" style={{ display: 'none' }}>
                            <input type="text" name="name" placeholder="Full Name" required />
                            <input type="email" name="email" placeholder="Email" required />
                            <input type="password" name="password" placeholder="Password" required />
                            <button type="submit">Create Account</button>
                        </form>

                        <button onClick={() => setShowLoginModal(false)} className="close-btn">
                            ✕
                        </button>
                    </div>
                </div>
            )}

            {/* Review Modal */}
            {showReviewModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>Leave a Review</h2>
                        <form onSubmit={handleReviewSubmit} className="review-form">
                            <div className="rating-input">
                                <label>Rating:</label>
                                <select
                                    value={review.rating}
                                    onChange={(e) => setReview({ ...review, rating: parseInt(e.target.value) })}
                                >
                                    <option value={5}>⭐⭐⭐⭐⭐ (5)</option>
                                    <option value={4}>⭐⭐⭐⭐ (4)</option>
                                    <option value={3}>⭐⭐⭐ (3)</option>
                                    <option value={2}>⭐⭐ (2)</option>
                                    <option value={1}>⭐ (1)</option>
                                </select>
                            </div>
                            <textarea
                                value={review.comment}
                                onChange={(e) => setReview({ ...review, comment: e.target.value })}
                                placeholder="Share your experience..."
                                rows={4}
                                required
                            />
                            <button type="submit">Submit Review</button>
                        </form>
                        <button onClick={() => setShowReviewModal(false)} className="close-btn">
                            ✕
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LocationDetailPage; 