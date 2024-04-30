import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useParams } from 'react-router-dom';

function CarCard({ car }) {
    let { userId } = useParams();
    const [isFavorite, setIsFavorite] = useState(false);
    const [open, setOpen] = useState(false);

    const handleAddFavorite = () => {
        fetch(`http://127.0.0.1:5005/api/favorites/${userId}/${car.id}`, {
            method: 'POST'
        })
            .then(response => response.json())
            .then(data => {
                console.log('Add favorite response:', data);
                setIsFavorite(true);
            })
            .catch(error => console.error('Error adding favorite:', error));
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Card sx={{ width: 600, height: 350, textAlign: 'left' }}>
            <CardContent>
                <img src={car.photo} alt="" />
                <Typography variant="h6" gutterBottom>
                    {car.brand} {car.year} {car.mileage}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Цена: ${car.price}
                </Typography>
                <Button
                    onClick={handleAddFavorite}
                    variant="contained"
                    disabled={isFavorite}
                    sx={{ marginTop: 2 }}
                >
                    {isFavorite ? 'В избранном' : 'В избранное'}
                </Button>
                <Button onClick={handleOpen}>
                    Детали
                </Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>{`${car.brand} ${car.year} ${car.mileage}`}</DialogTitle>
                    <DialogContent>
                        <Typography variant="body2" color="text.secondary">
                            Model ID: {car.model_id}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Год: {car.year}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Пробег в милях: {car.mileage}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Состояние: {car.condition}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Описание: {car.description}
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => window.location.href = `/${userId}/edit-car/${car.id}`}>Редактировать</Button>
                        <Button onClick={handleClose}>Закрыть</Button>
                    </DialogActions>
                </Dialog>
            </CardContent>
        </Card>
    );
}

export default CarCard;
