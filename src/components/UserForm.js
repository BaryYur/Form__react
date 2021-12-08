import React, { useRef, useState, useEffect } from "react";

import useInput from '../hooks/hook-form';

// import { useDispatch } from "react-redux";
// import { visibleActions } from "../store/visible";
import classes from './UserForm.module.css';

function UserForm(props) {
    const nameRef = useRef('');
    const emailRef = useRef('');
    const passwordRef = useRef('');

    const [formIsValid, setFormIsValid] = useState(false);
    const { 
        value: enteredName, 
        isValid: enteredNameIsValid,
        hasError: nameInputHasError, 
        valueChangeHandler: nameChangedHandler, 
        inputBlurHandler: nameBlurHandler,
        reset: resetNameInput
    } = useInput(value => value.trim() !== '');

    const { 
        value: enteredEmail, 
        isValid: enteredEmailIsValid,
        hasError: emailInputHasError, 
        valueChangeHandler: emailChangedHandler, 
        inputBlurHandler: emailBlurHandler,
        reset: resetEmailInput
    } = useInput(value => value.trim().includes('@'));

    const { 
        value: enteredPassword, 
        isValid: enteredPasswordIsValid,
        hasError: passwordInputHasError, 
        valueChangeHandler: passwordChangedHandler, 
        inputBlurHandler: passwordBlurHandler,
        reset: resetPasswordInput,
    } = useInput(value => value.trim().length >= 5);


    useEffect(() => {   
        if(enteredNameIsValid && enteredPasswordIsValid && enteredEmailIsValid) { 
          setFormIsValid(true);
        } else {
          setFormIsValid(false);
        }
      }, [enteredNameIsValid, enteredPasswordIsValid, enteredEmailIsValid]);

    const submitHandler = (event) => {
        event.preventDefault();

        if(!enteredNameIsValid) {
            return;
        };
       
        console.log(enteredName);

        const user = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        resetNameInput();
        resetEmailInput();
        resetPasswordInput();

        props.onAddUser(user);
    };

    return (
        <div>
            <form className={classes.form} onSubmit={submitHandler}>
                 <div className={nameInputHasError ? classes['invalid'] : classes['form-control']}>
                    <label htmlFor="name">Name</label>
                    <input 
                        id="name" 
                        type="text" 
                        ref={nameRef} 
                        onChange={nameChangedHandler}
                        onBlur={nameBlurHandler}
                        value={enteredName}
                        name="name"
                    />
                    {nameInputHasError && <p className={classes['error-text']}>Name must not be empty.</p>}
                 </div>
                 <div className={emailInputHasError ? classes['invalid'] : classes['form-control']}>
                    <label htmlFor="email">Email</label>
                    <input 
                        id="name" 
                        type="text" 
                        ref={emailRef} 
                        onChange={emailChangedHandler}
                        onBlur={emailBlurHandler}
                        value={enteredEmail}
                        name="email"
                    />
                    {emailInputHasError && <p className={classes['error-text']}>Please entered a valid email.</p>}
                 </div>
                 <div className={passwordInputHasError ? classes['invalid'] : classes['form-control']}>
                    <label htmlFor="password">Password</label>
                    <input 
                        id="password" 
                        type="password" 
                        ref={passwordRef} 
                        onChange={passwordChangedHandler}
                        onBlur={passwordBlurHandler}
                        value={enteredPassword}
                        name="password"
                    />
                    {passwordInputHasError && <p className={classes['error-text']}>Please entered a valid password(&gt;5).</p>}
                 </div>
                 <div className={classes['buttons-box']}>
                    <button disabled={!formIsValid}>Submit</button>
                 </div>
            </form>
        </div>
    );
};

export default UserForm;