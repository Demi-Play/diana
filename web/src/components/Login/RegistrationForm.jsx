import React, { useState } from 'react';
import FormInput from './FormInput';
import { Button, Card, Typography } from '@mui/material';

const RegistrationForm = ({ authorize, switcher }) => {

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        // avatar: null,
        first_name: '',
        last_name: '',
        // is_admin: false,
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
            const response = await fetch('http://127.0.0.1:5005/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            console.log(data); // Handle response message

            // Clear form after successful registration
            setFormData({
                username: '',
                email: '',
                password: '',
                // avatar: null,
                first_name: '',
                last_name: '',
                // is_admin: false,
            });
            authorize(true)
            window.location.href = `/${data.id}/catalog`
        } catch (error) {
            console.error('Error:', error);
            authorize(false)
        }
    };

    return (
        <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center', p: 2 }}>
            <Typography variant='h4' gutterBottom>Registration</Typography>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Username"
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                />
                <FormInput
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <FormInput
                    label="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
                {/* <FormInput
                    label="Avatar"
                    type="text"
                    name="avatar"
                    value={formData.avatar}
                    onChange={handleChange}
                /> */}
                <FormInput
                    label="First Name"
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                />
                <FormInput
                    label="Last Name"
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                /><br />
                {/* <FormInput
                    label="Is Admin"
                    type="checkbox"
                    name="is_admin"
                    checked={formData.is_admin}
                    onChange={(e) => setFormData({ ...formData, is_admin: e.target.checked })}
                /> */}
                <Button type="submit" variant="contained">Зарегистрироваться</Button><br />
                <Button onClick={switcher} variant="text">Авторизоваться</Button>
            </form>
        </Card >
    );
};

export default RegistrationForm;
