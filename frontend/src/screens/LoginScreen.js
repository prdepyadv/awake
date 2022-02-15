import React from 'react'
import '../App.css';
import Login from '../components/Auth/Login';

function LoginScreen(props) {
    return (
        <div className="main">
            <Login setToken={props.setToken} />
        </div>
    )
}

export default LoginScreen