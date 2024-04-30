import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Card } from '@mui/material';

function EditBrand({ modelId }) {
    const [modelData, setModelData] = useState({
        name: '',
        brand: ''
    });
    useEffect(() => {
        if (modelId) {
            fetch(`http://127.0.0.1:5005/api/models/${modelId}`)
                .then(response => response.json())
                .then(data => {
                    setModelData({
                        name: data.name,
                        brand: data.brand
                    });
                })
                .catch(error => console.error('Error fetching car model:', error));
        }
    }, [modelId]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setModelData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleUpdate = () => {
        fetch(`http://127.0.0.1:5005/api/models/${modelId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(modelData)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Update response:', data);
                // Add logic for success or error handling
                window.location.href(`/${userId}/brands`)
            })
            .catch(error => console.error('Error updating car model:', error));
    };

    const handleDelete = () => {
        fetch(`http://127.0.0.1:5005/api/models/${modelId}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    console.log('Model deleted successfully');
                    // Redirect to the brands page after deletion
                    window.location.href(`/${userId}/brands`);
                } else {
                    console.error('Error deleting car model:', response.statusText);
                }
            })
            .catch(error => {
                console.error('Error deleting car model:', error);
            });
    };

    return (
        <Card sx={{ padding: 10 }}>
            <Typography variant="h5" gutterBottom>
                Редактировать модель авто
            </Typography>
            <TextField
                name="name"
                label="Name"
                value={modelData.name}
                onChange={handleChange}
                fullWidth
                sx={{ marginBottom: 2 }}
            />
            <TextField
                name="brand"
                label="Brand"
                value={modelData.brand}
                onChange={handleChange}
                fullWidth
                sx={{ marginBottom: 2 }}
            />
            <Button onClick={handleUpdate} variant="contained" color="primary" sx={{ marginRight: 2 }}>
                обновить
            </Button>
            <Button onClick={handleDelete} variant="contained" color="error">
                удалить
            </Button>
        </Card>
    );
}

export default EditBrand;
