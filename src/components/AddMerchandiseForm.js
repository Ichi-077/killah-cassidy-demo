import React, { useState } from 'react';

const AddMerchandiseForm = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [sku, setSku] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log({ name, price, image, description, category, sku });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add New Merchandise</h2>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            <input
                type="text"
                placeholder="Image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <input
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            />
            <input
                type="text"
                placeholder="SKU"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
            />
            <button type="submit">Add Merchandise</button>
        </form>
    );
};

export default AddMerchandiseForm;