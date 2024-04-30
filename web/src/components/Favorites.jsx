import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Typography, Button, Card, ListItemAvatar } from '@mui/material';
import { useParams } from 'react-router-dom';

function Favorites() {
    let { userId } = useParams()
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        if (userId) {
            fetch(`http://127.0.0.1:5005/api/favorites/${userId}`)
                .then(response => response.json())
                .then(data => setFavorites(data))
                .catch(error => console.error('Error fetching favorites:', error));
        }
    }, [userId]);

    const handleRemoveFavorite = (carId) => {
        fetch(`http://127.0.0.1:5005/api/favorites/${userId}/${carId}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(data => {
                console.log('Remove favorite response:', data);
                // Update state to reflect removal
                setFavorites(prevFavorites => prevFavorites.filter(fav => fav.car_id !== carId));
            })
            .catch(error => console.error('Error removing favorite:', error));
    };

    return (
        <Card sx={{ padding: 10 }}>

            <Typography variant="h5" gutterBottom>
                Избранные
            </Typography>
            <List>
                {favorites.map(fav => (
                    <ListItem sx={{ gap: 3 }} key={fav.car_id}>
                        <img style={{ width: 192, height: 100 }} src={fav.photo} alt="" />
                        <ListItemText
                            primary={fav.brand}
                            secondary={`Model: ${fav.model}`}
                        />
                        <Button
                            onClick={() => handleRemoveFavorite(fav.car_id)}
                            color="error"
                            variant='contained'
                            size="small"
                        >
                            убрать
                        </Button>
                    </ListItem>
                ))}
            </List>
        </Card>
    );
}

export default Favorites;
