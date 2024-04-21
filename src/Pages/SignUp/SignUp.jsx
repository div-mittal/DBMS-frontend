import { Helmet } from "react-helmet";
import { useState } from "react";
import styles from "./SignUp.module.css";

const SignUp = () => {
    const userID = localStorage.getItem('userID');
    if (userID) {
        window.location.href = '/'; // Redirect to home page
        return null; // Return null to prevent rendering the rest of the component
    }

    const [loginType, setLoginType] = useState('user');
    const [email, setEmail] = useState('')
    const [password,setPassword]=useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [bankName, setBankName] = useState('')
    const [state, setState] = useState('')
    const [district, setDistrict] = useState('')

    const handleLoginTypeChange = (e)=>{
        setLoginType(e.target.value)
    }

    const handleEmailChange =  (e)=> {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleFirstNameChnage = (e) => {
        setFirstName(e.target.value);
    }

    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
    }

    const handleBankNameChange = (e) => {
        setBankName(e.target.value);
    }

    const handleStateChange = (e) => {
        setState(e.target.value);
    }

    const handleDistrictChange = (e) => {
        setDistrict(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(loginType === 'user'){
            try {
                const response = await fetch('/api/sign-up', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        loginType,
                        email,
                        firstName,
                        lastName,
                        password,
                    }),
                });
        
    
                if(response.status == 200){
                    const data = await response.json();
                    localStorage.setItem('userID', data.id);
                    localStorage.setItem('userType', data.type);
                    window.location.href='/'
                } else {
                    const errorText = await response.text();
                    throw new Error(errorText)
                }
            }
            catch (error) {
                console.log(error)
                alert('Sign Up failed')
            }
        }
        else if(loginType === 'admin'){
            try {
                const response = await fetch('/api/sign-up-admin', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        loginType,
                        email,
                        password,
                        bankName,
                        state,
                        district
                    }),
                });
    
                if(response.status == 200){
                    const data = await response.json();
                    localStorage.setItem('userID', data.id);
                    localStorage.setItem('userType', data.type);
                    window.location.href='/manage'
                } else {
                    const errorText = await response.text();
                    throw new Error(errorText)
                }
            }
            catch (error) {
                console.log(error)
                alert('Sign Up failed')
            }
        } 
    }

    return (
        <>
        <Helmet>
            <title></title>
        </Helmet>
        <div className={styles.body}>
            <form onSubmit={handleSubmit} className={styles.registerForm}>
                <h1>SIGN UP</h1>
                <div className={styles.select}>
                    <label>Register As:</label>
                    <select value={loginType} onChange={handleLoginTypeChange} className={styles.select}>
                        <option value="user">Individual Person</option>
                        <option value="admin">Bloodbank Admin</option>
                    </select>
                </div>
                <div>
                {loginType==='user' ? (
                    <>
                        <input type="text" placeholder='First Name' value={firstName} onChange={handleFirstNameChnage}/>
                        <input type="text" placeholder='Last Name' value={lastName} onChange={handleLastNameChange}/>
                    </>
                ):
                (
                    <>
                        <select id="state" name="state" onChange={handleStateChange}>
                            <option value="">Select State</option>
                            <option value="AndhraPradesh">Andhra Pradesh</option>
                            <option value="ArunachalPradesh">Arunachal Pradesh</option>
                            <option value="Assam">Assam</option>
                        </select>
                        <select id="district" name="district" onChange={handleDistrictChange}>
                            <option value="">Select District</option>
                            <option value="Anantapur">Anantapur</option>
                            <option value="Chittoor">Chittoor</option>
                            <option value="East Godavari">East Godavari</option>
                        </select>
                        <input type="text" placeholder='Blood Bank Name' value={bankName} onChange={handleBankNameChange}/>
                    </>
                )}
                    <input type="email" placeholder='Email' value={email} onChange={handleEmailChange}/>
                    <input type="password" placeholder='Password' value={password} onChange={handlePasswordChange}/>
                   <button type="submit" className={styles.registerButton}>Sign Up</button>
                </div>
            </form>
        </div>
        </>
        
    )
}

export default SignUp;