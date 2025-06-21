import React from 'react';

import AddLocationForm from '../components/AddLocationForm';
import AddMerchandiseForm from '../components/AddMerchandiseForm';

const AdminPage = () => {
    return (
        <div>
            <h1>Admin Dashboard</h1>
            <AddLocationForm />
            <AddMerchandiseForm />
        </div>
    );
};

export default AdminPage;