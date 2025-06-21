import React, { useState, useEffect } from 'react';
import { API_ENDPOINTS } from '../config';

const MerchandisePage = () => {
    const [merchandise, setMerchandise] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('all');
    const [sortBy, setSortBy] = useState('name');

    useEffect(() => {
        fetchMerchandise();
    }, []);

    const fetchMerchandise = async () => {
        try {
            const response = await fetch(API_ENDPOINTS.MERCHANDISE);
            if (!response.ok) {
                throw new Error('Failed to fetch merchandise');
            }
            const data = await response.json();
            setMerchandise(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const filteredAndSortedMerchandise = merchandise
        .filter(item => filter === 'all' || item.category === filter)
        .sort((a, b) => {
            switch (sortBy) {
                case 'price-low':
                    return a.price - b.price;
                case 'price-high':
                    return b.price - a.price;
                case 'name':
                    return a.name.localeCompare(b.name);
                default:
                    return 0;
            }
        });

    if (loading) {
        return (
            <div className="merchandise-page">
                <h1 className="gothic-title">Merchandise</h1>
                <div className="loading">Loading merchandise...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="merchandise-page">
                <h1 className="gothic-title">Merchandise</h1>
                <div className="error">Error: {error}</div>
            </div>
        );
    }

    return (
        <div className="merchandise-page">
            <h1 className="gothic-title">Merchandise</h1>

            <div className="filter-section">
                <div className="filter-group">
                    <label>Category:</label>
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="filter-select"
                    >
                        <option value="all">All Categories</option>
                        <option value="Clothing">Clothing</option>
                        <option value="Accessories">Accessories</option>
                        <option value="Consumables">Consumables</option>
                        <option value="CBD Products">CBD Products</option>
                        <option value="Growing">Growing</option>
                    </select>
                </div>

                <div className="filter-group">
                    <label>Sort by:</label>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="filter-select"
                    >
                        <option value="name">Name</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                    </select>
                </div>
            </div>

            <div className="merchandise-grid">
                {filteredAndSortedMerchandise.map((item) => (
                    <div key={item.id} className="merchandise-card">
                        <img
                            src={item.image}
                            alt={item.name}
                            className="merchandise-image"
                        />
                        <div className="merchandise-info">
                            <h3>{item.name}</h3>
                            <p className="merchandise-description">{item.description}</p>
                            <div className="merchandise-details">
                                <p className="price">${item.price.toFixed(2)}</p>
                                <p className="category">{item.category}</p>
                                <p className="stock-status">
                                    {item.inStock ? (
                                        <span className="in-stock">✅ In Stock</span>
                                    ) : (
                                        <span className="out-of-stock">❌ Out of Stock</span>
                                    )}
                                </p>
                            </div>
                            <div className="merchandise-tags">
                                {item.tags.map((tag, index) => (
                                    <span key={index} className="tag">{tag}</span>
                                ))}
                            </div>
                            <button
                                className="add-to-cart-btn"
                                disabled={!item.inStock}
                            >
                                {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MerchandisePage;