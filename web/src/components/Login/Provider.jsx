import React, { useState } from 'react'
import RegistrationForm from './RegistrationForm'
import LoginForm from './LoginForm'
import { Button, Card } from '@mui/material'

export default function Provider() {
    const [auth, setAuth] = useState(false)
    const [switcher, setSwitcher] = useState(false)

    const handleSwitch = () => {
        setSwitcher(!switcher)
        console.log(switcher)
    }

    const handleAuth = (auth) => {
        setAuth(auth)
    }

    return (
        <Card sx={{ minWidth: 600, minHeight: 400, gap: 3, display: 'flex', justifyContent: 'center' }}>
            <>

            </>
            <Button disabled color='primary' variant='contained' onClick={handleSwitch}>{switcher ? '' : ''}</Button>
            {switcher ?
                <RegistrationForm switcher={() => setSwitcher()} authorize={(auth) => handleAuth(auth)} />
                :
                <LoginForm switcher={setSwitcher} authorize={(auth) => handleAuth(auth)} />
            }
            <Button disabled color='primary' variant='contained' onClick={handleSwitch}>{switcher ? '' : ''}</Button>
        </Card>
    )
}
