import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import './styles.css'

const LandingPage = () => {
    const history = useHistory();
    return (
        <div>
            <button onClick={()=> {history.push('/register')}}>Register</button>
            <button onClick={()=> {history.push('login')}}>Log in</button>
        </div>
    )
}

export default LandingPage;