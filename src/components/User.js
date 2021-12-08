import React from 'react';

import classes from './User.module.css';

function User(props) {
    return (
        <li className={classes.user}>
            <div>{props.name}</div>
            <div>{props.email}</div>
        </li>
    );
};

export default User;