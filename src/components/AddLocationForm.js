import React, { useState } from 'react';
import { API_ENDPOINTS } from '../config';

const AddLocationForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        type: 'Dispensary',
        description: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        phone: '',
        email: '',
        website: '',
        tags: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const locationData = {
                ...formData,
                tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
                coordinates: {
                    latitude: 0, // Will be set by admin
                    longitude: 0
                },
                hours: {
                    monday: '9:00 AM - 9:00 PM',
                    tuesday: '9:00 AM - 9:00 PM',
                    wednesday: '9:00 AM - 9:00 PM',
                    thursday: '9:00 AM - 9:00 PM',
                    friday: '9:00 AM - 10:00 PM',
                    saturday: '10:00 AM - 10:00 PM',
                    sunday: '10:00 AM - 8:00 PM'
                },
                rating: 0,
                reviews: 0,
                image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
                status: 'pending' // For admin approval
            };

            const response = await fetch(API_ENDPOINTS.SUBMIT_LOCATION, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(locationData)
            });

            if (response.ok) {
                setSubmitStatus('success');
                setFormData({
                    name: '',
                    type: 'Dispensary',
                    description: '',
                    street: '',
                    city: '',
                    state: '',
                    zipCode: '',
                    phone: '',
                    email: '',
                    website: '',
                    tags: ''
                });
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            console.error('Error submitting location:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="add-location-section">
            <h2 className="section-title">Submit a New Location</h2>
            <p className="section-description">
                Know a great dispensary or head shop that should be featured? Submit it for consideration!
                Our team will review and add it to our database.
            </p>

            {submitStatus === 'success' && (
                <div className="success-message">
                    <h3>🎉 Thank You!</h3>
                    <p>Your location submission has been received. We'll review it and add it to our database if approved.</p>
                </div>
            )}

            {submitStatus === 'error' && (
                <div className="error-message">
                    <h3>❌ Submission Error</h3>
                    <p>There was an error submitting your location. Please try again.</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="add-location-form">
                <div className="form-grid">
                    <div className="form-group">
                        <label htmlFor="name">Location Name *</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Enter location name"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="type">Business Type *</label>
                        <select
                            id="type"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            required
                        >
                            <option value="Dispensary">Dispensary</option>
                            <option value="Head Shop">Head Shop</option>
                        </select>
                    </div>

                    <div className="form-group full-width">
                        <label htmlFor="description">Description *</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            rows="3"
                            placeholder="Describe the location, services, and atmosphere"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="street">Street Address *</label>
                        <input
                            type="text"
                            id="street"
                            name="street"
                            value={formData.street}
                            onChange={handleChange}
                            required
                            placeholder="123 Main Street"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="city">City *</label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            required
                            placeholder="City name"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="state">State *</label>
                        <input
                            type="text"
                            id="state"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            required
                            placeholder="State abbreviation (e.g., CA)"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="zipCode">ZIP Code *</label>
                        <input
                            type="text"
                            id="zipCode"
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleChange}
                            required
                            placeholder="12345"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">Phone Number</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="(555) 123-4567"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="contact@location.com"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="website">Website</label>
                        <input
                            type="url"
                            id="website"
                            name="website"
                            value={formData.website}
                            onChange={handleChange}
                            placeholder="https://www.location.com"
                        />
                    </div>

                    <div className="form-group full-width">
                        <label htmlFor="tags">Tags (comma-separated)</label>
                        <input
                            type="text"
                            id="tags"
                            name="tags"
                            value={formData.tags}
                            onChange={handleChange}
                            placeholder="medical, recreational, delivery, organic, etc."
                        />
                        <small>Add relevant tags to help users find this location</small>
                    </div>
                </div>

                <div className="form-actions">
                    <button
                        type="submit"
                        className="submit-btn"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Location'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddLocationForm;