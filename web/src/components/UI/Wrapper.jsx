import React, { useState, useEffect } from 'react';
import { Drawer, List, ListItem, ListItemText, Typography, Box } from '@mui/material';
import { Link, useParams } from 'react-router-dom';

const drawerWidth = 240;

function Wrapper({ children }) {
    const [isAdmin, setIsAdmin] = useState(false);
    const { userId } = useParams();

    useEffect(() => {
        fetch(`http://127.0.0.1:5005/profile/${userId}`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then(data => {
                setIsAdmin(data.is_admin); // Assuming the response contains an "is_admin" field
                console.log(isAdmin)
            })
            .catch(error => {
                console.error('Error fetching user profile:', error);
            });
    }, [userId]);

    return (
        <Box sx={{ display: 'flex' }}>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                    },
                }}
            >
                <List>

                    <Link to={`/${userId}/catalog`}><ListItem button>
                        <ListItemText primary="Каталог" />
                    </ListItem></Link>

                    <Link to={`/${userId}/favorites`}><ListItem button>
                        <ListItemText primary="Избранное" />
                    </ListItem></Link>
                    <Link to={`/${userId}/create-car`}><ListItem button>
                        <ListItemText primary="Добавить автомобиль" />
                    </ListItem></Link>
                    {isAdmin && (
                        <>
                            <ListItem>DashBoard</ListItem>
                            <Link to={`/${userId}/add-brand`}><ListItem button>
                                <ListItemText primary="Добавить модель" />
                            </ListItem></Link>

                            <Link to={`/${userId}/brands`}><ListItem button>
                                <ListItemText primary="Каталог моделей" />
                            </ListItem></Link>
                            <Link to={`/${userId}/users`}><ListItem button>
                                <ListItemText primary="Список пользователей" />
                            </ListItem></Link>
                        </>
                    )}

                    <Link to={`/`}><ListItem button>
                        <ListItemText primary="Выход" />
                    </ListItem></Link>
                </List>
            </Drawer>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3 }}
            >
                <Typography variant="h5" gutterBottom>
                </Typography>
                {children}
            </Box>
        </Box>
    );
}

export default Wrapper;
