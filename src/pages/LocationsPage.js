import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AddLocationForm from '../components/AddLocationForm';
import { API_ENDPOINTS } from '../config';

const LocationsPage = () => {
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        fetchLocations();
    }, []);

    const fetchLocations = async () => {
        try {
            const response = await fetch(API_ENDPOINTS.LOCATIONS);
            if (!response.ok) {
                throw new Error('Failed to fetch locations');
            }
            const data = await response.json();
            setLocations(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const filteredLocations = filter === 'all'
        ? locations
        : locations.filter(location => location.type === filter);

    if (loading) {
        return (
            <div className="locations-page">
                <h1 className="gothic-title">Locations</h1>
                <div className="loading">Loading locations...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="locations-page">
                <h1 className="gothic-title">Locations</h1>
                <div className="error">Error: {error}</div>
            </div>
        );
    }

    return (
        <div className="locations-page">
            <h1 className="gothic-title">Locations</h1>

            <div className="qr-info-section">
                <h2>📱 Scan QR Codes for Prizes!</h2>
                <p>Visit any of these locations and scan their QR code to get exclusive Killah Cassidy prizes and leave reviews!</p>
            </div>

            <div className="filter-section">
                <button
                    className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                    onClick={() => setFilter('all')}
                >
                    All Locations
                </button>
                <button
                    className={`filter-btn ${filter === 'Dispensary' ? 'active' : ''}`}
                    onClick={() => setFilter('Dispensary')}
                >
                    Dispensaries
                </button>
                <button
                    className={`filter-btn ${filter === 'Head Shop' ? 'active' : ''}`}
                    onClick={() => setFilter('Head Shop')}
                >
                    Head Shops
                </button>
            </div>

            <div className="locations-grid">
                {filteredLocations.map((location) => (
                    <div key={location.id} className="location-card">
                        <img
                            src={location.image}
                            alt={location.name}
                            className="location-image"
                        />
                        <div className="location-info">
                            <h3>{location.name}</h3>
                            <p className="location-type">{location.type}</p>
                            <p className="location-description">{location.description}</p>
                            <div className="location-details">
                                <p><strong>Address:</strong> {location.address.street}, {location.address.city}, {location.address.state}</p>
                                <p><strong>Phone:</strong> {location.phone}</p>
                                <p><strong>Rating:</strong> ⭐ {location.rating} ({location.reviews} reviews)</p>
                            </div>
                            <div className="location-tags">
                                {location.tags.map((tag, index) => (
                                    <span key={index} className="tag">{tag}</span>
                                ))}
                            </div>
                            <div className="location-actions">
                                <Link to={`/location/${location.id}`} className="view-details-btn">
                                    View Details & QR Code
                                </Link>
                                <div className="qr-note">
                                    📱 QR Code available at location
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <AddLocationForm />
        </div>
    );
};

export default LocationsPage;