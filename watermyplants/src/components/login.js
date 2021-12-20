import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import * as yup from 'yup';
import loginSchema from './validation/loginSchema';

const StyledForm = styled.form`
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
    margin: 0 auto;
    padding: 2%; 5%;
    background-color: '#006e51';
    color: '#313639';
    border-style: double;
    border-color: '#004f3a';
    outline: 5px solid '#10ffbf';
    h2 {
        color: '#afffea';
    }
    .form-container {
        width: 100%;
    }
    .errors {
        color: '#f8f8ff';
    }
    .username {
        width: 90%;
    }
    .username p {
        display: inline;
        margin-right: 1%;
    }
    .password {
        width: 90%;
    }
    .password p {
        display: inline;
        margin-right: 1%;
    }
    #loginBtn {
        width: 40%;
        padding: 2%;
        margin: 1% auto;
    }
`

const initialFormValues = {
    username: '',
    password: '',
}
const initialFormErrors = {
    username: '',
    password: '',
    loginAttempt: '',
}
const initialDisabled=true;

export default function login(props) {
    // state slices
    const [formValues, setFormValues] = useState(initialFormValues);
    const [formErrors, setFormErrors] = useState(initialFormErrors);
    const [disabled, setDisabled] = useState(initialDisabled);
    // functions
    const validate = (name, value) => {
        // validate with yup
        yup.reach(loginSchema, name)
            .validate(value)
            .then(() => setFormErrors({ ...formErrors, [name]: '' }))
            .catch(err => setFormErrors({ ...formErrors, [name]: err.errors[0] }))
    }
    const onChange = evt => {
        const { name, value } = evt.target;
        // validate
        validate(name, value);
        // update formValues
        setFormValues({
            ...formValues,
            [name]: value,
        })
    }
    const onSubmit = evt => {
        // construct loginAttempt
        const loginAttempt = {
            username: formValues.username.trim(),
            password: formValues.password.trim(),
        }
        // POST login attempt
        postLogin(loginAttempt);
    }
    const postLogin = loginAttempt => {
        axios.post('https://watermyplantz.herokuapp.com/api/auth/login', loginAttempt)
            .then(resp => {
                // we login successfully and get a token

            })
            .catch(err => {
                // we failed to login
                console.error(err);
                const loginError = {
                    ...formErrors,
                    loginAttempt: 'Login failed. Please try again.',
                }
                setFormErrors=loginError;
            })
            .finally(() => setFormValues(initialFormValues))
    }
    // update login button when formValues change
    useEffect(() => {
        loginSchema.isValid(formValues)
            .then(valid => setDisabled(!valid));
    }, [formValues]);

    // return Login element
    return (
        <StyledForm onSubmit={onSubmit}>
            <h2>Login</h2> 
            <div className='errors'>
                {/* errors here */}
                <div>{errors.username}</div>
                <div>{errors.password}</div>
                <div>{errors.loginAttempt}</div>
            </div>
            {/* Form */}
            <div className='form-container'>
                <div className='username'>
                    <label><p>Username</p>
                        <input
                            id='username'
                            value={values.username}
                            onChange={onChange}
                            name='username'
                            type='text'
                        />
                    </label>
                </div>
                <div className='password'>
                    <label><p>Password</p>
                        <input
                            id='password'
                            value={values.password}
                            onChange={onChange}
                            name='password'
                            type='password'
                        />
                    </label>
                </div>
                <button type='submit' id='loginBtn' disabled={disabled}>Login</button>
            </div>
        </StyledForm>
    )
    
}