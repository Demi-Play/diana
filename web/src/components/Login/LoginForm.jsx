import React, { useState } from 'react';
import { Button, Card, Typography } from '@mui/material';
import FormInput from './FormInput';

const LoginForm = ({ authorize, switcher }) => {

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:5005/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password,
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to login');
            }

            const data = await response.json();
            console.log(data); // Handle response message

            // Clear form after successful login
            setFormData({
                username: '',
                password: '',
            });
            authorize(true)
            window.location.href = `/${data.id}/catalog`
        } catch (error) {
            console.error('Error:', error);
            authorize(false)
        }
    };



    return (
        <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', placeItems: 'center' }}>
            <Typography variant='h4'>Login</Typography>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Username"
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                />
                <FormInput
                    label="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                /><br />
                <Button type="submit" variant="contained">Авторизоваться</Button><br />
                <Button onClick={switcher} variant="text">Зарегистрироваться</Button>
            </form>
        </Card>
    );
};

export default LoginForm;