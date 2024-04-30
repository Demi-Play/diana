import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Box, Card } from '@mui/material';
import { useParams } from 'react-router-dom';

function CarEdit() {
    let { userId, id } = useParams()
    const [carData, setCarData] = useState({
        brand: '',
        model_id: '',
        year: '',
        price: '',
        mileage: '',
        condition: '',
        description: '',
        photo: ''
    });

    useEffect(() => {
        fetch(`http://127.0.0.1:5005/api/cars/${id}`)
            .then(response => response.json())
            .then(data => setCarData(data))
            .catch(error => console.error('Error fetching car:', error));
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCarData({
            ...carData,
            [name]: value
        });
    };

    const handleUpdate = () => {
        fetch(`http://127.0.0.1:5005/api/cars/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(carData)
        })
            .then(response => {
                if (response.ok) {
                    console.log('Car updated successfully');
                } else {
                    console.error('Error updating car:', response.statusText);
                }
            })
        alert('Вы успешно обновили информацию  об автомобиле')
        window.location.href(`/${userId}/catalog`)
            .catch(error => {
                console.error('Error updating car:', error);
            });
    };

    const handleDelete = () => {
        fetch(`http://127.0.0.1:5005/api/cars/${id}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    console.log('Car deleted successfully');
                } else {
                    console.error('Error deleting car:', response.statusText);
                }
            })
        alert('Вы успешно обновили информацию  об автомобиле')
        window.location.href(`/${userId}/catalog`)
            .catch(error => {
                console.error('Error deleting car:', error);
            });
    };

    return (
        <Card
            component="div"
            className="car-edit"
            sx={{ width: '100%', maxWidth: 400, padding: 10 }}
        >
            <Typography variant="h5" gutterBottom>Edit Car</Typography>
            <TextField
                fullWidth
                label="Brand"
                name="brand"
                value={carData.brand}
                onChange={handleChange}
                margin="normal"
            />
            <TextField
                fullWidth
                label="Model ID"
                name="model_id"
                value={carData.model_id}
                onChange={handleChange}
                margin="normal"
            />
            <TextField
                fullWidth
                label="Year"
                name="year"
                type="number"
                value={carData.year}
                onChange={handleChange}
                margin="normal"
            />
            <TextField
                fullWidth
                label="Price"
                name="price"
                type="number"
                value={carData.price}
                onChange={handleChange}
                margin="normal"
            />
            <TextField
                fullWidth
                label="Mileage"
                name="mileage"
                type="number"
                value={carData.mileage}
                onChange={handleChange}
                margin="normal"
            />
            <TextField
                fullWidth
                label="Condition"
                name="condition"
                value={carData.condition}
                onChange={handleChange}
                margin="normal"
            />
            <TextField
                fullWidth
                multiline
                rows={4}
                label="Description"
                name="description"
                value={carData.description}
                onChange={handleChange}
                margin="normal"
            />
            <TextField
                fullWidth
                label="Photo URL"
                name="photo"
                value={carData.photo}
                onChange={handleChange}
                margin="normal"
            />
            <Button
                type="button"
                variant="contained"
                color="primary"
                onClick={handleUpdate}
                sx={{ mt: 2, mr: 2 }}
            >
                Обновить
            </Button>
            <Button
                type="button"
                variant="contained"
                color="error"
                onClick={handleDelete}
                sx={{ mt: 2 }}
            >
                Удалить
            </Button>
        </Card>
    );
}

export default CarEdit;
