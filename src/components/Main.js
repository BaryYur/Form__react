import React, { useState, useCallback, useEffect } from "react";

import { useSelector } from "react-redux";

import UserForm from "./UserForm";
import UsersList from './UsersList';
import classes from './Main.module.css';
 
function Main() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    const showForm = useSelector(state => state.auth.isAuthenticated);
    const showUsers = useSelector(state => state.auth.isAuthenticated);

    const fetchUsersHandler = useCallback( async () => {
        try {
          const response = await fetch('https://new-react-http-34a9d-default-rtdb.firebaseio.com/users.json');
          if (!response.ok) {
            throw new Error('Something went wrong!');
          };

          const data = await response.json();

          const loadedUsers = [];

          for (const key in data) {
            loadedUsers.push({ 
                id: key,
                name: data[key].name,
                email: data[key].email,
                password: data[key].password,
              });
            };

          setUsers(loadedUsers);
          } catch (error) {
          setError(error.message);
        };
    }, []);

    useEffect(() => {
        fetchUsersHandler();
      }, [fetchUsersHandler]);

    async function addUserHandler(user) { //Post request
        const response = await fetch('https://new-react-http-34a9d-default-rtdb.firebaseio.com/users.json', {
          method: 'POST',
          body: JSON.stringify(user),
          headers: {
            'Content-type': 'application/json'
          }
        });
        const data = await response.json();
        console.log(data);
    };

    let content = <p className={classes.error}>Found no users.</p>;

    if (users.length > 0) {
        content = <UsersList users={users} />
    };

    if(error) {
        content = <p className={classes.error}>Something went wrong!</p>;
    };

    return (
        <div className={classes['main-container']}>
            <main>
                {!showForm &&
                <section>
                    <UserForm onAddUser={addUserHandler} />
                </section>}
                {showUsers && 
                  <div className={classes['users-container']}>
                    <section>
                        <button className={classes['fetch-button']} onClick={fetchUsersHandler}>Update</button>
                    </section>
                    <section className={classes['content-container']}>
                        {content}
                    </section>
                  </div>
                }
            </main>
        </div>
    );
};

export default Main;