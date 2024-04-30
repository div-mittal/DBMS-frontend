import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import styles from './Manage.module.css';

const Manage = () => {
    const userType = localStorage.getItem('userType');
    const userID = localStorage.getItem('userID');
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    useEffect(() => {
        if (userType !== 'admin') {
            navigate('/');
            return null;
        } else {
            const fetchData = async () => {
                try {
                    const response = await axios.get(`/api/bloodbank/${userID}`);
                    setData(response.data);
                    // Process the response data here
                } catch (error) {
                    alert('Failed to fetch data');
                }
            };
            fetchData();
        }
    }, [userType, userID, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const filteredData = Object.keys(data).reduce((acc, key) => {
                if (key !== 'Name') {
                    acc[key] = data[key];
                }
                return acc;
            }, {});
            const response = await axios.post(`/api/bloodbank/${userID}`, filteredData);
            alert('Data updated successfully');
        } catch (error) {
            alert('Failed to update data');
        }
    }

    return (
        <>
            <Helmet>
                <title>Blood Guardian | Manage Blood Bank</title>
            </Helmet>
            <div className={styles.body}>
                <h1 className={styles.Name}>{data.Name}</h1>
                <form className={styles.manage}>
                    {Object.keys(data).map((key) => {
                        if (key !== 'id' && key !== 'Name') {
                            return (
                                <div key={key}>
                                    <label htmlFor={key}>{key}</label>
                                    <input
                                        type="number"
                                        id={key}
                                        name={key}
                                        value={data[key]}
                                        onChange={handleChange}
                                        min={0}
                                    />
                                </div>
                            );
                        }
                        return null;
                    })}
                    <div className={styles.buttonMain}>

                    <div className={styles.button}>
                        <div className={styles.left}>
                            <div className={styles.leftupper}></div>
                            <div className={styles.leftbottom}></div>
                        </div>
                        <button type="submit" onClick={handleUpdate}>UPDATE</button>
                        <div className={styles.right}>
                            <div className={styles.rightupper}></div>
                            <div className={styles.rightbottom}></div>
                        </div>
                    </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Manage;
