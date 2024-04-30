import React, { useState, useEffect } from 'react';
import { Typography, List, ListItem, ListItemText, Button, Dialog, DialogTitle, DialogContent, DialogActions, Card } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import EditBrand from './EditBrand';

function Brands() {
    let { userId } = useParams()
    const [models, setModels] = useState([]);
    const [editModelId, setEditModelId] = useState(null);
    const [openEditDialog, setOpenEditDialog] = useState(false);

    useEffect(() => {
        fetch('http://127.0.0.1:5005/api/models')
            .then(response => response.json())
            .then(data => setModels(data))
            .catch(error => console.error('Error fetching car models:', error));
    }, []);

    const handleEditClick = (modelId) => {
        setEditModelId(modelId);
        setOpenEditDialog(true);
    };

    const handleCloseEditDialog = () => {
        setOpenEditDialog(false);
        setEditModelId(null);
    };

    return (
        <Card sx={{ padding: 10 }}>
            <Typography variant="h4" gutterBottom>
                Car Models
            </Typography>
            <List>
                {models.map(model => (
                    <ListItem key={model.id}>
                        {/* <ListItemText sx={{ fontSize: 24 }} primary={model.name} secondary={model.brand} /> */}
                        <Typography variant='h5' sx={{ marginRight: 10 }}>{model.name + '-' + model.brand}</Typography>
                        {/* <Button component={Link} to={`/${userId}/edit-brand/${model.id}`} variant="contained" color="primary" sx={{ marginRight: 1 }}>
                            Edit
                        </Button> */}
                        <Button onClick={() => handleEditClick(model.id)} variant="contained" color="primary">
                            Редактировать
                        </Button>
                    </ListItem>
                ))}
            </List>

            {/* Edit Dialog */}
            <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
                <DialogTitle>Редактировать модель авто</DialogTitle>
                <DialogContent>
                    {editModelId && <EditBrand modelId={editModelId} />}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditDialog} color="primary">
                        Закрыть
                    </Button>
                </DialogActions>
            </Dialog>
        </Card>
    );
}

export default Brands;
