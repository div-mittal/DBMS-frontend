import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
const Manage = () => {
    const userType = localStorage.getItem('userType');
    const userID = localStorage.getItem('userID');
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    console.log(data)
    useEffect(() => {
        if (userType !== 'admin') {
            navigate('/');
            return null;
        } else {
            const fetchData = async () => {
                try {
                    console.log(userID)
                    const response = await axios.get(`/api/bloodbank/${userID}`);
                    console.log(response.data);
                    setData(response.data);
                    // Process the response data here
                } catch (error) {
                    // Handle error here
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
            console.log(response.data);
            // Process the response data here
        } catch (error) {
            // Handle error here
        }
    }

    return (
        <>
            <Helmet>
                <title>Blood Guardian | Manage Blood Bank</title>
            </Helmet>
            <div>
                <form>
                    <h1>{data.Name}</h1>
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
                    <button type="submit" onClick={handleUpdate}>Update</button>
                </form>
            </div>
        </>
    );
}

export default Manage;
