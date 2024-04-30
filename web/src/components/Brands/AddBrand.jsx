import React, { useState } from 'react';
import { TextField, Button, Typography, Card } from '@mui/material';

function AddBrand() {
    const [formData, setFormData] = useState({
        name: '',
        brand: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://127.0.0.1:5005/api/models', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then(response => {
                if (response.ok) {
                    alert('Car model created successfully');
                    setFormData({
                        name: '',
                        brand: '',
                    });
                } else {
                    throw new Error('Failed to create car model');
                }
            })
            .catch(error => {
                console.error('Error creating car model:', error);
                alert('Error creating car model');
            });
    };

    return (
        <Card sx={{ padding: 10 }}>
            <Typography variant="h4" gutterBottom>
                Добавить модель авто
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                />
                <TextField
                    label="Brand"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary">
                    Добавить
                </Button>
            </form>
        </Card>
    );
}

export default AddBrand;