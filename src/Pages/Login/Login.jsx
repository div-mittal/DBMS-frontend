import { useState } from 'react';
import { Helmet } from 'react-helmet';
import styles from './Login.module.css';

const Login = () => {
    const loggedInEmail = localStorage.getItem('loggedInEmail');
    if (loggedInEmail) {
        window.location.href = '/'; // Redirect to home page
        return null; // Return null to prevent rendering the rest of the component
    }
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginType, setLoginType] = useState('user');
    // console.log(loginType)

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLoginTypeChange = (e) => {
        setLoginType(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loginType === 'admin') {
            try {
                const response = await fetch('/api/sign-in-admin', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email,
                        password,
                        loginType,
                    }),
                });

                if (response.status === 200) {
                    const data = await response.json();
                    console.log(data)
                    localStorage.setItem('userID', data.id);   
                    localStorage.setItem('loggedInEmail', email);
                    localStorage.setItem('userType', loginType);
                    window.location.href = '/manage';
                } else {
                    const errorText = await response.text();
                    throw new Error(errorText);
                }
            
            }
        catch (error) {
            console.error(error);
            alert('Login failed');
        }
    }
    else if(loginType === 'user'){
        try {
            const response = await fetch('/api/sign-in', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                    loginType,
                }),
            });

            if (response.status === 200) {
                const data = await response.json();
                console.log(data)
                // Store the email in local storage or a state management solution
                localStorage.setItem('userID', data.id);
                console.log(localStorage.getItem('userID'))
                localStorage.setItem('loggedInEmail', email);
                localStorage.setItem('userType', loginType);
                // Redirect to the home page
                /* window.location.href = '/'; */
            } else {
                const errorText = await response.text();
                throw new Error(errorText);
            }
        } catch (error) {
            console.error(error);
            alert('Login failed');
        }
    }
        
    };

    return (
        <>
            <Helmet>
                <title>Blood Guardian | Login</title>
            </Helmet>
            <div className={styles.body}>
                <form onSubmit={handleSubmit} className={styles.loginForm}>
                    <h1>LOGIN</h1>
                    <div>
                        <input type="email" placeholder='Email' value={email} onChange={handleEmailChange} />
                    </div>
                    <div>
                        <input type="password" placeholder='Password' value={password} onChange={handlePasswordChange} />
                    </div>
                    <div>
                        <label>Login As:</label>
                        <select value={loginType} onChange={handleLoginTypeChange}>
                            <option value="user">Individual Person</option>
                            <option value="admin">Bloodbank Admin</option>
                        </select>
                    </div>
                    <div>
                        <button type="submit" className={styles.loginButton}>Login</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login;