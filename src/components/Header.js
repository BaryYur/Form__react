import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import'./Header.css';

function Header() {
    const dispatch = useDispatch();
    const [activeM, setActiveM] = useState(false);    
    const [activeMenu, setActiveMenu] = useState(false);

    const showFormHandler = () => {
       dispatch(authActions.thisForm());
    };

    const showUsersHandler = () => {
        dispatch(authActions.thisUsers());
     };

    const activeHandler = () => {
        setActiveM(a => !a);
        setActiveMenu(b => !b);
    }

    return (
        <header>
            <h1>React App</h1>
            <nav className="nav">
                <ul className={activeMenu ? "active-list" : "not-active-list"}>
                    <li>
                        <a href='/'>Welcome Page</a>
                    </li>
                    <li>
                        <button onClick={showUsersHandler}>Users</button>
                    </li>
                    <li>
                        <button onClick={showFormHandler}>Add User</button>
                    </li>
                </ul>
                <div 
                    className={activeM ? "active-menu-burger" : "menu-burger"}
                    onClick={activeHandler}
                >
                    <span></span>
                </div>
            </nav>
        </header>
    );
};

export default Header;