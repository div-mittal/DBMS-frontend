import React, { useState } from 'react';
import Data from '../../assets/data';


const Donate = () => {
    const userType = localStorage.getItem('userType');

    if (userType !== 'user') {
        window.location.href = '/'; // Redirect to home page
        return null; // Return null to prevent rendering the rest of the component
    }

    const [state, setState] = useState();
    const [district, setDistrict] = useState();
    const [bloodGroup, setBloodGroup] = useState();
    const [mobile, setMobile] = useState();
    const userID = localStorage.getItem('userID');

    const availableDistrict = Data.states.find((item) => item.state === state);

    const handleStateChange = (e) => {
        setState(e.target.value);
    }

    const handleDistrictChange = (e) => {
        setDistrict(e.target.value);
    }

    const handleBloodGroupChange = (e) => {
        setBloodGroup(e.target.value);
    }

    const handleMobileChange = (e) => {
        setMobile(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/donate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userID,
                    state,
                    district,
                    bloodGroup,
                    mobile,
                }),
            });

            if (response.status === 200) {
                alert('Donation request submitted successfully');
            } else {
                const errorText = await response.text();
                throw new Error(errorText);
            }
        } catch (error) {
            console.error(error);
            alert('Donation request failed');
        }
    };

    return (
        <div>
            <h1>Donate</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="state">State:</label>
                <select id="state" name="state" onChange={handleStateChange}>
                    <option value="">Select State</option>
                    {Data.states.map((value, key) => {
                        return(
                            <option key={key} value={value.state}>{value.state}</option>
                        )
                    })
                    }
                </select>

                <label htmlFor="district">District:</label>
                <select id="district" name="district" onChange={handleDistrictChange}>
                    <option value="">Select District</option>
                    {availableDistrict && availableDistrict.districts.map((value, key) => {
                        return(
                            <option key={key} value={value}>{value}</option>
                        )
                    
                    })
                }
                </select>

                <label htmlFor="bloodGroup">Blood Group:</label>
                <select id="bloodGroup" name="bloodGroup" onChange={handleBloodGroupChange}>
                    <option value="">Select Blood Group</option>
                    {
                        Data.bloodGroups.map((value, key) => {
                            return(
                                <option key={key} value={value}>{value}</option>
                            )
                        })
                    }
                </select>

                <input type="tel" pattern="[0-9]*" placeholder='Mobile' value={mobile} onChange={handleMobileChange} />

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Donate;