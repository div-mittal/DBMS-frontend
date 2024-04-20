import React, { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';

function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userType, setUserType] = useState('');
    const checkLoggedIn = () => {
        const loggedInEmail = localStorage.getItem('loggedInEmail');
        return loggedInEmail;
    };

    const logout = () => {
        localStorage.removeItem('loggedInEmail');
        localStorage.removeItem('userType');
        setIsLoggedIn(false);
        // Add any additional logout logic here
    };

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const loggedInEmail = await checkLoggedIn();
                if (loggedInEmail) {
                    setIsLoggedIn(true);
                    setUserType(localStorage.getItem('userType'));
                }
            } catch (error) {
                console.error('Error checking login status:', error);
            }
        };

        checkLoginStatus();
    }, []);

    return (
        <nav className={styles.navbar}>
            <a href="/" className={styles.heading}>Blood Guardian</a>
            {isLoggedIn ? (
                userType === 'user' ? (
                    <div className={styles.routes}>
                        <Link to="/find-donor">
                            <p className={styles.finddonor}>FIND DONOR</p>
                        </Link>
                        <Link to="/donate">
                            <p className={styles.registerdonor}>DONATE</p>
                        </Link>
                        <Link to="/" onClick={logout}>
                            <p className={styles.logout}>LOGOUT</p>
                        </Link>
                    </div>
                ) : userType === 'admin' ? (
                    <div className={styles.routes}>
                        <Link to="/manage">
                            <p className={styles.manage}>MANAGE</p>
                        </Link>
                        <Link to="/" onClick={logout}>
                            <p className={styles.logout}>LOGOUT</p>
                        </Link>
                    </div>
                ) : (
                    <div className={styles.routes}>
                        <Link to="/" onClick={logout}>
                            <p className={styles.logout}>LOGOUT</p>
                        </Link>
                    </div>
                )
            ) : (
                <div className={styles.routes}>
                    <Link to="/signup">
                        <p className={styles.signup}>SIGNUP</p>
                    </Link>
                    <Link to="/login">
                        <p className={styles.login}>LOGIN</p>
                    </Link>
                </div>
            )}
        </nav>
    )
};

export default Navbar;
