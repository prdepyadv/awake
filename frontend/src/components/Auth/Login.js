import React, { Component, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { Button, Form, Message } from 'semantic-ui-react'
import './Auth.css'
import { useHistory } from "react-router-dom";

async function loginUser(credentials) {
    return {'token': '2232339'}
 return fetch('http://localhost:8000/login', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(credentials)
 })
   .then(data => data.json())
}

export default function Login({ setToken }) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const history = useHistory();

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({username, password});
        setToken(token);
        history.push("/");
    }

    return (
        <Form className="loginForm" onSubmit={handleSubmit}>
            <Form.Field>
                <label>Username</label>
                <input placeholder='Username' name="username" id="username"
                onChange={e => setUserName(e.target.value)} />
            </Form.Field>
            <Form.Field>
                <label>Password</label>
                <input placeholder='Password' name="password" id="password" type='password'
                 onChange={e => setPassword(e.target.value)} />
            </Form.Field>
            <Button type='submit'>Submit</Button>
        </Form>
    );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};