import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Card, MenuItem, Select } from '@mui/material';

function CreateCarForm({ onCarCreated }) {
    const [formData, setFormData] = useState({
        brand: '',
        model_id: '',
        year: '',
        price: '',
        mileage: '',
        condition: '',
        description: '',
        photo: ''
    });
    const [carModels, setCarModels] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5005/api/models')
            .then(response => response.json())
            .then(data => {
                setCarModels(data);
            })
            .catch(error => {
                console.error('Error fetching car models:', error);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Отправка данных на сервер
        fetch('http://localhost:5005/api/cars', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then(data => {
                console.log('Car created:', data);
                setFormData({
                    brand: '',
                    model_id: '',
                    year: '',
                    price: '',
                    mileage: '',
                    condition: '',
                    description: '',
                    photo: ''
                });
            })
        alert('Вы успешно добавили свой автомобиль!')
            .catch(error => {
                console.error('Error creating car:', error);
            });
    };

    return (
        <Card
            component="form"
            className="create-car-form"
            onSubmit={handleSubmit}
            sx={{ width: '100%', maxWidth: 400, padding: 3, gap: 10 }}
        >
            <Typography variant="h5" gutterBottom>Create a New Car</Typography>
            <TextField
                fullWidth
                label="Brand"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                required
            />
            {/* Выпадающий список моделей */}
            <Select
                fullWidth
                label="Model"
                name="model_id"
                value={formData.model_id}
                onChange={handleChange}
                required

                sx={{ textAlign: 'left' }}
            >
                {carModels.map(model => (
                    <MenuItem key={model.id} value={model.id}>{model.name}</MenuItem>
                ))}
            </Select>
            <TextField
                fullWidth
                label="Year"
                name="year"
                type="number"
                value={formData.year}
                onChange={handleChange}
                required

            />
            <TextField
                fullWidth
                label="Price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                required

            />
            <TextField
                fullWidth
                label="Mileage"
                name="mileage"
                type="number"
                value={formData.mileage}
                onChange={handleChange}
                required

            />
            <TextField
                fullWidth
                label="Condition"
                name="condition"
                value={formData.condition}
                onChange={handleChange}
                required

            />
            <TextField
                fullWidth
                multiline
                rows={4}
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required

            />
            <TextField
                fullWidth
                label="Photo URL"
                name="photo"
                value={formData.photo}
                onChange={handleChange}
                required

            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
            >
                Добавить
            </Button>
        </Card>
    );
}

export default CreateCarForm;