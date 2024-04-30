import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText, Button } from '@mui/material';

function UserView() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:5005/users')
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then(data => {
                setUsers(data);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, []);

    return (
        <div>
            <Typography variant="h5" color='primary' gutterBottom>
                Пользователи
            </Typography>
            <List>
                {users.map(user => (
                    <ListItem key={user.id}>
                        <Card sx={{ width: 400 }}>
                            <CardContent sx={{}}>
                                <div>
                                    <Typography variant="h6">{user.username}</Typography>
                                    <Typography variant="body1">{user.email}</Typography>
                                    <Typography variant="body2">Admin: {user.is_admin ? 'Yes' : 'No'}</Typography>
                                    {/* Additional user details can be displayed here */}
                                </div>
                                <Button color='error'>Удалить</Button>
                            </CardContent>
                        </Card>
                    </ListItem>
                ))}
            </List>
        </div>
    );
}

export default UserView;
