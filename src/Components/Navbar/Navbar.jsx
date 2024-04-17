import React, { useState } from 'react';
import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';


function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <nav className={styles.navbar}>
            <a href="#" className={styles.heading}>Blood Guardian</a>
            {isLoggedIn ? (
                <div className={styles.routes}>
                    <Link to="/find-donor">
                        <p className={styles.finddonor}>FIND DONOR</p>    
                    </Link>
                    <Link to="/donate">
                        <p className={styles.registerdonor}>DONATE</p>
                    </Link>
                    <Link to="/">
                        <p className={styles.logout}>LOGOUT</p>
                    </Link> 
                </div> 
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
    );
}

export default Navbar;