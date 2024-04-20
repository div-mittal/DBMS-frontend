import { useState } from 'react';
import styles from './Login.module.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginType, setLoginType] = useState('user');

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
                console.log(data);
                alert('Login successful');
            } else {
                const errorText = await response.text();
                throw new Error(errorText);
            }
        } catch (error) {
            console.error(error);
            alert('Login failed');
        }
    };
    return (
        <>
            <div className={styles.body}>
                <form onSubmit={handleSubmit} className= {styles.loginForm}>
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