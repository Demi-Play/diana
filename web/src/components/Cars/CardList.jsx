import React, { useState, useEffect } from 'react';
import CreateCarForm from './CreateCarForm';
import CarCard from './CarCard';
import { Grid, Typography } from '@mui/material';

function CarList() {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:5005/api/cars')
            .then(response => response.json())
            .then(data => setCars(data))
            .catch(error => console.error('Error fetching cars:', error));
    }, []);

    const handleCarCreated = () => {
        fetch('/api/cars')
            .then(response => response.json())
            .then(data => setCars(data))
            .catch(error => console.error('Error fetching cars:', error));
    };

    return (
        <Grid container spacing={1}>
            <Typography variant='h4' color='primary'>Каталог автомобилей</Typography>

            {cars.map(car => (
                <Grid sx={{ margin: 2 }} item key={car.id} xs={12} sm={6} md={9} lg={12}>
                    <CarCard car={car} />
                </Grid>
            ))}
        </Grid>
    );
}

export default CarList