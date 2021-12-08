import React from 'react';

import User from './User.js'
import classes from './UsersList.module.css';

function UsersList(props) {
    return (
        <div className={classes['list-container']}>
            <ul>
                {props.users.map((user) => (
                    <User
                        name={user.name}
                        email={user.email} 
                         password={user.password}  
                    />
                ))}
            </ul>
        </div>
    );
};

export default UsersList;