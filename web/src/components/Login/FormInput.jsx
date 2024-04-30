import { TextField, Typography } from '@mui/material';
import React from 'react';

const FormInput = ({ variant, label, type, name, value, onChange }) => {
    return (
        <>
            <Typography variant='h6'>{label}</Typography>
            <TextField
                variant={variant}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                required
            />
        </>
    );
};

export default FormInput;
