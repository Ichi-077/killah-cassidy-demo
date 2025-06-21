import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AddLocationForm from '../components/AddLocationForm';
import { API_ENDPOINTS } from '../config';

const HomePage = () => {
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFeaturedLocations();
    }, []);

    const fetchFeaturedLocations = async () => {
        try {
            const response = await fetch(API_ENDPOINTS.LOCATIONS);
            if (response.ok) {
                const data = await response.json();
                // Take first 3 locations for featured section
                setLocations(data.slice(0, 3));
            }
        } catch (error) {
            console.error('Error fetching featured locations:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="homepage">
            <h1 className="gothic-title">Where in the World is Killah Cassidy?</h1>

            <section className="dispensary-gallery">
                <h2 className="section-title">Featured Locations</h2>
                {loading ? (
                    <div className="loading">Loading featured locations...</div>
                ) : (
                    <div className="image-grid">
                        {locations.map((location) => (
                            <div key={location.id} className="image-card">
                                <img
                                    src={location.image}
                                    alt={location.name}
                                    className="dispensary-image"
                                />
                                <h3>{location.name}</h3>
                                <p className="location-type">{location.type}</p>
                                <p className="location-description">{location.description}</p>
                                <div className="location-details">
                                    <p><strong>📍</strong> {location.address.city}, {location.address.state}</p>
                                    <p><strong>⭐</strong> {location.rating} ({location.reviews} reviews)</p>
                                </div>
                                <div className="location-tags">
                                    {location.tags.slice(0, 3).map((tag, index) => (
                                        <span key={index} className="tag">{tag}</span>
                                    ))}
                                </div>
                                <Link to={`/location/${location.id}`} className="view-location-btn">
                                    View Details & QR Code
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            <section className="about-us">
                <h2 className="section-title">About Us</h2>
                <div className="about-content">
                    <div className="about-text">
                        <p>
                            Welcome to "Where in the World is Killah Cassidy?" - your ultimate destination
                            for tracking cannabis dispensaries and merchandise across the globe.
                            Our mission is to connect cannabis enthusiasts with the best dispensaries,
                            products, and experiences worldwide.
                        </p>
                        <p>
                            Whether you're a seasoned connoisseur or new to the cannabis community,
                            we provide comprehensive information about dispensary locations, product
                            reviews, and exclusive merchandise. Our platform is designed to make
                            your cannabis journey seamless and enjoyable.
                        </p>
                        <p>
                            Join our community and discover amazing dispensaries, track your favorite
                            products, and stay updated with the latest in cannabis culture.
                            Killah Cassidy is everywhere - and so are we!
                        </p>
                    </div>
                    <div className="about-features">
                        <h3>What We Offer:</h3>
                        <ul>
                            <li>📍 Dispensary location tracking</li>
                            <li>🛍️ Exclusive merchandise</li>
                            <li>📱 Mobile-friendly platform</li>
                            <li>🌟 Community reviews</li>
                            <li>🎯 Product recommendations</li>
                            <li>🎁 QR Code prize system</li>
                        </ul>
                    </div>
                </div>
            </section>

            <AddLocationForm />
        </div>
    );
};

export default HomePage;